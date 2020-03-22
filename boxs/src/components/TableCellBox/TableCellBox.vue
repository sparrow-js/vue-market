<template>
  <div class="cell-box">
    <div class="edit-cell" 
      contenteditable="true"
      @focus="focus"
    >
    </div>
  </div>
</template>
<script>
import Event from '../../utils/Event'

export default {
  props: ['uuid'],
  methods: {
    focus () {
       Event.emit('insert_handler', {
        emit: 'client.component.insertTableComp',
        params: {
          uuid: this.uuid,
        }
      });
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