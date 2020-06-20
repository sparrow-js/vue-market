<template>
  <div class="form-edit">
    <paragraph 
      type="Container" 
      emit="client.component.show" 
      @change="change"
    ></paragraph>
  </div>
</template>
<script>
export default {
  methods: {
    change () {}
  }
}
</script>
<style lang="scss" scoped>
.form-edit{
  position: relative;
  padding: 20px 12px 0;
  background: #fff;
}
</style>