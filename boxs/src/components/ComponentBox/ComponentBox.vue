<template>
  <div class="comp-box" :class="{'is-active': activeComp}" @click="clickHandler">
    <slot></slot>
  </div>
</template>
<script>
import Paragraph from '../paragraph';
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeComp: this.isActive || false
    };
  },
  components: {
    Paragraph
  },
  methods: {
    clickHandler () {
      this.activeComp = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.comp-box{
  .el-form-item{
    padding: 10px;
  }
}
.is-active>div:first-child{
  border: 1px dashed #DCDFE6;
}
</style>