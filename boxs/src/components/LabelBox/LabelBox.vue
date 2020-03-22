<template>
  <div class="label-box">
    <div class="edit-label" 
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
  props: ['label', 'indexcomp'],
  methods: {
    blur (e) {
      Event.emit('insert_handler', {
        emit: 'client.component.insertLabel',
        params: {
          index: this.indexcomp,
          value: e.target.innerText || ''
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .label-box{
    width: 80px;
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
</style>