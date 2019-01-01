<template>
  <div class="forn">
    <button type="button" name="button" @click="removeForm">&times;</button>
    <div class="form-field">
      <input ref="from" v-model="from" type="text" class="form-input" placeholder="Откуда"/>
    </div>
    <div class="form-field">
      <input ref="to" v-model="to"  type="text" class="form-input" placeholder="Куда"/>
    </div>
    <div class="form-field">
      <button :disabled="disabled == true" @click="calc" type="button" name="button">Рассчитать</button>
    </div>
    <div class="form-field">
      <button @click="clear" type="button" name="button">Очистить</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  props: {
    uuid: String,
    disabled: Boolean
  },
  data () {
    return {
      from: '',
      to: ''
    }
  },
  methods: {
    // покащываем ошибку
    raiseError(error) {
      console.error(error);
    },

    // отправка полей в родительский компонент
    calc() {
      try {
        this.validate();
        this.$emit('calculate', {from: this.from, to: this.to})
      } catch(error) {
        this.raiseError(error)
      }
    },

    // проверка на заполненность
    validate() {
      let isFromValid =  this.$refs.from.value !== ''
      let isToValid =  this.$refs.to.value !== ''
      if(!isFromValid || !isToValid) {
        throw new Error('Поля не заполнены')
      }
    },

    // Удаляет форму
    removeForm() {
      this.$emit('form-remove', this.uuid)
    },

    // Очиает поля формы
    clear() {
      this.$refs.to.value = ''
      this.$refs.from.value = ''
    }
  }
}
</script>
