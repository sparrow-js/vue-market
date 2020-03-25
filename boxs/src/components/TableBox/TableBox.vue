<template>
  <div class="form-edit" 
    @mousemove="mousemove"
    @click="toolHandler"
  >
    <div 
      class="toolbar"
      :class="{'block-active': isActive}"
    >
      <span 
        class="toolbar-icon"
        @click="toolHandler"
      >
        表格
      </span>
      <el-button type="primary" size="mini">表头数据</el-button>
      <el-button type="primary" size="mini">表格数据</el-button>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import Event from '../../utils/Event';
function throttle(fn, threshhold) {
  var timeout
  var start = new Date;
  var threshhold = threshhold || 160
  return function () {

  var context = this, args = arguments, curr = new Date() - 0
 
  clearTimeout(timeout)
  if(curr - start >= threshhold){ 
    fn.apply(context, args)
    start = curr
  }else{
     timeout = setTimeout(function(){
        fn.apply(context, args) 
     }, threshhold);
    }
  }
}

export default {
  data () {
    return {
      code: '',
      isActive: false,
    };
  },
  created () {
    this.mousemoveHandler = throttle((e) => {
      const target = e.target;
      const tagName = e.target.tagName;
      if (tagName === 'TD' || tagName === 'TH' || target.classList.contains('cell')) {
        console.log('*******', e);
      }
    });
  },
  methods: {
    toolHandler () {
      this.isActive = true;
      Event.emit('pivot_setting', {
        data: {
          type: 'box',
          handler: 'table'
        }
      });
      Event.emit('insert_handler', {
        emit: 'client.component.show',
        type: 'table',
      })
    },
    mousemove (e) {
      this.mousemoveHandler(e);
    }
  }
}
</script>
<style lang="scss" scoped>
.form-edit{
  position: relative;
  padding: 48px 12px 24px;
  background: #fff;
  .toolbar{
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 10px;
    display: flex;
    padding-bottom: 10px;
    padding-right: 10px;
    justify-content: flex-end;
    width: 100%;
    box-sizing: border-box;
    .toolbar-icon{
      color: #fff;
      cursor: pointer;
      background: #bdc0c7;
      padding: 0 6px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .block-active{
    .toolbar-icon{
      background: #F56C6C;
    }
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