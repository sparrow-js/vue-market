<template>
  <div class="inline-toolbar" v-show="showToolbar" :style="styles">
    <ul class="inline-toolbar__list">
      <li 
        class="inline-toolbar__item"
        v-for="item in toolList"
        :key="item.value"
      >
         <el-popover
            placement="bottom"
            trigger="hover"
            width="230">
            <div class="list">
              <div class="item" v-for="(tag, tagIndex) in item.children" :key="tagIndex">
                <el-tag 
                  v-if="item.value === 'tag'" 
                  size="small" 
                  :type="tag.value"
                  @click="toolbarItemHandler(item,tag)"
                >{{tag.label}}</el-tag>
                <el-link 
                  v-if="item.value === 'link'" 
                  size="small" 
                  :type="tag.value"
                  @click="toolbarItemHandler(item,tag)"
                >{{tag.label}}</el-link>
                <el-button 
                  v-if="item.value === 'button'" 
                  size="mini" 
                  :type="tag.value"
                  @click="toolbarItemHandler(item,tag)"
                >{{tag.label}}</el-button>
              </div>
            </div>

            <span slot="reference">{{item.label}}</span>
          </el-popover>
      </li>
    </ul>
  </div>
</template>
<script>
import Event from '../../utils/Event'

export default {
  data () {
    return {
      styles: {
        transform: 'translate3d(0, 0, 0)'
      },
      toolList: [
         {
          label: '标签',
          value: 'tag',
          children: [
            {
              label: 'success',
              value: 'success'
            },
            {
              label: 'info',
              value: 'info'
            },
            {
              label: 'warning',
              value: 'warning'
            },
            {
              label: 'danger',
              value: 'danger'
            }
          ]
        },
        {
          label: '链接',
          value: 'link',
          children: [
            {
              label: '默认链接',
              value: ''
            },
            {
              label: '主要链接',
              value: 'primary'
            },
            {
              label: '成功链接',
              value: 'success'
            },
            {
              label: '警告链接',
              value: 'warning'
            },
            {
              label: '危险链接',
              value: 'danger'
            },
            {
              label: '信息链接',
              value: 'info'
            }
          ]
        },
        {
          label: '按钮',
          value: 'button',
           children: [
            {
              label: '默认按钮',
              value: ''
            },
            {
              label: '主要按钮',
              value: 'primary'
            },
            {
              label: '成功按钮',
              value: 'success'
            },
            {
              label: '信息按钮',
              value: 'warning'
            },
            {
              label: '警告按钮',
              value: 'danger'
            },
            {
              label: '危险按钮',
              value: 'info'
            }
          ]
        },
      ],
      showToolbar: false,
      value: '',
    }
  },
  created () {
    Event.on('text-selection', this.handlerShowPosition);
    Event.on('text-selection-hide', this.handlerHide);
  },
  methods: {
    handlerShowPosition (data) {
      const {rect, value} = data;
      this.value = value;
      this.showToolbar = true;
      const scrollY = window.scrollY;
      this.styles.transform = `translate3d(${rect.left}px, ${rect.top + scrollY + 35}px, 0)`;
    },
    handlerHide () {
      this.showToolbar = false;
    },
    toolbarItemHandler (item, tag) {
      this.showToolbar = false;
      Event.emit('insert_handler', {
        emit: 'client.component.tableCell',
        params: {
          key: 'TableCellText',
          type: item.value,
          params: {
            value: this.value,
            tagType: tag.value,
          }
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .inline-toolbar{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background: #fff;
    &__list{
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      border: 1px solid #eaeaea;
      border-radius: 4px;
      padding: 0;
      margin: 0;
    }
    &__item{
      padding: 4px 10px;
      color: #999;
      font-size: 14px;
      cursor: pointer;
    }
    &__item:hover{
      color:#5668f3;
    }
  }
  .list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .item{
    margin-right: 5px;
    margin-bottom: 5px;
  }
</style>