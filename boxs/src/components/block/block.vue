<template>
  <div class="block-edit">
    <paragraph 
      type="block"
      v-if="!$slots.default"
    ></paragraph>
    <slot></slot>
  </div>
</template>
<script>
import Paragraph from '../paragraph';
export default {
  components: {
    Paragraph
  }
}
</script>
<style lang="scss" scoped>
.block-edit{
  outline: 1px dashed #dcdfe6;
  background-color: #fff;
}
</style>
