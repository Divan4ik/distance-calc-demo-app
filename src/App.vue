<template>
  <div id="app">
    <div>
      <button @click="createForm()" type="button" name="button">Добавить форму</button>
      <Form v-on:form-remove="removeForm" v-for="(form, index) in forms" v-bind="form" :key='index'></Form>
    </div>
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
import { yandexMap } from 'vue-yandex-maps'
import { getDistanceBetween } from './Api'

export default {
  name: 'app',
  data() {
    return {
      true: true,
      forms: []
    }
  },
  mounted() {
    this.createForm()
  },
  components: {
    Form,
    yandexMap
  },
  methods: {
    createForm() {
      if(this.forms.length >= 10) return;

      let obj = {uuid: uuidv1()};
      this.forms.push(obj)
    },
    removeForm(data) {
      if(this.forms.length === 1) return;
      for (const [index, form] of this.forms.entries()) {
        if (data === form.uuid ) {
          this.forms.splice(index, 1);
        }
      }
    },
    async initHandler() {
        let result = await getDistanceBetween('Москва', 'Санкт-Петербург')
        console.log(result)
    }
  }
}
</script>


<style>

.form-list {
  padding: 10px
}

</style>
