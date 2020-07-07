<template>
  <div class="label-box">
    <div class="edit-label" 
      contenteditable="true" 
      @blur="blur"
      @click="clickHandler"
    >
      {{label}}
    </div>
  </div>
</template>
<script>
import Event from '../../utils/Event'

// grip-horizontal plus-circle
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { 
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'
export default {
  props: ['label', 'uuid'],
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      iconPlusCircle: faPlusCircle,
    }
  },
  methods: {
    blur (e) {
      Event.emit('insert_handler', {
        emit: 'client.component.insertTableHeader',
        params: {
          uuid: this.uuid,
          value: e.target.innerText || ''
        }
      })
    },
    clickHandler () {
       Event.emit('insert_handler', {
        emit: 'client.component.getConfig',
        params: {
          uuid: this.uuid
        }
      });
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