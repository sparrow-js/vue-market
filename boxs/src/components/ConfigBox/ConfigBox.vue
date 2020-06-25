<template>
  <div @click.capture="change">
    <slot></slot>
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
      change () {
        Event.emit('pivot_setting', {
          data: {
            type: 'box',
            handler: 'common'
          }
        });

        Event.emit('insert_handler', {
          emit: 'client.component.show',
          type: 'Empty',
        })
      }
    }
  };
</script>