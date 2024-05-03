<script setup>
import { data } from '/posts.data.ts';

let obj = {};
let arr = [];
for(let item of data.posts){
    for(let tagItem of item.tags){
        if(obj.hasOwnProperty(tagItem)){
            obj[tagItem]++
        }else {
            obj[tagItem] = 1
        }
    }
}
for(let item of Object.entries(obj)){
    arr.push({
       tagName: item[0],
       value: item[1] 
    });
}
</script>

<div class="tagBox">
    <div v-for="data in arr">
        <a :href="'/pages/article?tagName=' + data.tagName">{{data.tagName}}({{data.value}})</a>
    </div>
</div>

<style scoped>
.tagBox{
    width: 80vw;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 60px;
}
.tagBox div{
    width: fit-content;
    font-size: 12px;
    border-radius: 5px;
    padding: 2px 5px;
    background-color: #ebebeb;
    cursor: pointer;
}
a{
    text-decoration:none;
    color: black;
}
</style>