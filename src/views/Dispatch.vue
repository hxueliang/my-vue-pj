<template>
  <div class="home">
    {{childMsg}}
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Dispatch',
  components: {
    HelloWorld
  },
  data() {
    return {
      text1: '',
      text2: '',
      childMsg: ''
    };
  },
  mounted() {
    // 孙子组件的消息
    this.$on('sendMsg', data => {
      console.log(data);
      this.childMsg = data;
    });
  }
};
</script>
