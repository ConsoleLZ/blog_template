<script setup>
import {useConfig} from "../.vitepress/theme/hooks/useConfig";

const links = useConfig().link
</script>

<p style="font-size: 13px">我的好朋友</p>
<div class="link_box">
    <div class="link_item" v-for="item in links" :key="item.url">
        <a :href="item.url" target="_blank">
            <div :style="'background-image: url(' + item.imgSrc + ')'"></div>
            <p>{{item.name}}</p>
        </a>
    </div>
</div>

<style scoped>
.link_box{
    display: flex;
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
    background-size: contain;
    background-position: center;
    box-shadow: 0 0 7px rgba(0,0,0,0.4);
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