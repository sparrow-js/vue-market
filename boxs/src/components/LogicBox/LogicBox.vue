<template>
  <div class="Logic" @click.capture="change">
    <slot></slot>
    <paragraph 
      type="logic" 
      @change="change"
    ></paragraph>
  </div>
</template>
<script>
import Event from '../../utils/Event';

export default {
  props: {
    uuid: String,
    type: String,
  },
  methods: {
    change () {
      Event.emit('insert_handler', {
        emit: 'client.component.insertFormComp',
        type: this.type,
        params: {
          uuid: this.uuid,
        }
      });

      Event.emit('insert_handler', {
        emit: 'client.component.getConfig',
        params: {
          handler: 'setActiveIndex',
          uuid: this.uuid
        }
      });

    }
  }
}
</script>
<style lang="scss" scoped>
.Logic{
  outline: 1px dashed #DCDFE6;
  padding: 5px;
  margin: 1px;
}
</style>