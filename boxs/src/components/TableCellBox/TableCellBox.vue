<template>
  <div class="cell-box">
    <div class="edit-cell" 
      contenteditable="true"
      @focus="focus"
      @input="inputHandler"
    >
    </div>
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
  props: ['uuid'],
  created () {
    this.inputHandlerMethod = throttle((e) => {
      console.log('*******', e.srcElement.innerText)
    });
  },
  methods: {
    focus () {
       Event.emit('insert_handler', {
        emit: 'client.component.insertTableComp',
        params: {
          uuid: this.uuid,
        }
      });
    },
    inputHandler (e) {
      this.inputHandlerMethod(e);
    }
  }
}
</script>
<style lang="scss" scoped>
.cell-box{
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 5px;
  &:hover{
    border: 1px dashed #909399;
    background-color: #fff;
  }
}
.edit-cell{
  flex: 1;
}
</style>