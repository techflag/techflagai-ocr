<template>
  <div class="box">
    <a-button  type="primary"
               size="small"
               style="z-index: 99999;position: absolute;right: 30px;top: 10px"
               @click="saveExcel"
    >
      {{ save_txt }}
    </a-button>
    <div id="luckysheet"></div>
  </div>
</template>

<script>
import LuckyExcel from 'luckyexcel'
import {showFile} from "@/services/file"
import {exportExcel} from "@/utils/export"

export default {
name: 'Luckysheet',
props: {
  name: {
    type: String,
    default: null
  },
  save_txt: {
    type: String,
    default: '保存'
  },
  save_flag: {
    type: Boolean,
    default: true
  },
  allowEdit: {
    type: Boolean,
    default: true
  },
  watch_name: {
    type: Boolean,
    default: true
  },
  config: {
    type: Object,
    default: () => ({
      showtoolbar: true,
      showsheetbar: false,
      showstatisticBar: true,
      sheetBottomConfig: true,
      showsheetbarConfig: {
        add: false,
        menu: false,
        sheet: false,
      },
    })
  }
},

watch: {
  name: {
    handler(newName) {
      if (newName && this.watch_name) {
        this.downloadExcel()
      }
    }
  }
},

data() {
  return {
    isInitialized: false,  // 添加初始化状态标记
    options: {
      container: 'luckysheet',
      title: 'luckysheet',
      lang: 'zh',
      data: [{
        name: 'Sheet1'
      }]
    }
  }
},
methods: {
  initLuckysheet() {
    if (this.isInitialized) return Promise.resolve(window.luckysheet);
    
    return new Promise((resolve, reject) => {
      if (typeof window.luckysheet === 'undefined') {
        const err = new Error('Luckysheet library not loaded');
        console.error(err);
        reject(err);
        return;
      }
      
      try {
        if (window.luckysheet.destroy) {
          window.luckysheet.destroy();
        }
        window.luckysheet.create(this.options);
        this.isInitialized = true;
        resolve(window.luckysheet);
      } catch (error) {
        console.error('Luckysheet初始化失败:', error);
        reject(error);
      }
    });
  },

  async saveExcel() {
    const data = window.luckysheet.getAllSheets()
    const exportData = await exportExcel(data)
    const blob = new Blob([exportData])
    const file = new File([blob], this.name, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    this.$emit('saveExcel', file)
    return file
  },

  async downloadExcel() {
    try {
    //const res = await fetch('http://47.99.148.195:7090/api/file/showFile?name=' + this.name)
    const res = await showFile({
      name: this.name
    })
    const blob = await res.blob()
    const file = new File([blob], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    this.loadExcel(file)
  }
    catch(error) {
    console.error('Download failed:', error);
  }
  },

  loadExcel(files) {
    LuckyExcel.transformExcelToLucky(files, (exportJson) => {
      if (!exportJson.sheets || exportJson.sheets.length === 0) {
        return
      }

      window.luckysheet.destroy()

      exportJson.sheets.forEach(item => {
        item.zoomRatio = 0.85
      })

      window.luckysheet.create({
        container: 'luckysheet',
        ...this.config,
        allowEdit: this.allowEdit,
        showinfobar: false,
        data: exportJson.sheets,
        lang: 'zh',
        title: '',
        hook: {
          cellMousedownBefore: (cell, position) => {
            this.$emit('cellMousedownBefore', cell, position)
          },
          cellUpdated: (r, c, oldValue, newValue, isRefresh) => {
            this.$emit('cellUpdated', r, c, oldValue, newValue, isRefresh)
          },
        }
      })
    })
  }
},

mounted() {
  if (typeof window.luckysheet === 'undefined') {
    console.error('Luckysheet library not loaded');
    return;
  }
  this.$nextTick(() => {
    this.initLuckysheet();
    this.downloadExcel()
  });
},
}
</script>


  <style scoped>
  .download {
    position: absolute;
    z-index: 99;
    left: 10px;
  }
  
  #luckysheet {
    width: 100%;
    height: 100%;
  
    ::v-deep(.luckysheet_info_detail_back) {
      display: none !important;
    }
  
    ::v-deep(.luckysheet-share-logo) {
      display: none !important;
    }
  }
  
  </style>
  