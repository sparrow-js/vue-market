<template>
  <div class="inline-toolbar" v-show="showToolbar" :style="styles">
    <ul class="inline-toolbar__list">
      <li 
        class="inline-toolbar__item"
        v-for="item in toolList"
        :key="item.value"
        @click="toolbarItemHandler(item)"
      >
        <span>{{item.label}}</span>
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
        },
        {
          label: '链接',
          value: 'link',
        },
        {
          label: '按钮',
          value: 'button',
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
</style>