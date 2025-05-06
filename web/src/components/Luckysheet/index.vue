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
      const response = await showFile({
        name: this.name
      });
      
      // 检查响应数据的各种可能情况
      let rawData;
      if (!response) {
        throw new Error('服务器未返回数据');
      }
  
      // 处理不同的响应格式
      if (response instanceof Blob) {
        rawData = response;
      } else if (response instanceof ArrayBuffer) {
        rawData = response;
      } else if (response.data) {
        // 如果是axios响应对象
        if (response.data instanceof Blob || response.data instanceof ArrayBuffer) {
          rawData = response.data;
        } else if (typeof response.data === 'string') {
          // 如果返回的是错误信息字符串
          throw new Error(response.data);
        } else {
          console.error('未知的响应数据格式:', response);
          throw new Error('服务器返回的数据格式不支持');
        }
      } else if (typeof response === 'string') {
        // 如果直接返回错误信息
        throw new Error(response);
      } else {
        console.error('未知的响应格式:', response);
        throw new Error('服务器返回数据格式不正确');
      }
  
      // 创建blob对象
      const blob = rawData instanceof Blob ? rawData : new Blob([rawData], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
  
      // 检查blob是否有效
      if (blob.size === 0) {
        throw new Error('文件内容为空');
      }
    if (blob.size < 100) { // Excel文件通常至少有几KB
      throw new Error('文件数据不完整');
    }
  
      await this.loadExcel(blob);
    } catch(error) {
      console.error('文件下载失败:', error);
      this.$emit('error', {
        type: 'download',
        message: `文件下载失败: ${error.message}`,
        detail: {
          fileName: this.name,
          error: error.stack
        }
      });
    }
  },

  loadExcel(files) {
    return new Promise((resolve, reject) => {
      try {
        if (!(files instanceof Blob)) {
          throw new Error('文件类型必须是Blob');
        }
        
        LuckyExcel.transformExcelToLucky(files, (exportJson, luckysheetfile) => {
          try {
            if (!exportJson || !exportJson.sheets || exportJson.sheets.length === 0) {
              throw new Error('Excel文件解析失败：未获取到有效工作表');
            }

            if (window.luckysheet.destroy) {
              window.luckysheet.destroy();
            }

            exportJson.sheets.forEach(item => {
              item.zoomRatio = 0.85;
            });

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
                  this.$emit('cellMousedownBefore', cell, position);
                },
                cellUpdated: (r, c, oldValue, newValue, isRefresh) => {
                  this.$emit('cellUpdated', r, c, oldValue, newValue, isRefresh);
                }
              }
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
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
  