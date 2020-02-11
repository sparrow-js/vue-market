<template>
  <div class="form-edit">
    <div 
      class="toolbar"
      :class="{'block-active': isActive}"
    >
      <span 
        class="toolbar-icon"
        @click="toolHandler"
      >
        表单
      </span>
    </div>
    <slot></slot>
    <paragraph type="form"></paragraph>
  </div>
</template>
<script>
import Event from '../../utils/Event';

export default {
  data () {
    return {
      code: '',
      isActive: false,
    };
  },
  methods: {
    toolHandler () {
      this.isActive = !this.isActive;
      Event.emit('pivot_setting', {
        data: {
          type: 'box',
          handler: 'form'
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.form-edit{
  position: relative;
  padding-top: 24px;
  .toolbar{
    position: absolute;
    background: #409EFF;
    padding: 2px 10px;
    font-size: 12px;
    top: 0px;
    border-radius: 20px;
    .toolbar-icon{
      color: #fff;
      cursor: pointer;
    }
  }
  .block-active{
    background: #F56C6C;
  }
  .operator-box{
    position: absolute;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 4px 10px;
    word-break: keep-all;
    color: #999;
    span{
      cursor: pointer;
    }
  }
}
</style>