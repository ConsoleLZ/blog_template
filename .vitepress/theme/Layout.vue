<script setup lang="ts">
import { onMounted, ref, onUpdated } from "vue";
import { useConfig } from "./hooks/useConfig";
import { useData, useRouter } from "vitepress";
import Header from './components/Header.vue'
import ArticleTitle from "./components/ArticleTitle.vue";
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

const { frontmatter } = useData()
const router = useRouter()

// 控制遮罩层是否显示
let isMask = ref(false)

// 是否显示文章标题
let isShowtitle = ref(false)

let articleTitle = ref('')

onUpdated(() => {
  if (location.href.includes('posts')) {
    isShowtitle.value = true
    articleTitle.value = frontmatter.value.title
  } else {
    isShowtitle.value = false
  }
})

onMounted(() => {
  if (location.href.includes('posts')) {
    isShowtitle.value = true
    articleTitle.value = frontmatter.value.title
  } else {
    isShowtitle.value = false
  }

  if (frontmatter.value.home) {
    // 兼容不同文字长度的打字机效果
    let sub_title = <HTMLDivElement>document.getElementsByClassName('sub_title')[0]
    let sub = <HTMLDivElement>document.getElementsByClassName('sub')[0]
    sub.style.width = sub_title.offsetWidth + 25 + 'px'
    sub.style.opacity = '1'
    sub_title.style.cssText = `animation: typewriter ${Math.ceil(sub_title.innerText.length / 3)}s steps(${sub_title.innerText.length + 30}) infinite;`
  }
})

// 打开遮罩层
function friendClick(codeUrl, srcUrl) {
  if (codeUrl) {
    const mask_item = <HTMLDivElement>document.querySelector('.mask_item')
    mask_item.style.backgroundImage = `url(${codeUrl})`
    isMask.value = true
  }
  if (srcUrl) {
    window.open(srcUrl)
  }
}
// 关闭遮罩层
function closeMaskClick() {
  isMask.value = false
}
</script>

<template>
  <div id="particles-js">
    <ArticleTitle v-if="isShowtitle" :title="articleTitle"></ArticleTitle>
    <Header v-if="!frontmatter.home"></Header>
    <div class="home" v-if="frontmatter.home">
      <!--遮罩层-->
      <div class="mask" v-show="isMask" @click="closeMaskClick()">
        <p style="font-size: 12px;margin-bottom: 5px">点击任意处关闭</p>
        <div class="mask_item"></div>
      </div>
      <p class="title">{{ useConfig().title }}</p>
      <div class="avatar" :style="'background-image: url(' + useConfig().avatar + ')'"></div>
      <div class="icon">
        <div v-for="item in useConfig().social" :key="item.name" @click="friendClick(item.codeUrl, item.srcUrl)">
          <img :src="item.icon" :alt="item.name" :title="item.name">
        </div>
      </div>
      <div class="sub">
        <div class="sub_title">{{ useConfig().sub_title }}</div>
        <div class="sub_title_after"></div>
      </div>
      <ul class="navbar">
        <li v-for="item in useConfig().pages">
          <a :href="item.to">{{ item.name }}</a>
        </li>
      </ul>
      <!-- 文章推荐   -->
      <div class="recommend">
        <div v-for="item in useConfig().article_recommend" :key="item.title">
          <a :href="item.url" style="height: 100%;display: block">
            <strong>{{ item.title }}</strong>
            <div class="introduction">{{ item.introduction }}</div>
            <div
              style="font-size: 12px;display: flex;justify-content: space-between;position: absolute;bottom: 15px;width: 90%;left: 5%">
              <div style="color: white">#{{ item.tags }}</div>
              <div style="color: gray">{{ item.date }}</div>
            </div>
          </a>
        </div>
      </div>
      <!-- 底部信息栏 -->
      <footer>
        <div class="footer_item">
          <div
            style="padding: 2px 6px;border-radius: 3px;background-color: aliceblue;color: black;width: fit-content;font-size: 12px;">
            友链</div>
          <a target="_blank" v-for="item in useConfig().extLinks" :key="item.href" :href="item.href"><img
              :src="'https://img.shields.io/badge/' + item.leftText + '-' + item.rightText + '-white' + '?color=' + item.bgColor"></a>
        </div>
        <div class="footer_item">
          <div
            style="padding: 2px 6px;border-radius: 3px;background-color: aliceblue;color: black;width: fit-content;font-size: 12px;">
            个人信息</div>
          <div v-for="item in useConfig().footer_info" :key="item.title"><span class="footer_info">{{ item.title
              }}</span>{{ item.info }}</div>
        </div>
        <div class="statistics">
          <div
            style="padding: 2px 6px;border-radius: 3px;background-color: aliceblue;color: black;width: fit-content;font-size: 12px;">
            站点信息</div>
          <span id="busuanzi_container_site_pv">本站总访问量<span
              style="display: inline-block;margin: 0 10px;padding: 2px 5px;background-color: #fdf400;border-radius: 3px;color: black;"
              id="busuanzi_value_site_pv"></span>次</span>
          <span id="busuanzi_container_site_uv">
            本站访客数<span
              style="display: inline-block;margin: 0 10px;padding: 2px 5px;background-color: #fdf400;border-radius: 3px;color: black;"
              id="busuanzi_value_site_uv"></span>人次
          </span>
          <div>项目地址: https://github.com/asdgjsad/blog_template</div>
        </div>
      </footer>
    </div>
    <Layout v-else></Layout>
  </div>
