<script setup>
import { RouterLink } from 'vue-router'
defineProps(['style']);
</script>
<template>
    <div class="aside">
      <div class="div">
        <div class="i">
          <img
            class="svg"
            src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59593453451/2a9f/4733/3e8d/7706de47b7575d7cb4b2bab25d13ee97.png" />
        </div>
        <span class="text"> 表格识别系统 </span>
      </div>
      <div class="nav">
        <div class="rectangle_9"></div>
        <span class="text_1"> 数据标注 </span><span class="text_2"> 系统配置 </span
        ><img
          class="svg_1"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59593453496/3c1a/b47e/81d8/b78d03de30579e013352e9d65717e438.png" /><span class="text_3"> 文件管理 </span
        ><img
          class="svg_2"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59593453512/9f87/b02b/9f97/01802a12ffbf4e2e6fe2cc2b6f36b922.png" /><span class="text_4"> 表格识别 </span
        ><img
          class="svg_3"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59593448576/d042/426d/6d85/e56f03c5f95845cfe339fbb73f0d099e.png" /><span class="text_5"> 数据集 </span
        ><img
          class="svg_4"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59593452499/1da3/d1de/672f/9ff3e7ba716f3b0903a63d678c8d21e9.png" /><span class="text_6"> 模型管理 </span
        ><img
          class="svg_5"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59593454138/ab80/c9fb/fc02/2efd92835add101b7151f5f905c437ff.png" /><img
          class="svg_6"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59593453627/2329/45a5/1e88/c363692e28d29a17c49c9ce88e2dc274.png" /><span class="text_7"> 结构处理 </span>
      </div>
    </div>
  </template>
  
  <style>
  * {
    box-sizing: border-box;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .justify-start {
    display: flex;
    justify-content: flex-start;
  }
  .justify-center {
    display: flex;
    justify-content: center;
  }
  .justify-end {
    display: flex;
    justify-content: flex-end;
  }
  .justify-between {
    display: flex;
    justify-content: space-between;
  }
  .items-start {
    display: flex;
    align-items: flex-start;
  }
  .items-end {
    display: flex;
    align-items: flex-end;
  }
  .items-center {
    display: flex;
    align-items: center;
  }
  .no-shrink {
    flex-shrink: 0;
  }
  </style>
  <style scoped>
  /* ASIDE */
  .aside {
    position: absolute;
    width: 240px;
    height: 1024px;
    top: 0;
    left: 0;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  /* DIV */
  .div {
    width: 240px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-top: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
    gap: 8px;
    position: relative;
    margin-top: 0;
    margin-left: 0;
  }
  
  /* I */
  .i {
    position: absolute;
    width: 20px;
    height: 28px;
    top: 16px;
    left: 16px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  /* SVG */
  .svg {
    width: 20px;
    height: 20px;
    position: relative;
    margin-top: 4px;
    margin-left: 0;
  }
  
  /* SPAN */
  .text {
    width: 108px;
    height: 28px;
    position: absolute;
    top: 16px;
    left: 44px;
    flex-shrink: 0;
    font-size: 18px;
    font-family: Roboto;
    font-weight: 500;
    line-height: 28px;
    color: #4658ff;
    white-space: pre;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  
  /* NAV */
  .nav {
    position: relative;
    width: 240px;
    height: 288px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 16px;
    margin-left: 0;
  }
  
  /* 矩形 9 */
  .rectangle_9 {
    width: 221px;
    height: 41px;
    border-radius: 6px;
    background-color: #f0f5ff;
    position: relative;
    flex-shrink: 0;
    margin-top: 4px;
    margin-left: 9px;
  }
  
  /* 用户管理 */
  .text_1 {
    font-size: 16px;
    font-family: Roboto;
    font-weight: 400;
    line-height: 24px;
    color: #686a82;
    white-space: pre;
    position: relative;
    flex-shrink: 0;
    margin-top: 201px;
    margin-left: 51px;
  }
  
  /* SPAN */
  .text_2 {
    width: 64px;
    height: 24px;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 400;
    line-height: 24px;
    color: #686a82;
    white-space: pre;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
    position: relative;
    flex-shrink: 0;
    margin-top: 92px;
    margin-left: 51px;
  }
  
  /* SVG */
  .svg_1 {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 16px;
    left: 20px;
  }
  
  /* SPAN */
  .text_3 {
    width: 64px;
    height: 24px;
    position: absolute;
    top: 14px;
    left: 51px;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 400;
    line-height: 24px;
    color: #4658ff;
    white-space: pre;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  
  /* SVG */
  .svg_2 {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 73px;
    left: 19px;
  }
  
  /* SPAN */
  .text_4 {
    width: 64px;
    height: 24px;
    position: absolute;
    top: 71px;
    left: 51px;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 400;
    line-height: 24px;
    color: #686a82;
    white-space: pre;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  
  /* SVG */
  .svg_3 {
    width: 14px;
    height: 16px;
    position: absolute;
    top: 132px;
    left: 20px;
  }
  
  /* SPAN */
  .text_5 {
    width: 48px;
    height: 24px;
    position: absolute;
    top: 130px;
    left: 51px;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 400;
    line-height: 24px;
    color: #686a82;
    white-space: pre;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  
  /* SVG */
  .svg_4 {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 190px;
    left: 20px;
  }
  
  /* SPAN */
  .text_6 {
    width: 64px;
    height: 24px;
    position: absolute;
    top: 188px;
    left: 51px;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 400;
    line-height: 24px;
    color: #686a82;
    white-space: pre;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  
  /* SVG */
  .svg_5 {
    width: 20px;
    height: 16px;
    position: absolute;
    top: 248px;
    left: 20px;
  }
  
  /* SVG */
  .svg_6 {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 306px;
    left: 20px;
  }
  
  /* SPAN */
  .text_7 {
    width: 64px;
    height: 24px;
    position: absolute;
    top: 304px;
    left: 51px;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 400;
    line-height: 24px;
    color: #686a82;
    white-space: pre;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  </style>
  