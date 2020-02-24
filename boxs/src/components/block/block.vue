<template>
  <div class="block-edit">
    <paragraph v-if="!$slots.default" type="block"></paragraph>
    <slot></slot>
  </div>
</template>
<script>
import Paragraph from '../paragraph';
export default {
  components: {
    Paragraph
  },
}
</script>
<style lang="scss" scoped>
.block-edit{
  border: 1px dashed #dcdfe6;
}
</style>
