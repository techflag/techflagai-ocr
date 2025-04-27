<template>
  <a-flex gap="middle" vertical>
    
    <a-flex :vertical="value === 'horizontal'">
      <div
        v-for="(item, index) in new Array(4)"
        :key="item"
        :style="{ ...baseStyle, background: `${index % 2 ? '#1677ff' : '#1677ffbf'}` }"
      />
    </a-flex>
  </a-flex>
</template>

<script>
export default {
  data() {
    return {
      value: 'horizontal',
      baseStyle: {
        width: '25%',
        height: '54px'
      }
    }
  }
}
</script>