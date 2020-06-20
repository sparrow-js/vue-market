<template>
  <div class="block-edit">
    <div class="paragraph"       
      v-if="!$slots.default"
    >
      <div class="paragraph-edit" contenteditable="true" @focus="focus"></div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import Event from '../../utils/Event'

export default {
  methods: {
    focus () {
      Event.emit('insert_handler', {
        emit: '',
        type: 'block',
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.block-edit{
  outline: 1px dashed #dcdfe6;
  background-color: #fff;
}
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
