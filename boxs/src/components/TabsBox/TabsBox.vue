<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane
      v-for="item in list"
      :key="item.value"
      :label="item.label" 
      :name="item.value"
    >
      <slot :name="`tab_${item.value}`"/>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    props: {
      list: {
        type: Array,
        default () {
          return [];
        }
      },
      activeName: String | Number
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>