<script setup lang="ts">
import {onMounted, ref, onUpdated} from "vue";
import {useConfig} from "./hooks/useConfig";
import {useData, useRouter} from "vitepress";
import Header from './components/Header.vue'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

const {frontmatter} = useData()
const router = useRouter()

// 控制遮罩层是否显示
let isMask = ref(false)

onMounted(()=>{
  if(frontmatter.value.home){
    // 兼容不同文字长度的打字机效果
    let sub_title =<HTMLDivElement>document.getElementsByClassName('sub_title')[0]
    let sub =<HTMLDivElement>document.getElementsByClassName('sub')[0]
    sub.style.width = sub_title.offsetWidth + 25 + 'px'
    sub.style.opacity = '1'
    sub_title.style.cssText = `animation: typewriter ${Math.ceil(sub_title.innerText.length/4)}s steps(${sub_title.innerText.length+30}) infinite;`
  }
})

// 打开遮罩层
function friendClick(codeUrl, srcUrl){
  if(codeUrl){
    const mask_item =<HTMLDivElement> document.querySelector('.mask_item')
    mask_item.style.backgroundImage = `url(${codeUrl})`
    isMask.value = true
  }
  if(srcUrl){
    window.open(srcUrl)
  }
}
// 关闭遮罩层
function closeMaskClick(){
  isMask.value = false
}
</script>

<template>
  <Header v-if="!frontmatter.home"></Header>
  <div class="home" v-if="frontmatter.home">
    <!--遮罩层-->
    <div class="mask" v-show="isMask" @click="closeMaskClick()">
      <p style="font-size: 12px;margin-bottom: 5px">点击任意处关闭</p>
      <div class="mask_item"></div>
    </div>
    <p class="title">{{useConfig().title}}</p>
    <div class="avatar" :style=" 'background-image: url(' + useConfig().avatar + ')' "></div>
    <div class="icon">
      <div v-for="item in useConfig().social" :key="item.name" @click="friendClick(item.codeUrl, item.srcUrl)">
        <img :src="item.icon" :alt="item.name" :title="item.name">
      </div>
    </div>
    <div class="sub">
      <div class="sub_title">朝辞白帝彩云间,千里江陵一日还.两岸猿声啼不住,轻舟已过万重山.</div>
      <div class="sub_title_after"></div>
    </div>
    <ul class="navbar">
      <li v-for="item in useConfig().pages">
        <a :href="item.to">{{item.name}}</a>
      </li>
    </ul>
    <div class="supportLink">
      <a target="_blank" v-for="item in useConfig().extLinks" :key="item.href" :href="item.href"><img :src="'https://img.shields.io/badge/' + item.leftText + '-' + item.rightText + '-white' + '?color=' + item.bgColor"></a>
    </div>
    <div class="footer">{{useConfig().footerText}}</div>
  </div>
  <Layout v-else></Layout>
</template>

<style scoped>
.mask{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0,0,0,0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.mask_item{
  width: 200px;
  height: 200px;
  background-size: contain;
  background-position: center;
  border-radius: 5px;
}
.supportLink{
  width: 100vw;
  box-sizing: border-box;
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.home{
  height: 100vh;
  padding-top: 30px;
  overflow: hidden;
  box-sizing: border-box;
}
.title{
  width: 100%;
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
}
.avatar{
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid white;
  transition: all 1s;
}
.avatar:hover{
  transform: rotateZ(360deg);
  box-shadow: 0 0 40px rgba(0,0,0,0.5);
}
.icon{
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
}
.icon div{
  --size: 28px;
  width: var(--size);
  height: var(--size);
  margin: 10px;
  background-color: #e6e6e6;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 0 7px rgba(0,0,0,0.3);
  transition: all 500ms;
}
.icon div:hover{
  background-color: #a5cfff;
}
.icon div img{
  width: 100%;
}
.sub_title_after{
  content: '';
  width: 2px;
  height: 20px;
  background-color: rgb(0, 0, 0);
  display: inline-block;
  position: relative;
  animation: flashing 900ms steps(1) infinite;
}

@keyframes flashing {
  0%{
    opacity: 0;
  }
  75%{
    opacity: 1;
  }
  100%{
    opacity: 1;
  }
}
.navbar{
  margin: 10px;
  display: flex;
  justify-content: center;
}
.navbar li{
  list-style: none;
  margin: 5px;
  cursor: pointer;
  font-size: 13px;
  background-color: #e5e5e5;
  border-radius: 5px;
  padding: 5px 8px;
  transition: all 200ms;
}
.navbar li:hover{
  box-shadow: 0 0 7px rgba(0,0,0,0.3);
}
.footer{
  width: 100vw;
  position: absolute;
  left: 0;
  bottom: 10px;
  text-align: center;
  font-size: 14px;
}
</style>

<style>
html{
  font-family: Noto Sans SC,serif;
  background-color: #e5e3e3;
}
a {
  text-decoration: none;  /* 删除下划线 */
  color: inherit;  /* 继承父级元素的文本颜色 */
  font-weight: inherit;  /* 继承父级元素的字体粗细 */
  font-style: inherit;  /* 继承父级元素的字体样式 */
}
.sub{
  margin: 10px auto;
  display: flex;
  justify-content: center;
  padding: 10px;
  opacity: 0;
}
.sub_title{
  overflow: hidden;
  white-space: nowrap;
}
@keyframes typewriter {
  0%{
    width: 0;
  }
  60%{
    width: 100%;
  }
  90%{
    width: 100%;
  }
  100%{
    width: 0;
  }
}
</style>