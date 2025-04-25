<script setup>
defineProps(['style']);
</script>

<template>
  <div class="header">
    <div class="button">
      <img
        class="svg"
        src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59593455075/d645/b95f/ad76/dd7224da4573269eca015a1e1afe9710.png" />
    </div>
    <div class="div">
      <div class="button_1">
        <img
          class="svg_1"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59593448837/7cbf/b071/89ce/2bd09a3b495276c4c8f9e63eb2d1a48f.png" />
      </div>
      <div class="button_2">
        <img
          class="svg_2"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59593457060/966e/1cab/e844/357a95559c660964e9ca86ce9c77f94f.png" />
      </div>
      <div class="div_1">
        <div class="img"></div>
        <span class="text"> 曲丽丽 </span>
      </div>
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
/* HEADER */
.header {
  width: 1197px;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: #e5e7eb;
  background-color: #ffffff;
  position: relative;
}

/* BUTTON */
.button {
  width: 30px;
  height: 40px;
  position: absolute;
  top: 11.5px;
  left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 4px;
}

/* SVG */
.svg {
  width: 14px;
  height: 16px;
  position: absolute;
  top: 11px;
  left: 8px;
  flex-shrink: 0;
  margin-top: -0.5px;
  margin-right: 0;
  margin-bottom: -0.5px;
  margin-left: 0;
}

/* DIV */
.div {
  width: 182px;
  height: 40px;
  position: absolute;
  top: 11.5px;
  left: 986px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
}

/* BUTTON */
.button_1 {
  width: 32px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 4px;
}

/* SVG */
.svg_1 {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 11px;
  left: 8px;
  flex-shrink: 0;
  margin-top: -0.5px;
  margin-right: 0px;
  margin-bottom: -0.5px;
  margin-left: -1px;
}

/* BUTTON */
.button_2 {
  width: 30px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 4px;
}

/* SVG */
.svg_2 {
  width: 14px;
  height: 16px;
  position: absolute;
  top: 11px;
  left: 8px;
  flex-shrink: 0;
  margin-top: -0.5px;
  margin-right: 0px;
  margin-bottom: -0.5px;
  margin-left: -1px;
}

/* DIV */
.div_1 {
  width: 88px;
  height: 32px;
  position: absolute;
  top: 4px;
  left: 94px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
}

/* IMG */
.img {
  width: 32px;
  height: 32px;
  position: absolute;
  top: 0;
  left: 0;
  flex-shrink: 0;
  border-radius: 9999px;
  background: url(https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/59507519821/f42f/4f7d/9fbb/42a2aae734904c6739e12861bee86ca5.png) center / cover no-repeat;
}

/* SPAN */
.text {
  width: 48px;
  height: 24px;
  position: absolute;
  top: 4px;
  left: 40px;
  flex-shrink: 0;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 400;
  line-height: 24px;
  color: #374151;
  white-space: pre;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
}
</style>
