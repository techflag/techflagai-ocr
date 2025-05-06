<template>
  <div class="page-layout">
    <a-card class="card-list">
    
      <a-layout style="height: calc(100vh - 150px);">
        <a-layout-sider width="50%" style=" background: #fff;">
          <inc-img v-if="form.output_image && Object.keys(form.output_json).length > 0"
                 :style="{height: span == 24 ? '250px': '92%','margin-bottom':'5px','padding-top': span == 24 ? '0px' : '20px'}">
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
                    :allow-edit="true"
                    :config="config"
                    :save_flag="false"
                    @saveExcel="saveExcel"
                    @cellUpdated="cellUpdated"
                    style="height: calc(100vh - 160px);"
                    :name="form.output_excel">
                    
        </luckysheet>
        <a-button type="primary"
                           size="small"
                           style="z-index: 999;position: absolute;right: 100px;top: 10px"
                           @click="confirmClick()"
                >
                  {{ form.confirm_status == 1 ? '重新提交' : '提交' }}
      </a-button>
        </a-layout-content>
        
      </a-layout>

  </a-card>

  </div>

  
</template>

<script>
import Luckysheet from "@/components/Luckysheet/index.vue";
import Recognition from "@/components/ocr/Recognition.vue";
import IncImg from "@/components/IncImg";
import { 
  save, 
  read_excel, save_version, cutting_img,submit, update,
  find
} from '@/services/tasks'

import {
  upload
} from '@/services/file'

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
        output_excel: '',
        output_image:'',
        output_json:{},
        json_content: {},
        confirm_status: 0,
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
      showUrl : process.env.VUE_APP_FILE_BASE_URL || '',
      modify_the_value: [],
      loading: false,
      arranged: false,
      icon_name: 'vertical',
    }
  },
  
  mounted() {
    this.getTaskDetail();
  },
  methods: {
    async getTaskDetail() {
      try {
        const taskId = this.$route.query.id
        if (!taskId) {
          this.$message.error('缺少任务ID参数')
          return
        }
        this.form.id = taskId;
        const response = await find({ id: taskId })
        let taskData = response.data.data;
        if (taskData) {
          this.form.output_json = taskData.output_json;
          this.form.output_image = taskData.output_image;
          this.form.output_excel = taskData.output_excel;
        }
      } catch (error) {
          const errorMsg = error.response?.data?.message || error.message
          this.$message.error(`获取任务详情失败：${errorMsg}`)
      }
    },
    
    boxClick(item) {
      if (!this.luckysheetInstance) {
        this.$refs.luckysheetRef.initLuckysheet()
          .then(luckysheet => {
            this.luckysheetInstance = luckysheet;
            this.doLuckysheetAction(item);
          })
          .catch(error => {
            console.error('操作失败:', error);
            this.$message.error('表格操作失败');
          });
      } else {
        this.doLuckysheetAction(item);
      }
    },
    doLuckysheetAction(item) {
      this.luckysheetInstance.setRangeShow({
        row: [item.row[0], item.row[1] - 1],
        column: [item.col[0], item.col[1] - 1]
      });
      
      this.luckysheetInstance.scroll({
        targetRow: item.row[0] - 4,
        targetColumn: item.col[0] - 4,
      });
    },
    // 单元格更新回调
    cellUpdated(r, c, oldValue, newValue) {
      var value = newValue.v
      if (!value && newValue?.ct?.s) {
        value = newValue?.ct?.s[newValue?.ct?.s.length -1]?.v
      }
      var row = []
      var col = []
      if (newValue.mc) {
        row = [newValue.mc.r, newValue.mc.r + newValue.mc.rs]
        col = [newValue.mc.c, newValue.mc.c + newValue.mc.cs]
      } else {
        row = [r, r + 1]
        col = [c, c + 1]
      }
      if (value) {
        this.modify_the_value.push({
          row: row,
          col: col,
          value: value + ''
        })
      }
      console.log('callUpdated', this.modify_the_value)
    },
    async saveExcel(file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', this.form.id);
      formData.append('output_excel', this.form.output_excel);
      
      this.loading = true;
      try {
        let res = await upload(formData);
        if (res.data.code === 200) {
          let cres = await cutting_img({
            task_id: this.form.id,
            modify_the_value: this.modify_the_value || []
          });
          
          this.modify_the_value = [];
          console.log('cres', cres.data.code)
          if (cres.data.code === 200) {
            this.$message.success('保存成功');
            this.getTaskDetail();
            return;
          }else{
          this.$message.error('保存失败');
        }
        }else{
          this.$message.error('保存失败');
        }
        
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
    async confirmClick() {
      try {
        await this.$confirm('确定提交已保存的数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        
        this.$modal.loading();
        const res = await read_excel({
          id: this.form.id
        });
        this.$modal.closeLoading();
    
        if (res.code === 200) {
          const submitRes = await submit(res.data);
          if (submitRes.code === 200) {
            await update({
              id: this.form.id,
              confirm_status: 1
            });
            this.$message.success('提交成功');
            this.init();
            return;
          }
        }
        this.$message.error(res.msg || '提交失败');
      } catch (error) {
        this.$modal.closeLoading();
        if (error !== 'cancel') {
          this.$message.error(error.message || '操作取消');
        }
      }
    },
    async arrangedClick() {
      this.arranged = false;
      this.$modal.loading();
      this.icon_name = this.icon_name === 'vertical' ? 'horizontal' : 'vertical';
      this.span = this.icon_name === 'vertical' ? 16 : 24;
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.$modal.closeLoading();
      this.arranged = true;
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
