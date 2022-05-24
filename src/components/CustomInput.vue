<template>
  <input type="text" @blur="$emit('blur', $event.target.value)" />
</template>

<script>
export default {
  name: 'CustomInput'
};
</script>