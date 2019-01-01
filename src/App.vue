<template>
  <div id="app">
    <div>
      <button @click="createForm()" type="button" name="button">Добавить форму</button>

      <Form
      v-on:form-remove="removeForm"
      v-on:calculate="calculate"
      v-for="(form, index) in forms"
      v-bind="form"
      :key='index'
      :disabled="disabled"
      ></Form>
    </div>

    <log :list="log" />

    <yandex-map
    :coords="[54.62896654088406, 39.731893822753904]"
    style="width: 0px; height: 0px;"
    @map-was-initialized="initHandler"
    ></yandex-map>
  </div>
</template>

<script>

import uuidv1 from 'uuid/v1';
import Form from './components/Form.vue'
import Log from './components/Log.vue'
import { yandexMap } from 'vue-yandex-maps'
import { getDistanceBetween } from './Api'

export default {
  name: 'app',
  data() {
    return {
      disabled: true,
      true: true,
      forms: [],
      log: [
        {
          type: 'error',
          text: 'Это пример ошибки'
        }
      ]
    }
  },
  mounted() {
    this.createForm()
  },
  components: {
    Form,
    Log,
    yandexMap
  },
  methods: {
    //Добавляет форму
    createForm() {
      if(this.forms.length >= 10) return;

      let obj = {uuid: uuidv1()};
      this.forms.push(obj)
    },

    // Удаляет форму
    removeForm(data) {
      if(this.forms.length === 1) return;
      for (const [index, form] of this.forms.entries()) {
        if (data === form.uuid ) {
          this.forms.splice(index, 1);
        }
      }
    },

    // ожидаем загрузки карты
    async initHandler() {
      this.enableForm()
    },

    async calculate(data) {
      this.disableForm()
      try {
        let result = await getDistanceBetween(data.from, data.to)
        this.log.push({type: 'info', text: result})
        this.enableForm()
      } catch(err) {
        this.log.push({type: 'error', text: err.message})
        this.enableForm()
      }

    },

    disableForm() {
      this.disabled = true
    },

    enableForm() {
      this.disabled = false
    }
  }
}
</script>


<style>

.form-list {
  padding: 10px
}

</style>
