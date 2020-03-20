<template>
  <div class="cell-box">
    <div class="edit-cell" 
      contenteditable="true" 
      @blur="blur"
    >
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    blur () {

    }
  }
}
</script>
<style lang="scss" scoped>
.cell-box{
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 5px;
  &:hover{
    border: 1px dashed #909399;
    background-color: #fff;
  }
}
.edit-cell{
  flex: 1;
}
</style>