<template>
  <div class="directive">
    <h1>This is an directive page</h1>
    <!-- <h4>1、v-resize 指令，监听浏览器窗口大小改变的时候，通过监听函数onResize响应</h4>
    <div v-resize="onResize">window width is: {{ length }}</div>-->

    <!-- <h4>2、可通过direction，控制监听页面宽度或高度的变化</h4>
    <div v-resize:[direction]="onResize">window Height is: {{ length }}</div>-->

    <!-- <h4>3、可通过修饰 .quiet 来控制是否在指令初化的时候 响应onResize函数</h4>
    <div v-resize.quiet="onResize">window width is: {{ length }}</div>-->

    <h4>direction .quiet</h4>
    <div v-resize:[direction].quiet="onResize">window Height is: {{ length }}</div>
  </div>
</template>

<script>
export default {
  name: 'directive',
  data() {
    return {
      direction: 'vertical',
      length: 0
    };
  },
  methods: {
    onResize(length) {
      this.length = length;
    }
  }
};
</script>
