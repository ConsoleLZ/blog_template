<script setup lang="ts">
import {useConfig} from "../hooks/useConfig";
function backHome(){
  location.href = '/'
}
</script>

<template>
  <div class="header">
    <div class="avatar" :style=" 'background-image: url(' + useConfig().avatar + ')'" @click="backHome"></div>
    <div class="title">{{ useConfig().title }}</div>
    <ul class="navbar">
      <li v-for="item in useConfig().pages">
        <a :href="item.to">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.header {
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid white;
  margin-right: 10px;
  transition: all 1s;
  cursor: pointer;
}

.avatar:hover {
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
}

.title {
  font-size: 12px;
  margin-right: 5px;
}

.navbar {
  display: flex;
  font-size: 11px;
  padding: 10px;
  background-color: #e5e5e5;
  border-radius: 10px;
  gap: 10px;
}

.navbar li {
  list-style: none;
  background-image: linear-gradient(to right, #31ef08 0 100%, rgba(0, 0, 0, 0) 0% 100%);
  background-size: 0 15%;
  background-position: left bottom;
  background-repeat: no-repeat;
  transition: all 200ms;
}

.navbar li:hover {
  background-size: 100% 15%;
}
</style>