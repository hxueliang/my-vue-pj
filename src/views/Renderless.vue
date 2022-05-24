<template>
  <div>
    <SValidate #default="{ validate }" :value="value" :rules="rules">
      <input type="text" @blur="validate" v-model="value" />
    </SValidate>
    <!-- 测试复用 -->
    <SValidate #default="{ validate }" :value="value2" :rules="rules2">
      <textarea type="text" @blur="validate" v-model="value2" />
    </SValidate>
  </div>
</template>

<script>
import SValidate from '@/components/SValidate';
export default {
  name: 'Renderless',
  data: () => ({
    value: 'hi',
    value2: 'hi2',
    rules: [
      {
        test(value) {
          return /\d+/.test(value);
        },
        message: '请输入数字'
      }
    ],
    rules2: [
      {
        test(value) {
          return value;
        },
        message: '请输入非常的值'
      }
    ]
  }),
  components: { SValidate }
};
</script>

<style>
</style>