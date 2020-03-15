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
  watch: {
    isActive () {
      this.activeComp = this.isActive;
    }
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
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.comp-box{
  .el-form-item{
    
  }
}
.is-active>div:first-child{
  border: 1px dashed #DCDFE6;
  padding: 10px;
}
</style>