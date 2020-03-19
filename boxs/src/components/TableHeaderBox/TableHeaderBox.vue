<template>
  <div class="label-box">
    <div class="edit-label" 
      contenteditable="true" 
      @blur="blur"
    >
      {{label}}
    </div>
    <!-- <div class="operate operate-add-column"><font-awesome-icon :icon="iconPlusCircle" /></div>
    <div class="operate operate-add-row"><font-awesome-icon :icon="iconPlusCircle" /></div> -->
  </div>
</template>
<script>
// grip-horizontal plus-circle
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'
export default {
  props: ['label'],
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      iconPlusCircle: faPlusCircle,
    }
  },
  methods: {
    blur () {

    }
  }
}
</script>
<style lang="scss" scoped>
.label-box{
  display: flex;
  flex-direction: row;
  position: relative;
  &:hover .operate{
    display: block;
    color: #409EFF;
  }
  .operate-add-row{
    position: absolute;
    bottom: -15px;
    left: 50%;
    margin-left: -5px;
  }
  .operate-add-column{
    position: absolute;
    right: -10px;
  }
}
.operate{
  display: none;
}
.edit-label{
  flex: 1;
}
</style>