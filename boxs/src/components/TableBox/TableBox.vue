<template>
  <div 
    @mousemove="mousemove"
    @click="toolHandler"
  >
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
    toolHandler () {},
    mousemove (e) {
      this.mousemoveHandler(e);
    },
  }
}
</script>
<style lang="scss" scoped>
</style>