<template>
  <div 
    class="toolbar" 
    ref="toolbar" 
    :style="styles" 
    v-show="showToolbar"
    @click.stop="() => {}"
  >
    <div class="toolbar__box-add">
      <span 
        class="toolbar__add-icon"
        @click="openBoxTool"
      >
        <font-awesome-icon :icon="iconPlus" />
      </span>
    </div>
    <div class="toolbar__box" v-show="showBoxTool">
      <ul class="toolbar__box-list">
        <li class="toolbar__box-item" v-for="(item) in list" :key="item.id" @click="boxHandler(item.id)">
           <el-popover
            v-if="item.id === 'layout'"
            placement="bottom"
            trigger="hover"
            width="280">
            <div class="toolbar__box-layout">
              <el-checkbox v-model="form.isForm">表单</el-checkbox>
              <el-input class="toolbar__box-layout-input" size="mini" v-model="form.row" placeholder="row"></el-input>
              <span>x</span>
              <el-input  class="toolbar__box-layout-input" v-model="form.col" size="mini" placeholder="col"></el-input>
              <el-button size="mini" type="primary" round @click="layoutSure(item.id)">确定</el-button>
            </div>
            <span slot="reference">{{item.label}}</span>
          </el-popover>

           <el-popover
            v-if="item.id === 'Form'"
            placement="bottom"
            trigger="hover"
            width="170">
            <div class="toolbar__box-form">
              <el-input 
                class="toolbar__box-form-input"  
                v-model="form.blockName" 
                size="mini" 
                placeholder="名称"
              ></el-input>
              <el-button size="mini" type="primary" round @click="sureHandler(item.id)">确定</el-button>
            </div>
            <span slot="reference">{{item.label}}</span>
          </el-popover>

          <el-popover
            v-if="item.id === 'Table'"
            placement="bottom"
            trigger="hover"
            width="230">
            <div class="toolbar__box-form">
              <el-input 
                class="toolbar__box-form-input"  
                v-model="form.blockName" 
                size="mini" 
                placeholder="名称"
              ></el-input>
              <el-input  class="toolbar__box-layout-input" v-model="form.col" size="mini" placeholder="col"></el-input>
              <el-button size="mini" type="primary" round @click="sureHandler(item.id)">确定</el-button>
            </div>
            <span slot="reference">{{item.label}}</span>
          </el-popover>
          <span v-if="!['Form', 'Layout', 'Table'].includes(item.id)">{{item.label}}</span>
        </li>
      </ul>
    </div>
    <div 
      class="toolbar__actions"
      :style="actionsStyles"
    >
      <span 
        class="toolbar__actions-icon"       
        @click="handlerActions"
      >
        <font-awesome-icon :icon="iconEllipsisH" />
      </span>
      <div class="toolbar__actions-box" v-show="showActions">
        <span 
          class="toolbar__actions-button"
          @click="handlerBottom"
        >
          <font-awesome-icon :icon="iconArrowDown" />
        </span>
        <span 
          class="toolbar__actions-button"
          @click="handlerClose"
        >
          <font-awesome-icon :icon="iconTimes" />
        </span>
        <span 
          class="toolbar__actions-button"
          @click="handlerTop"
        >
          <font-awesome-icon :icon="iconfaArrowUp" />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import Event from '../../utils/Event'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faPlus,
  faEllipsisH,
  faArrowDown,
  faArrowUp,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    isShowToolbar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showToolbar: false,
      showBoxTool: false,
      showActions: false,
      styles: {
        transform: 'translate3d(0, 0, 0)'
      },
      actionsStyles: {
        transform: 'translate3d(100px, 0px, 0)'
      },
      form: {
        isForm: false,
        row: '',
        col: '',
        blockName: '',
      },
      boxIndex: 0,
      iconPlus: faPlus,
      iconEllipsisH: faEllipsisH,
      iconArrowDown: faArrowDown,
      iconfaArrowUp: faArrowUp,
      iconTimes: faTimes,
    };
  },
  created () {
    Event.on('block-selected', this.handlerShowPosition);
  },
  watch: {
    isShowToolbar () {
      this.showToolbar = this.isShowToolbar;
    },
    showToolbar () {
      this.$emit('change', this.showToolbar);
    }
  },
  methods: {
    openBoxTool () {
      this.showBoxTool = !this.showBoxTool;
    },
    handlerShowPosition (data) {
      const {rect, index} = data;
      this.boxIndex = index;
      this.showToolbar = true;
      const scrollY = window.scrollY;
      this.styles.transform = `translate3d(${rect.left}px, ${rect.top + scrollY + 10}px, 0)`;
      this.actionsStyles.transform = `translate3d(${rect.width - 30}px, 0px, 0)`;
      this.showBoxTool = false;
      this.showActions = false;
    },
    handlerActions () {
      this.showActions = !this.showActions;
    },
    boxHandler (id) {
      if (!['Form', 'Layout', 'Table'].includes(id)) {
        Event.emit('pivot_operate', {
          handler: 'generator.scene.addBox',
          data: {
            id,
            boxIndex: this.boxIndex,
          }
        })
        this.showToolbar = false;
      }
    },
    sureHandler (id) {
      Event.emit('pivot_operate', {
        handler: 'generator.scene.addBox',
        data: {
          id: id,
          boxIndex: this.boxIndex,
          params: this.form
        }
      });
      this.showToolbar = false;
    },
    handlerBottom () {
      this.showToolbar = false;
      Event.emit('pivot_operate', {
        handler: 'generator.scene.bottomBox',
        data: {
          boxIndex: this.boxIndex,
        }
      });
    },
    handlerClose () {
      this.showToolbar = false;
      Event.emit('pivot_operate', {
        handler: 'generator.scene.removeBox',
        data: {
          boxIndex: this.boxIndex,
        }
      });
    },
    handlerTop () {
      this.showToolbar = false;
      Event.emit('pivot_operate', {
        handler: 'generator.scene.topBox',
        data: {
          boxIndex: this.boxIndex,
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.toolbar{
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  z-index: 10000;
  &__box-add{
    font-size: 18px;
    position: absolute;
    left: 0;
    top: 6px;
    color: #707684;
    :hover{
      color: #0f2af3;
      font-weight: bold;
    }
  }
  &__box{
    display: flex;
    position: absolute;
    left: 36px;
    top: -5px;
  }
  &__box-list{
    list-style: none;
    display: flex;
    padding: 6px 10px;
    border: 1px solid #EEE;
    border-radius: 4px;
    background: #fff;
  }
  &__box-item{
    font-size: 14px;
    margin-right: 8px;
    color: #999;
    word-break: keep-all;
    &:hover{
      font-weight: bold;
      color: #5668f3;
    }
  }
  &__box-layout{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__box-layout-input{
    width: 60px;
  }
  &__actions{
    width: 30px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
  }
  &__actions-icon{
    color: #707684;
    font-size: 18px;
    font-weight: bold;
    &:hover{
      color: #5668f3;
    }
  }
  &__actions-box{
    display: flex;
    flex-shrink: 0;
    position: absolute;
    top: 30px;
    right: 0;
    border: 1px solid #ccc;
    padding: 4px;
    border-radius: 4px;
    background: #fff;
  }
  &__actions-button{
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    width: 30px;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    text-align: center;
    &:hover{
      background: #EEE;
      border-radius: 4px;
    }
  }
  &__box-form-input{
    width: 100px;
  }
}
</style>