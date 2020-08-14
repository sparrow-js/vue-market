<template>
  <div 
    :data-id="uuid" 
    class="comp-box" 
    :class="{'is-active': activeComp, 'inline-box': isInline}" 
    @click.stop="clickHandler"
  >
    <slot></slot>
  </div>
</template>
<script>
import Paragraph from '../paragraph';
import Event from '../../utils/Event';

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    indexcomp: Number|String,
    uuid: String,
    isInline: {
      type: Boolean,
      default: false
    }
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
      setTimeout(() => {
        
        Event.emit('insert_handler', {
          emit: 'client.dispatch.component',
          params: {
            uuid: this.uuid
          }
        });

      }, 200);
     
      Event.emit('component-active-change', {
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
.comp-box{}
.is-active{
  outline: 1px dashed #DCDFE6;
}
.inline-box{
  display: inline-block;
}
</style>