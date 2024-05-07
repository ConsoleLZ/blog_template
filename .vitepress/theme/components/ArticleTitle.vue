<script setup>
defineProps(['title'])
</script>

<template>
  <strong>
    {{ title }}
  </strong>
</template>

<style scoped>
strong{
  letter-spacing: 2px;
  position: absolute;
  left: 36px;
  top: 132px;
  color: #3d4ddf;
}
</style>