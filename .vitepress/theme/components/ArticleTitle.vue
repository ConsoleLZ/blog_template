<script setup>
import {onMounted} from "vue";

defineProps(['title'])

onMounted(()=>{
  var ti = document.querySelector('strong')
  // 监听滚动事件
  window.onscroll = ()=>{
    if(document.documentElement.scrollTop > 67){
      ti.style.position = "sticky"
      ti.style.top = "12px"
    }else {
      ti.style.position = "absolute"
      ti.style.top = "78px"
    }
  }
})

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
  left: 115px;
  top: 78px;
  color: white;
  z-index: 100;
  font-size: 12px;
  padding: 5px 10px;
  background-color: rgb(120, 120, 120);
  border-radius: 5px;
}
@media screen and (min-width: 960px){
strong{
  left: 140px;
}
}
</style>