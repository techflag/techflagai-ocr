<template>
  <div class="page-layout">
    
    <a-card class="card-list">
    
      <a-layout style="height: calc(100vh - 150px);">
        <a-layout-sider width="50%" style=" background: #fff;">
          <luckysheet ref="luckysheetRef"
                    v-if="form.output_excel"
                    :allow-edit="false"
                    :config="config"
                    :save_flag="false"
                    style="height: calc(100vh - 160px);"
                    @cellMousedownBefore="cellMousedownBefore"
                    :name="form.output_excel">
        </luckysheet>
        </a-layout-sider>
        <a-layout-content style=" background: #fff; min-height: 400px;">
          <vue-json-editor 
        v-model="form.json_content"  lang="zh"
        @textSelectionChange="textSelectionChange" style="height: calc(100vh - 160px);" />
        <a-button size="small" type="danger" style="position: absolute;top: 5px;right: 150px" @click="submitForm">保存</a-button>
      
        </a-layout-content>
      </a-layout>

  </a-card>

  </div>

  
</template>

<script>
import vueJsonEditor  from 'vue-json-editor';
import Luckysheet from "@/components/Luckysheet/index.vue";
export default {
  name: 'CardList',
  components: {
    Luckysheet,
    vueJsonEditor ,
  },
  data () {
    return {
      form: {
        id: undefined,
        output_excel: 'temp_05.xlsx',
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
      json: {
        msg: 'demo of jsoneditor'
      }
    }
  },
  
  mounted() {
    console.log('form.output_excel value:', this.form.output_excel)
    console.log('Luckysheet component mounted')
  },
  methods: {
    textSelectionChange (editor, start, end, text)  {
      console.log('textSelectionChange', editor, start, end, text)
      if (text.startsWith ('#{') && text.endsWith('}')){

        var val = text.replace('#{','').replace('}','')



        var item = val.split(',')
        console.log(item)
       
        

      }
    },
    onJsonSave(){ // 点击保存触发
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
    submitForm () {
      this.$request({  // Using the built-in request method instead of undefined save_or_update
        url: '/api/save',  // Replace with your actual API endpoint
        method: 'post',
        data: {
          id: this.form.id,  // Fixed: using this.form instead of form.value
          json_content: this.form.json_content
        }
      }).then(res => {
        if (res.code === 200) {
          this.$message.success('保存成功')
        } else {
          this.$message.error(res.msg || '保存失败')
        }
      }).catch(err => {
        this.$message.error('保存失败：' + err.message)
      })
    },
    
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
