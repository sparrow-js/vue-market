<template>
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
      handleClick(tab, event) {
        /**
         * 
        const result = await socket.emit('generator.scene.setting', {
          boxIndex: AppModule.boxIndex,
          data: {
            handler: 'formInline',
            key: ':inline',
            value: this.setting.inline
          }
        });
         */

        Event.emit('pivot_operate', {
          handler: 'generator.scene.settingConfig',
          data: {
            uuid: this.uuid,
            handler: 'setActive',
            params: {
              activeName: this.active
            }
          }
        });
        console.log('********',this.active);
        console.log(tab, event);
      }
    }
  };
</script>