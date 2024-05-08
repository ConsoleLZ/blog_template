<script setup>
import {onMounted} from "vue";

defineProps(['title'])

onMounted(()=>{
  var ti = document.querySelector('strong')
  // 监听滚动事件
  window.onscroll = ()=>{
    if(document.documentElement.scrollTop > 67){
      ti.style.position = "sticky"
      ti.style.top = "13px"
    }else {
      ti.style.position = "absolute"
      ti.style.top = "87px"
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
  top: 87px;
  color: #656565;
  z-index: 21;
  font-size: 15px;
}
@media screen and (min-width: 960px){
strong{
  left: 140px;
}
}
</style>