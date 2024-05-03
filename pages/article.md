<script setup>
import { data } from '/posts.data.ts';

let articleNumber;
let dataPosts;
const url = new URL(window.location.href).searchParams.get('tagName');
if(!url){
    articleNumber = data.posts.length;
    dataPosts = data.posts
}else {
    dataPosts = data.posts.filter(item=>item.tags.includes(url));
    articleNumber = dataPosts.length;
}
</script>

<p>博客文章: {{articleNumber}}</p>

<ul class="articleList">
    <li v-for="item in dataPosts" :key="item.src">
        <a :href="'/posts/' + item.src.split('.')[0]">
            <div class="date">{{item.date}}</div>
            <div class="title">{{item.title}}</div>
        </a>
    </li>
</ul>

<style scoped>
.articleList li a{
    width: fit-content;
    display: flex;
    gap: 10px;
    font-size: 14px;
    text-decoration:none;
    color: black;
}
.articleList li{
    list-style: none;
    transition: all 200ms;
}
.articleList li a:hover{
    color: #3d8de8;
}
.date{
    width: 100px;
    color: gray;
}
.title{
    width: fit-content;
    max-width: 40vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>