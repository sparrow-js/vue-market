<template>
  <div @click="boxClickHandler" class="edit">
    <slot></slot>
    <paragraph 
      @change="change"
    ></paragraph>
  </div>
</template>
<script>
import Event from '../../utils/Event';

export default {
  methods: {
    change () {

    },
    boxClickHandler () {
      Event.emit('insert_handler', {
        emit: 'client.component.show',
        type: 'custominline',
        params: {
          compBox: 'BasicTable'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.edit{
  position: relative;
  padding: 20px 12px 0;
  background: #fff;
}
</style>