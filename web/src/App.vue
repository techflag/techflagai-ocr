<script setup>
import { RouterView } from 'vue-router'
import Aside from './components/layout/Aside.vue'
import Header from './components/layout/Header.vue'
</script>

<template>
  <div class="app-container">
    <div class="aside-container">
      <Aside />
    </div>
    <div class="right-container">
      <div class="header-container">
        <Header />
      </div>
      <div >
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
.app-container {
  display: flex;
  min-height: 100vh;
}

.aside-container {
  width: 240px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.right-container {
  flex: 1;
  width: 100%;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
}

.header-container {
  height: 64px;
  position: fixed;
  top: 0;
  right: 0;
  left: 240px;
  z-index: 999;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.main-container {
  margin-top: 64px;
  padding: 24px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 64px);
}
</style>
