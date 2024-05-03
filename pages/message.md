---
head:
  - - script
    - src: //unpkg.com/valine/dist/Valine.min.js
---

<script setup>
import {ref, onMounted} from "vue";
let isInit = ref(false);

onMounted(()=>{
   let Interval = setInterval(()=>{
    try {
      new Valine({
            el: '#vcomments',
            appId: '1Wgun0BNYRkq1uy13wzMTTlt-gzGzoHsz',
            appKey: 'LgkvFc6EjDZy8neCIKorXwET',
            placeholder: '欢迎大家来到lazychild,如果有什么想说的话，请留言给作者哦，作者会尽量快速回复大家的哦😜😜，注意邮箱一定不能写错哦，不然你就收不到作者的回复了',
            avatar: 'wavatar',
            pageSize: 4,
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
