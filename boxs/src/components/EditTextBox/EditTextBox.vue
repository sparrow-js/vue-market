<template>
  <span :class="{
    'text-box': !this.clearClass
  }">
    <span class="edit-text-init" :class="{
      'edit-text': !this.clearClass,
    }" 
      contenteditable="true" 
      @blur="blur"
      @paste="paste"
    >
      {{label}}
      <slot />
    </span>
  </span>
</template>
<script>
import Event from '../../utils/Event';

export default {
  props: ['label', 'uuid', 'clearClass', 'customKey'],
  methods: {
    blur (e) {
      Event.emit('insert_handler', {
        emit: 'client.component.insertEditText',
        params: {
          value: e.target.innerText || '',
          uuid: this.uuid,
          key: this.customKey,
        }
      })
    },
    paste (e) {
      Event.emit('insert_handler', {
        emit: 'client.component.paste',
        params: {}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .text-box{
    min-width: 80px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .edit-text{
    vertical-align: middle;
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    outline: none;
    white-space:nowrap;
  }
  .edit-text-init{
    display: inline-block;
    min-width: 40px;
  }
</style>