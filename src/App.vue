<template>
  <div id="app">
    <div>
      <button @click="createForm()" type="button" name="button">Добавить форму</button>
      <Form v-on:form-remove="removeForm" v-for="(form, index) in forms" v-bind="form" :key='index'></Form>
    </div>
  </div>
</template>

<script>

import uuidv1 from 'uuid/v1';
import Form from './components/Form.vue'

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
    Form
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
    }
  }
}
</script>


<style>

.form-list {
  padding: 10px
}

</style>
