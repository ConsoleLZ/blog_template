<script setup>
import {onMounted} from "vue";

defineProps(['title'])

onMounted(()=>{
  var ti = document.querySelector('strong')
  // 监听滚动事件
  window.onscroll = ()=>{
    if(document.documentElement.scrollTop > 67){
      ti.style.position = "sticky"
      ti.style.top = "15px"
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
  left: 135px;
  top: 80px;
  color: white;
  z-index: 100;
  font-size: 14px;
  padding: 5px 10px;
  background-color: rgb(58 129 77);
  border-radius: 5px;
}
@media screen and (min-width: 960px){
strong{
  left: 170px;
}
}
</style>