<template>
  <div @click.stop="change">
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in list"
        :key="item.value"
        :label="item.label" 
        :name="item.value"
      >
        <slot :name="`tab_${item.value}`"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import Event from '../../utils/Event'


  export default {
    props: {
      list: {
        type: Array,
        default () {
          return [];
        }
      },
      activeName: String | Number,
      uuid: String,
      status: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        active: this.activeName
      }
    },
    watch: {
      activeName () {
        this.active = this.activeName;
      }
    },
    methods: {
      handleClick(tab, event) {},
      change () {}
    }
  };
</script>