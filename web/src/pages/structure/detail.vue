<template>
  <div class="page-layout">
    
    <a-card class="card-list">
    
      <a-layout>
        <a-layout-sider width="50%" style="background: #fff000; padding: 24px;">
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
        <a-layout-content style="padding: 24px; background: #fff; min-height: 280px;">
          <vue-json-editor 
      v-model="form.json_content" :showBtns="true" lang="zh"
      @json-change="onJsonChange" @json-save = "onJsonSave"/>
        <a-button size="small" type="danger" style="position: absolute;top: 7px;right: 150px" @click="submitForm">保存</a-button>
      
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
        output_excel: '',
        json_content: {}
      },
      config: {
        showtoolbar: true,
        showsheetbar: false,
        showstatisticBar: true
      },
      json: {
        msg: 'demo of jsoneditor'
      }
    }
  },
  
  mounted() {
    
  },
  methods: {
    onJsonChange () { // 数据改变时触发
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
 .page-header{
    margin: 0 -24px 0;
  }
  .link{
    /*margin-top: 16px;*/
    line-height: 24px;
    a, span {
      font-size: 14px;
      margin-right: 32px;
      cursor: pointer;
      color: #1890ff;
      i{
        font-size: 22px;
        margin-right: 8px;
      }
    }
  }
  .page-content{
    position: relative;
    padding: 24px 0 0;
    &.side{
    }
    &.head.fixed{
      margin: 0 auto;
      max-width: 1400px;
    }
  }
  .search{
    margin-bottom: 54px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }

</style>
