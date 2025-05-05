<template>
  <div style="background-color: white;">
    <a-card :bordered="false">
      <div style="display: flex; flex-wrap: wrap">
          <head-info title="进行中" :content="`${statusCounts['0']}条`" :bordered="true"/>
          <head-info title="已完成" :content="`${statusCounts['1']}条`" :bordered="true"/>
          <head-info title="异常" :content="`${statusCounts['2']}条`"/>
      </div>
    </a-card>
    <a-divider style="margin-top: 0px;margin-bottom: 0px;background: rgb(240 240 240);" />
    <a-card :bordered="false" class="search-form">
      <a-row>
        <a-col :span="16">
          <a-radio-group default-value="" button-style="solid"  @change="sampleStautsOnChange">
            <a-radio-button value="">全部</a-radio-button>
            <a-radio-button value="0">进行中</a-radio-button>
            <a-radio-button value="1">已完成</a-radio-button>
            <a-radio-button value="2">异常</a-radio-button>
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
      :loading="listLoading"
    >
      <a-list-item :key="task.id" v-for="task in taskList" style="padding: 0 4px">
        <a-card @click="handleCardClick(task.id)" class="card-list">
          <img slot="cover" :src="getTaskImage(task.upload_image)" height="154"/>
          <a-card-meta :title="task.name">
            <div slot="description" style="font-size: 12px;">
              <div> <span :style="{color: status === 1 ? 'green' : status === 2 ? 'red' : 'inherit'}">{{getStatusText(task.status)}}</span></div>
              <div>{{ task.update_time }}</div>
            </div>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
    
    <!-- 使用清除浮动确保分页在列表下方 -->
    <div class="pagination-container">
      <a-pagination v-model="current" :show-total="total => `共 ${total} 条记录`" :page-size.sync="pageSize" :total="taskTotal" show-less-items  @change="onPageChange"/>
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
import { 
  query, 
  save, 
  dataSetupload, 
  readExcel, 
  submit, 
  test, 
  list,  // 修改为list
  find,
  statusCount 
} from '@/services/tasks'

export default {
  name: 'TasksList',
  components: {HeadInfo},
  data() {
    return {
      current: 1,
      taskTotal: 0,
      status: 2,
      taskName: '',
      fileList: [],
      open: false,
      loading: false,
      pageSize: 16,
      taskList: [],
      listLoading: false,
      statusCounts: {
        "0": 0,
        "1": 0,
        "2": 0
      }
    }
  },
  created() {
    this.fetchTasks()
    this.fetchStatusCount()
  },
  methods: {
    async fetchStatusCount() {
      try {
        const res = await statusCount()
        this.statusCounts = res.data.data
      } catch (error) {
        console.error('获取状态统计失败', error)
      }
    },
    onPageChange(page) {
      this.current = page
      this.fetchTasks()
    },
    
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
      this.current = 1
      const params = {}
      if (e.target.value !== '') {
        params.status = e.target.value
      }
      this.fetchTasks(params)
    },
    async fetchTasks(params = {}) {
      this.listLoading = true
      try {
        const res = await list({ 
          page: this.current,
          size: this.pageSize,
          ...params 
        })
        let taskdata = res.data.data
        if (!taskdata || !taskdata.record || taskdata.record.length === 0) {
          this.taskList = []
          this.$message.warning('暂无任务数据')
          return
        }
        this.taskList = taskdata.record
        this.taskTotal = taskdata.total
        this.current = taskdata.page
      } catch (error) {
        this.$message.error('获取任务列表失败')
      } finally {
        this.listLoading = false
      }
    },
    
    handleCancel() {
      this.open = false;
    },
    async handleOk() {
      if (!this.taskName) {
        this.$message.warning('请输入任务名称')
        return
      }
      if (this.fileList.length === 0) {
        this.$message.warning('请选择上传文件')
        return
      }

      this.loading = true
      try {
        await save({
          taskName: this.taskName
        }, this.fileList[0])
        this.$message.success('上传成功')
        this.fetchTasks() // 刷新列表
      } catch (error) {
        this.$message.error('上传失败')
      } finally {
        this.loading = false
        this.open = false
        this.taskName = ''
        this.fileList = []
      }
    },
    handleChange(info) {
      if (info.file.status === 'done') {
        this.fileList = [info.file.originFileObj]
      }
    },
    getTaskImage(uploadImage) {
    if (!uploadImage) {
      return 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png'
    }
    return `${process.env.VUE_APP_API_BASE_URL}/file/${uploadImage}`
  },
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