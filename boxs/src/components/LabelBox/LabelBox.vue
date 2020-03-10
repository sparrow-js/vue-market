<template>
  <div class="label-box">
    <div class="edit-label" contenteditable="true" @focus="focus" @blur="blur">
      {{label}}
    </div>
  </div>
</template>
<script>
export default {
  props: ['label'],
  methods: {
    focus () {
      console.log('***focus****');
    },
    blur () {
      console.log('***blur****');
    }
  }
}
</script>
<style lang="scss" scoped>
  .label-box{
    width: 80px;
    height: 40px;
    box-sizing: border-box;
    overflow: hidden;
    position: absolute;
    left: -80px;
  }
  .edit-label{
    text-align: right;
    vertical-align: middle;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    outline: none;
    white-space:nowrap;
  }
</style>