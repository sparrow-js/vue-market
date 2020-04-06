<template>
  <div class="inline-toolbar" v-show="showToolbar" :style="styles">
    <ul class="inline-toolbar__list">
      <li 
        class="inline-toolbar__item"
        v-for="item in toolList"
        :key="item.value"
        @click="toolbarItemHandler(item)"
      >
         <el-popover
            placement="bottom"
            trigger="hover"
            width="230">
            <div v-if="item.value === 'tag'" class="list">
              <div class="item">
                <el-tag size="small" type="success">success</el-tag>
              </div>
              <div class="item">
                <el-tag size="small" type="info">info</el-tag>
              </div>
              <div class="item">
                <el-tag size="small" type="warning">warning</el-tag>
              </div>
              <div class="item">
                <el-tag size="small" type="danger">danger</el-tag>
              </div>
            </div>
            <div v-if="item.value === 'link'" class="list">
              <div class="item">
                <el-link>默认链接</el-link>
              </div>
              <div class="item">
                <el-link type="primary">主要链接</el-link>
              </div>
              <div class="item">
                <el-link type="success">成功链接</el-link>
              </div>
              <div class="item">
                <el-link type="warning">警告链接</el-link>
              </div>
              <div class="item">
                <el-link type="danger">危险链接</el-link>
              </div>
              <div class="item">
                <el-link type="info">信息链接</el-link>
              </div>
            </div>

            <div v-if="item.value === 'button'" class="list">
              <div class="item">
                <el-button size="mini">默认按钮</el-button>
              </div>
              <div class="item">
                <el-button size="mini" type="primary">主要按钮</el-button>
              </div>
              <div class="item">
                <el-button size="mini" type="success">成功按钮</el-button>
              </div>
              <div class="item">
                <el-button size="mini" type="info">信息按钮</el-button>
              </div>
              <div class="item">
                <el-button size="mini" type="warning">警告按钮</el-button>
              </div>
              <div class="item">
                <el-button size="mini" type="danger">危险按钮</el-button>
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
              label: '',
              value: '默认链接'
            },
            {
              label: 'primary',
              value: '主要链接'
            },
            {
              label: 'success',
              value: '成功链接'
            },
            {
              label: 'warning',
              value: '警告链接'
            },
            {
              label: 'danger',
              value: '危险链接'
            },
            {
              label: 'info',
              value: '信息链接'
            }
          ]
        },
        {
          label: '按钮',
          value: 'button',
           children: [
            {
              label: '',
              value: '默认按钮'
            },
            {
              label: 'primary',
              value: '主要按钮'
            },
            {
              label: 'success',
              value: '成功按钮'
            },
            {
              label: 'warning',
              value: '信息按钮'
            },
            {
              label: 'danger',
              value: '警告按钮'
            },
            {
              label: 'info',
              value: '危险按钮'
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
    toolbarItemHandler (item) {
      Event.emit('insert_handler', {
        emit: 'client.component.tableCell',
        params: {
          key: 'TableCellText',
          type: item.value,
          params: {
            value: this.value,
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