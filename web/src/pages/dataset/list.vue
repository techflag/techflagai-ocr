<template>
  <div>
    <a-card :bordered="false" class="search-form">
      <a-row>
        <a-col :span="16">
          <a-radio-group default-value="all" button-style="solid"  @change="sampleStautsOnChange">
            <a-radio-button value="all">全部</a-radio-button>
            <a-radio-button value="ext">已提取</a-radio-button>
            <a-radio-button value="lable">已标注</a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :span="6">
          <div class="dataset-select">
            <span class="label">数据集：</span>
            <a-select placeholder="不限" style="width: 120px">
              <a-select-option value="1">优秀</a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :span="2">
          <a-button @click="addNew" type="primary">上传数据</a-button>
        </a-col>
      </a-row>
    </a-card>
    
    <!-- 移除重复的列表，只保留一个 -->
    <a-list
      :grid='{ gutter: 24, xl: 8, lg: 3, md: 3, sm: 2, xs: 1 }'
      style="margin: 0 -8px"
    >
      <a-list-item :key="n" v-for="n in 18" style="padding: 0 8px">
        <a-card @click="handleCardClick(n)">
          <img slot="cover" src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png" height="154"/>
          <a-card-meta title="Ant Design">
            <div slot="description">
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
            <span class="label">数据集：</span>
            </div>
            <div class="upload-content">
            <a-select placeholder="不限" style="width: 120px">
              <a-select-option value="1">优秀</a-select-option>
            </a-select>
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
import {
  save,
  list,  // 修改为list
  statusCount, task_names, update_data_set
} from '@/services/tasks'
export default { 
  name: 'DatasetList',
  
  data () {
    return {
      current: 1,
      form: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
      },
      open: false,
      loading: false,
      fileList:[]
    }
  },
  created() {
    // 初始化逻辑
  },
  methods: {
    addNew() {
      // 处理上传数据的逻辑
      this.open = true
      console.log('上传数据')
    },
    handleOk() {
      this.loading = true;
      // 移除焦点
      document.activeElement.blur();
      setTimeout(() => {
        this.loading = false;
        this.open = false;
      }, 3000);
    },
    handleCancel() {
      this.open = false
    },
    handleRemove(file) {
      console.log(file)
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          this.$message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          this.$message.error(`${info.file.name} file upload failed.`);
        }
    },
    sampleStautsOnChange(e) {
      console.log(`checked = ${e.target.value}`);
    },
    handleCardClick(id) {
      this.$router.push({
        path: '/dataset/labeling',
        query: {
          id: id,
          mode: 'annotate'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .content{
    display: flex;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;
    height: 20px;
    & > span {
      color: @text-color-second;
      flex: 1;
      font-size: 12px;
    }
    .avatarList {
      flex: 0 1 auto;
    }
  }
  
  .list-container {
    position: relative;
    min-height: 200px;
    margin-top: 24px;
  }
  
  .pagination-wrapper {
    text-align: center;
    margin-top: 16px;
    padding: 16px 0;
    background: #fff;
  }
  
  /* 移除之前的list-container相关样式 */
  
  .pagination-container {
    clear: both; /* 清除浮动 */
    width: 100%;
    text-align: center;
    margin-top: 24px;
    padding: 16px 0;
    background: #fff;
  }
  
  .dataset-select {
    display: flex;
    align-items: center;
    
    .label {
      margin-right: 8px;
    }
  }

  .dataset-upload {
    display: flex;
    align-items: flex-start;  // 改为顶部对齐
    
    .upload-label {
      flex: 0 0 80px;  // 固定宽度，不会被挤压或拉伸
      margin-right: 8px;
      padding-top: 8px;  // 稍微向下偏移以对齐上传区域
    }
    
    .upload-content {
      flex: 1;  // 占据剩余空间
      min-width: 0;  // 防止内容溢出
    }

    .label {
      white-space: nowrap;  // 防止文字换行
    }
  }
</style>
