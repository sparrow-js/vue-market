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
    <paragraph 
      type="form" 
      emit="client.component.show" 
      @change="change"
    ></paragraph>
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

      Event.emit('insert_handler', {
        emit: 'client.component.show',
        type: 'form',
      })
    },
    change () {
      this.isActive = true;
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
  padding: 24px 12px;
  border: 1px dashed #DCDFE6;
  background: #fff;
  .toolbar{
    position: absolute;
    background: #bdc0c7;
    padding: 0 6px;
    font-size: 10px;
    top: 0px;
    left: 0px;
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