<template>
  <div>
    请输入11位数
    <ValidateInput></ValidateInput>
  </div>
</template>

<script>
import ValidateInput from '@/components/ValidateInput';

export default {
  name: 'Hoc',
  components: { ValidateInput }
};
</script>

<style>
</style>