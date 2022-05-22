<template>
  <div class="hello">
    <HelloWorldChild></HelloWorldChild>
  </div>
</template>

<script>
import HelloWorldChild from '@/components/HelloWorldChild.vue';

export default {
  name: 'HelloWorld',
  components: {
    HelloWorldChild
  }
};
</script>

<style scoped lang="less">
</style>
