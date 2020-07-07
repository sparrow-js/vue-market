<template>
  <div class="cell-box" :class="{'focus-cell-box': focusCellBox}">
    <div class="edit-cell" 
      contenteditable="true"
      @focus="focus"
      @blur="blur"
      @input="inputHandler"
       @click="clickHandler"
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
  data () {
    return {
      focusCellBox: false
    };
  },
  created () {
    this.inputHandlerMethod = throttle((e) => {
      console.log('*******', e.srcElement.innerText)
    });
  },
  methods: {
    focus () {
      this.focusCellBox = true;
      Event.emit('insert_handler', {
        emit: 'client.component.insertTableComp',
        params: {
          uuid: this.uuid,
        }
      });
      


    },
    blur () {
      this.focusCellBox = false;
    },
    inputHandler (e) {
      this.inputHandlerMethod(e);
    },
    clickHandler () {
      Event.emit('insert_handler', {
        emit: 'client.component.getConfig',
        params: {
          uuid: this.uuid
        }
      });
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
  height: 34px;
  &:hover{
    border: 1px dashed #909399;
    background-color: #fff;
  }
}
.focus-cell-box{
  border: 1px dashed #909399;
  background-color: #fff;
}
.edit-cell{
  flex: 1;
}
</style>