</template>

<style scoped>
.footer_info {
  color: gray;
  margin-right: 10px;
  width: 60px;
  display: inline-block;
  text-align: justify;
  text-align-last: justify;
}

.mask {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.mask_item {
  width: 200px;
  height: 200px;
  background-size: contain;
  background-position: center;
  border-radius: 5px;
}

.footer_item {
  box-sizing: border-box;
  position: relative;
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 12px;
}

.home {
  padding-top: 30px;
  box-sizing: border-box;
}

.title {
  width: 100%;
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
  position: relative;
  z-index: 99;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid white;
  transition: all 1s;
  position: relative;
  z-index: 99;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}

.avatar:hover {
  transform: rotateZ(360deg);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
}

.icon {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 99;
}

.icon div {
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
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
  transition: all 500ms;
}

.icon div:hover {
  background-color: #a5cfff;
}

.icon div img {
  width: 100%;
}

.sub_title_after {
  content: '';
  width: 2px;
  height: 20px;
  background-color: rgb(255, 255, 255);
  display: inline-block;
  position: relative;
  animation: flashing 900ms steps(1) infinite;
}

@keyframes flashing {
  0% {
    opacity: 0;
  }

  75% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

.navbar {
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 99;
}

.navbar li {
  list-style: none;
  margin: 5px;
  cursor: pointer;
  font-size: 13px;
  border-radius: 5px;
  padding: 8px 14px;
  transition: all 500ms;
  box-shadow: 0 0 7px rgba(255, 255, 255, 0.6);
}

.navbar li:hover {
  color: #a5cfff;
}

footer {
  width: 100%;
  font-size: 14px;
  position: relative;
  z-index: 99;
  padding: 15px;
  display: flex;
  gap: 70px;
  justify-content: center;
}

.recommend {
  width: 90%;
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 80px auto;
  margin-top: 20px !important;
  flex-wrap: wrap;
  position: relative;
  z-index: 99;
}

.recommend>div {
  width: 23%;
  height: 28vh;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  transition: all 500ms;
  border-radius: 10px;
  border: 1px solid white;
}

.recommend>div strong {
  display: block;
  width: 70%;
  font-size: 15px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommend>div:hover {
  transform: scale(1.02);
}

@media screen and (max-width: 780px) {
  .recommend>div {
    width: 40%;
  }
}

@media screen and (max-width: 480px) {
  .recommend>div {
    width: 90%;
  }
}

.statistics {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-bottom: 10px;
  gap: 10px;
}

.introduction {
  font-size: 13px;
  overflow: hidden;
  display: -webkit-box;
  /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-line-clamp: 4;
  /* 行数，值可以改，表示展示X行后多余的缩略展示 */
  -webkit-box-orient: vertical;
  /* 设置或检索伸缩盒对象的子元素的排列方式 */
}
</style>

<style>
canvas {
  position: fixed;
  left: 0;
  top: 0;
}

.sub {
  margin: 10px auto;
  display: flex;
  justify-content: center;
  padding: 10px;
  opacity: 0;
  position: relative;
  z-index: 99;
}

.sub_title {
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
}

@keyframes typewriter {
  0% {
    width: 0;
  }

  60% {
    width: 100%;
  }

  90% {
    width: 100%;
  }

  100% {
    width: 0;
  }
}
</style>