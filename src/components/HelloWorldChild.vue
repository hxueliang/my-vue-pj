<template>
  <div class="hello">
    <button @click="handleClick">send msg to home component</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorldChile',
  methods: {
    handleClick() {
      this._dispatch('Dispatch', 'sendMsg', 'From HelloWorldChile msg');
    }
  }
};
</script>

<style scoped lang="less">
</style>
