<template>
  <div class="paragraph">
    <div class="paragraph-edit" contenteditable="true" @click="focus"></div>
    <slot></slot>
  </div>
</template>
<script>
import Event from '../../utils/Event'
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    emit: {
      type: String,
      default: ''
    },
    params: Object,
  },
  methods: {
    focus () {
      if (this.type) {
        Event.emit('insert_handler', {
          emit: this.emit,
          type: this.type,
          params: this.params
        })
      }
      this.$emit('change', {
        type: 'focus'
      })
    },
    click () {
    }
  }
}
</script>
<style lang="scss" scoped>
.paragraph{
  height: 32px;
  box-sizing: border-box;
  padding: 5px;
  &-edit{
    width: 100%;
    height: 100%;
    outline: none;
    text-align: left;
  }
}
</style>