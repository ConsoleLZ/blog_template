---
head:
  - - script
    - src: //unpkg.com/valine/dist/Valine.min.js
---

<script setup>
import {ref, onMounted} from "vue";
import {useConfig} from "../.vitepress/theme/hooks/useConfig";

let isInit = ref(false);

onMounted(()=>{
   let Interval = setInterval(()=>{
    try {
      new Valine({
            el: '#vcomments',
            ...useConfig().Valine
        });
      isInit.value = true; 
      clearInterval(Interval);
    } catch (error) {
      console.log('正在初始化留言板');
    }
}, 1000); 
});
</script>

<div id="vcomments"></div>
<div style="font-size: 13px" v-if="!isInit">留言功能初始化中...</div>
