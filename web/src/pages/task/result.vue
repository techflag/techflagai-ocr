<template>
  <div class="page-layout">
    <a-card class="card-list">
    
      <a-layout style="height: calc(100vh - 150px);">
        <a-layout-sider width="50%" style=" background: #fff;">
          <inc-img v-if="form.output_image && Object.keys(form.output_json).length > 0"
                 :style="{height: span == 24 ? '250px': '92%','margin-bottom':'5px','padding-top': span == 24 ? '0px' : '200px'}">
            <recognition :src="showUrl + form.output_image" @boxClick="boxClick" :ocr-data="form.output_json"
                           style="height: 100%;width: 100%"></recognition>
        </inc-img>
        <div style="height: 10px;width:100%;display: flex; justify-content: center;">
          <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" :fill="'#EB262D'" />
          </svg>
          <span style="font-weight: 500;margin-right: 20px">需要纠错</span>
          <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" :fill="'#FFEA2F'" />
          </svg>
          <span style="font-weight: 500">需要确认</span>
        </div>
        </a-layout-sider>
        <a-layout-content style=" background: #fff; min-height: 400px;">
          <luckysheet ref="luckysheetRef"
                    v-if="form.output_excel"
                    :allow-edit="false"
                    :config="config"
                    :save_flag="false"
                    style="height: calc(100vh - 160px);"
                    @cellMousedownBefore="cellMousedownBefore"
                    :name="form.output_excel">
        </luckysheet>
        </a-layout-content>
      </a-layout>

  </a-card>

  </div>

  
</template>

<script>
import Luckysheet from "@/components/Luckysheet/index.vue";
import Recognition from "@/components/ocr/Recognition.vue";
import IncImg from "@/components/IncImg";
import { setAuthorization } from '@/utils/request';
import axios from 'axios';

export default {
  name: 'TaskResult',
  components: {
    Luckysheet,
    Recognition,
    IncImg
  },
  data () {
    return {
      form: {
        id: undefined,
        output_excel: 'temp_05.xlsx',
        output_image:'http://47.99.148.195:7090/api/file/showFile?name=024a464cc2a543ac89c206229de7a60a/e09645a509634bf499b25538c188be6a_org.png',
        output_json:{},
        json_content: {}
      },
      config: {
        showinfobar: false,
        showtoolbar: false, // 是否显示工具栏
        showsheetbar: false, // 是否显示底部sheet页按钮
        showstatisticBar: false, // 是否显示底部计数栏
        sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
        showsheetbarConfig: {
          add: false, //新增sheet
          menu: false, //sheet管理菜单
          sheet: false, //sheet页显示
        }
        
      },
      span: 16,
      showUrl : process.env.VUE_APP_SHOW_FILE || ''
    }
  },
  
  mounted() {
    this.getTaskDetail();
    console.log('form.output_excel value:', this.form.output_excel);
    console.log('Luckysheet component mounted');
  },
  methods: {
    async getTaskDetail() {
      try {
        // 设置临时认证信息
        setAuthorization({
          token: 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjExNTc5ZmFmLTg3ZDktNDVlYy1hMDVjLTNlNDM2OGU1YmEzMSJ9.4HZX6a0V0-hL5dVDPNWJsPodO77qKqnHLv6wZawogotTCpM59XU7j6JFh13wQprvaxuKGiSHximcTpSmsPWmQg'
        });
        
        const response = await axios.get('http://47.99.148.195:7080/ocr/task/find', {
          params: {
            id: '024a464cc2a543ac89c206229de7a60a'
          }
        });
        
        if (response.data) {
          console.log('response.data:', response.data);
          this.form.output_json = response.data.data.output_json;
          console.log('JSON content:', this.form.output_json);
        }
      } catch (error) {
        this.$message.error('获取任务详情失败：' + error.message);
      }
    },
    
    cellMousedownBefore (cell, position) {
      const res = [position.r, position.c].join(',')

      const textarea = document.createElement('textarea');
      textarea.value = `"#{${res}}"`;
      textarea.style.position = 'absolute';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.$message.success('复制成功')
    },
    boxClick(item)  {
      console.log(item)
      luckysheet.setRangeShow({row: [item.row[0], item.row[1] - 1], column: [item.col[0], item.col[1] - 1]})

      luckysheet.scroll({
        targetRow: item.row[0] - 4,
        targetColumn: item.col[0] - 4,
      });

}
    
  },
  
  
}
</script>

<style lang="less" scoped>
 .card-list{
    margin-top: 24px;
  }
  
  ::v-deep .jsoneditor-vue {
    height: calc(100vh - 160px) !important;
  }
</style>
