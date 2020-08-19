<template>
    <div class="block" 
      @click.stop="handleClickBlock"
      :class="{'block-active': isActive}"
    >
      <div class="block-slot">
        <span class="block-label" :class="{'block-label-active' : isActive}" v-if="label">
          {{label}}
        </span>
        <slot></slot>
      </div>
    </div>
</template>
<script>
import Event from '../../utils/Event'
export default {
  name: 'box',
  props: {
    index: Number,
    uuid: String,
    active: Boolean,
    label: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      isActive: this.active || false
    };
  },
  created () {
    Event.on('block-active-change', this.handlerBlockChange);
  },
  beforeDestroy () {
    Event.off('block-active-change', this.handlerBlockChange);
  
  },
  methods: {
    handleClickBlock (event) {
      Event.emit('block-active-change', {
        index: this.index,
        uuid: this.uuid
      });

      Event.emit('insert_handler', {
        emit: 'client.dispatch.box',
        params: {
          uuid: this.uuid
        }
      });
      const currentBlock = this.findBlock(event.target);
      const rect = currentBlock ? currentBlock.getBoundingClientRect() : null; 
      if (rect) {
        Event.emit('block-selected', {
          rect,
          index: this.index,
          uuid: this.uuid
        })
      }
    },
    handlerBlockChange (data) {
      if (data.uuid === this.uuid) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
    findBlock (element) {
      while(element) {
        const classList = element.classList;
        if (classList.contains('block')) {
          return element;
        } else {
          element = element.parentNode;
        }
      }
      return null;
    }
  }
}
</script>
<style lang="scss" scoped>
    .block{
      padding: 5px;
      border-radius: 3px;
      &-active{
        background-image: linear-gradient(17deg,rgba(243,248,255,.03) 63.45%,rgba(207,214,229,.4) 98%);
      }
      .block-slot{
        outline: 1px dashed #DCDFE6;
        position: relative;
        padding: 16px 8px 8px;
      }
      .block-slot:hover > .block-label{
        display: block;
      }
      .block-label{
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
        display: none;
      }

      .block-label.block-label-active{
        background: #409EFF;
      }

    }
    .block-active .block-label{
      display: block;
    }
</style>