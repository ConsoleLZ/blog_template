<script setup>
import {useConfig} from "../.vitepress/theme/hooks/useConfig";
import {ref} from "vue"

const links = ref(useConfig().link)

let status = ref(false)
let count = 0

for(let i=0;i<links.value.length;i++){
    const img = new Image();
    
    img.src = links.value[i].imgSrc;
      
    img.onload = function() {
        count++
        if(count == links.value.length){
            status.value = true
        }
    };
    img.onerror = function() {
        count++
        links.value[i].imgSrc = "/images/error.svg"
    }
}
</script>

<p style="font-size: 13px">我的好朋友</p>
<div class="link_box">
    <div v-if="!status" class="loading">
        <img src="/images/loading.svg" alt="加载中">
        <div>加载中...</div>
    </div>
    <div v-else class="link_item" v-for="item in links" :key="item.url">
        <a :href="item.url" target="_blank">
            <div :style="'background-image: url(' + item.imgSrc + ')'"></div>
            <p>{{item.name}}</p>
        </a>
    </div>
</div>


<style scoped>
.loading{
    margin: 0 auto;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-direction: column;
}
.loading img{
    height: 25px;
    animation: rote 2s infinite linear;
}

@keyframes rote {
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}

.link_box{
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 99;
}
.link_item a{
    text-decoration: none;
    color: inherit;
    font-weight: inherit;
    font-style: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}
.link_item:hover div{
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
}
.link_item div{
    --size: 38px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-size: cover;
    background-position: center;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
    transition: all 300ms;
}
.link_item p{
    text-align: center;
    width: 80px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
    margin: 0 !important;
}
</style>