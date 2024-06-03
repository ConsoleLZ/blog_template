import {defineConfig} from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
    ignoreDeadLinks: true,
    lang: 'zh',
    // base: '/',
    title: "lazychild",
    description: "一个博客站点",
    outDir: 'dist',
    // 生成站点地图
    sitemap: {
        hostname: 'https://asdgjsad.github.io/'
    },
    metaChunk: true,
    head: [
        ['script', {src: "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js", async: "async"}],
        ['meta',{name: "author", content: "刘哲"}],
        ['script', {src: "/js/particles/particles.js"}],
        ['script', {src: "/js/particles/app.js", async: 'async'}],
        ['link', {rel: 'stylesheet', media: "screen", href: "/css/particles.css"}]
    ],
    // 图片懒加载
    markdown: {
        image: {
            lazyLoading: true
        }
    }
})
