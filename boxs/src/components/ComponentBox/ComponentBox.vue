<template>
  <div class="comp-box" :class="{'is-active': activeComp}" @click="clickHandler">
    <slot></slot>
  </div>
</template>
<script>
import Paragraph from '../paragraph';
import Event from '../../utils/Event'

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    indexcomp: Number|String
  },
  data () {
    return {
      activeComp: this.isActive || false
    };
  },
  created () {
    Event.on('component-active-change', this.handlerCompChange);
  },
  components: {
    Paragraph
  },
  methods: {
    clickHandler () {
      this.activeComp = true;
        Event.emit('insert_handler', {
        emit: 'forward.generator.scene.setting',
        params: {
          handler: 'setActiveIndex',
          index: this.indexcomp,
        }
      });

      Event.emit('component-active-change', {
        index: this.indexcomp
      });
    },
    handlerCompChange (data) {
      if (data.index === this.indexcomp) {
        this.activeComp = true;
      } else {
        this.activeComp = false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.is-active>div:first-child{
  border: 1px dashed #DCDFE6;
}
</style>