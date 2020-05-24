<template>
  <div class="Logic" @click.capture="change">
    <span 
      class="Logic-label" 
      :class="{'Logic-label-active' : activeComp}"
      v-if="label"
    >
      {{label}}
    </span>
    <slot></slot>
    <!-- <paragraph 
      type="logic" 
      @change="change"
    ></paragraph> -->
  </div>
</template>
<script>
import Event from '../../utils/Event';

export default {
  props: {
    uuid: String,
    type: String,
    label: {
      type: String,
      default: ''
    },
  },
  created () {
    Event.on('box-active-change', this.handlerCompChange);
  },
  data () {
    return {
      activeComp: false
    };
  },
  methods: {
    change () {
      this.activeComp = true;

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

      Event.emit('box-active-change', {
        uuid: this.uuid
      });

    },
    handlerCompChange (data) {
      if (data.uuid === this.uuid) {
        this.activeComp = true;
      } else {
        this.activeComp = false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Logic{
  outline: 1px dashed #DCDFE6;
  padding: 20px 10px 10px;
  margin: 1px;
  min-height: 40px;
  position: relative;
}
.Logic-label{
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  cursor: pointer;
  background: #bdc0c7;
  padding: 0 6px;
  font-size: 10px;
  line-height: 16px;
  z-index: 10;
}
.Logic-label.Logic-label-active{
  background: #f56c6c;
}
</style>