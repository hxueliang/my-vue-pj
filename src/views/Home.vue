<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div>v-model：{{text1}} --- @input:value：{{text2}}</div>
    <input type="text" v-model="text1" />
    <input type="text" :value="text2" @input="text2 = $event.target.value" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      text1: '',
      text2: '',
      childMsg: ''
    };
  }
};
</script>
