<script setup>
import {useConfig} from "../.vitepress/theme/hooks/useConfig";

</script>

<div v-if="useConfig().timeLine">
<p class="title">本站时间线</p>
<div class="main">
    <div class="time_line">
        <div class="time_line_item" v-for="item in useConfig().timeLine" :key="item.title">
            <p>{{item.time}}</p>
            <div class="name">{{item.title}}</div>
            <div class="description">{{item.description}}</div>
        </div>
    </div>
</div>
</div>

<div class="content">
    <div v-for="item in useConfig().about" :key="item.title">
        <p class="title">{{item.title}}</p>
        <div style="font-size: 13px">{{item.content}}</div>
    </div>
</div>


<style scoped>
.content{
    margin-top: 20px;
}
.content>div{
    margin-bottom: 20px;
}
.main{
    padding-left: 15px;
}
.title{
    font-size: 14px;
    margin: 0 !important;
    font-weight: 700;
}
.time_line{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    
}
.time_line_item{
    height: 50px !important;
    display: flex;
    gap: 30px;
    font-size: 13px;
    align-items: center;
    margin-bottom: 20px;
}
.time_line_item::before{
    content: "";
    display: block;
    width: 2px;
    background-color: gray;
    height: 80px;
    position: absolute;
    left: 0;
    z-index: 1;
}
.time_line_item::after{
    --size: 6px;
    content: "";
    display: block;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-color: #c8cac8;
    position: absolute;
    left: -2px;
    z-index: 2;
    transition: all 500ms;
}
.time_line_item:hover::after {
    background-color: #31ef08;
}
.time_line_item p{
    color: gray;
    white-space: nowrap;
    width: 10%;
}
.name{
    width: 20%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.description{
    width: 70%;
    display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>