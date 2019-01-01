<template>
  <div class="forn">
    <button type="button" name="button" @click="removeForm">&times;</button>
    <div class="form-field">
      <input type="text" class="form-input" placeholder="Откуда"/>
    </div>
    <div class="form-field">
      <input type="text" class="form-input" placeholder="Куда"/>
    </div>
    <div class="form-field">
      <button type="button" name="button">Рассчитать</button>
    </div>
    <div class="form-field">
      <button type="button" name="button">Очистить</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  props: {
    uuid: String
  },
  data () {
    return {

    }
  },
  methods: {
    removeForm() {
      this.$emit('form-remove', this.uuid)
    }
  }
}
</script>
