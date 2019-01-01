<template>
  <div class="log">
    <div
      v-for="(entry, index) in list"
      v-bind:class="[entry.type === 'info' ? infoClass : errorClass]"
      v-bind="entry"
      class="log-entry">
      {{entry.text}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'log',
  props: {
    list: Array
  },
  data() {
    return {
      infoClass: 'info',
      errorClass: 'error'
    }
  },
  watch: {
    list: {
      handler(newVal, oldVal) {
        console.log(newVal)
      }
    }
  },
  created() {
    console.log(this.list)
  },
}
</script>

<style media="screen">
    .log-entry.error {
      color: red;
      font-family: "Courier New"
    }
</style>
