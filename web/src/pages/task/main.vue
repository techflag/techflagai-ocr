<template>
  <div style="background-color: white;">
    <a-card :bordered="false">
      <div style="display: flex; flex-wrap: wrap">
          <head-info title="进行中" content="8条" :bordered="true"/>
          <head-info title="已完成" content="32条" :bordered="true"/>
          <head-info title="异常" content="24条"/>
      </div>
    </a-card>
    <a-divider style="margin-top: 0px;margin-bottom: 0px;background: rgb(240 240 240);" />
    <a-card :bordered="false" class="search-form">
      <a-row>
        <a-col :span="16">
          <a-radio-group default-value="all" button-style="solid"  @change="sampleStautsOnChange">
            <a-radio-button value="all">全部</a-radio-button>
            <a-radio-button value="ext">进行中</a-radio-button>
            <a-radio-button value="lable">已完成</a-radio-button>
            <a-radio-button value="lable">异常</a-radio-button>
          </a-radio-group>
        </a-col>
        
        <a-col :span="8" style="text-align: right;">
          <a-button @click="addNew" type="primary">上传数据</a-button>
        </a-col>
      </a-row>
    </a-card>
    
    <!-- 移除重复的列表，只保留一个 -->
    <a-list
      :grid='{ gutter: 24, xl: 8, lg: 3, md: 3, sm: 2, xs: 1 }'
      style="padding: 10px;background: white;"
    >
      <a-list-item :key="n" v-for="n in 18" style="padding: 0 4px">
        <a-card @click="handleCardClick(n)" class="card-list">
          <img slot="cover" src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png" height="154"/>
          <a-card-meta title="测试任务">
            <div slot="description" style="font-size: 12px;">
              <div> <span :style="{color: status === 1 ? 'green' : status === 2 ? 'red' : 'inherit'}">{{getStatusText(status)}}</span></div>
              <div> 2025-04-29 16:38:02</div>
            </div>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
    
    <!-- 使用清除浮动确保分页在列表下方 -->
    <div class="pagination-container">
      <a-pagination v-model="current" :total="50" show-less-items />
    </div>

    <a-modal 
      v-model="open" 
      title="上传数据" 
      @ok="handleOk" 
      width="700px"
      :destroyOnClose="true"
    >
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">提交</a-button>
      </template>
      <a-row>
        <a-col :span="12">
          <div class="dataset-upload">
            <div class="upload-label">
            <span class="label">任务名称</span>
            </div>
            <div class="upload-content">
              <a-input placeholder="输入任务名称"  v-model="taskName"  style="width:300px" />
          </div>
          </div>
        </a-col>
      </a-row>
      <a-row style="margin-top: 10px;">
        <a-col :span="12">
          <div class="dataset-upload">
            <div class="upload-label">
              <span class="label">选择文件:</span>
            </div>
            <div class="upload-content">
              <a-upload-dragger
                    v-model="fileList"
                    name="file"
                    :multiple="true"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    @change="handleChange"
                  >
                    <p class="ant-upload-drag-icon">
                      <a-icon type="file-add" theme="twoTone" />
                    </p>
                    <p class="ant-upload-text">点击或拖拽文件到此区域上传</p>
                  </a-upload-dragger>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-modal>
    
  </div>
</template>

<script>
import HeadInfo from '@/components/tool/HeadInfo'
export default {
  name: 'StandardList',
  components: {HeadInfo},
  data() {
    return {
      current: 1,
      status: 2, // 添加状态字段
      taskName: '',
      fileList: [],
      open: false,
      loading: false,
    }
  },
  methods: {
    getStatusText(status) {
      const statusMap = {
        0: '进行中',
        1: '已完成', 
        2: '异常'
      }
      return statusMap[status] || '未知状态'
    },
    handleCardClick(id) {
      this.$router.push({
        path: '/task/result',
        query: {
          id: id
        }
      })
    },
    addNew() {
     this.open = true;
    },
    sampleStautsOnChange(e) {
      console.log(`checked = ${e.target.value}`);
    },
    handleCancel() {
      this.open = false;
    },
    handleOk() {
      this.$message.success('上传成功');
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.open = false;
      }, 3000);
    },
    handleChange(info) {
        console.log(info);
    }
  }
}
</script>

<style lang="less" scoped>
  .card-list {
    ::v-deep .ant-card-body {
      padding-bottom: 6px;
      padding-top: 6px;
    }
  }

  
  .pagination-container {
    clear: both; /* 清除浮动 */
    width: 100%;
    text-align: center;
    margin-top: 24px;
    padding: 16px 0;
    background: #fff;
  }
</style>