<template>
  <div :class="{
    'label-box': !this.clearClass
  }">
    <div :class="{
      'edit-label': !this.clearClass,
      'edit-label-init': this.clearClass
    }" 
      contenteditable="true" 
      @blur="blur"
    >
      {{label}}
    </div>
  </div>
</template>
<script>
import Event from '../../utils/Event'

export default {
  props: ['label', 'indexcomp', 'uuid', 'clearClass'],
  methods: {
    blur (e) {
      Event.emit('insert_handler', {
        emit: 'client.component.insertLabel',
        params: {
          index: this.indexcomp,
          value: e.target.innerText || '',
          uuid: this.uuid
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .label-box{
    min-width: 80px;
    height: 40px;
    box-sizing: border-box;
    overflow: hidden;
    position: absolute;
    left: -80px;
  }
  .edit-label{
    text-align: right;
    vertical-align: middle;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    outline: none;
    white-space:nowrap;
  }
  .edit-label-init{
    vertical-align: middle;
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    outline: none;
    white-space:nowrap;
  }
</style>