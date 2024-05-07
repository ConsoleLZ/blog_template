import {defineConfig} from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
    ignoreDeadLinks: true,
    lang: 'zh',
    // base: '/',
    title: "mg",
    description: "一个博客站点",
    outDir: 'dist',
    // 生成站点地图
    sitemap: {
        hostname: 'http://localhost:5173/'
    },
    metaChunk: true
})
