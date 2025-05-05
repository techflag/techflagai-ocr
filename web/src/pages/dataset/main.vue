<template>
  <div class="page-layout">
    <page-header ref="pageHeader" :style="`margin-top: 0px`" >
      <slot name="action"  slot="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p>{{desc}}</p>
        <div class="link">
          <span @click="showCreateModal">
            <a-icon type="plus-circle" />创建数据集
          </span>
          
          <span @click="openDoc">
            <a-icon type="file-text" />使用说明
          </span>
        </div>
      </div>
      
      <slot v-if="this.$slots.extra" slot="extra" name="extra"></slot>
    </page-header>
    <div class="card-list">

    <a-list
      :grid="{gutter: 24, lg: 4, md: 2, sm: 1, xs: 1}"
      :loading="listLoading"
      :dataSource="datasetList"
    >
  <a-list-item slot="renderItem" slot-scope="item">
    <a-card :hoverable="true">
      <a-card-meta @click="handleCardClick(item)">
        <div style="margin-bottom: 3px" slot="title">{{item.name}}</div>
       
        <div class="meta-content" slot="description">
          <div class="status-item">
            <a-icon type="database" /> 总数量: <span class="status-value">{{item.total_count}}</span>
          </div>
          <div class="status-item">
            <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" /> 已纠偏: 
            <span class="status-value">{{item.rectify_count}}</span>
          </div>
          <div class="status-item">
            <a-icon type="exclamation-circle" theme="twoTone" two-tone-color="#faad14" /> 未纠偏: 
            <span class="status-value">{{item.status_count}}</span>
          </div>
          <div class="status-item">
            <a-icon type="clock-circle" /> 更新时间: <span class="status-value">{{item.update_time}}</span>
          </div>
        </div>
      </a-card-meta>
      <a slot="actions" @click="handleDetail(item)">详情</a>
      <a slot="actions" @click="handleDelete(item)">删除</a>
    </a-card>
  </a-list-item>
</a-list>

  </div>
  <div class="pagination-container">
    <a-pagination v-model="current" :total="datasetLisTotal" :show-total="total => `共 ${total} 条记录`"  @change="onPageChange" show-less-items />
  </div>
  </div>

  
</template>

<script>
import PageHeader from '@/components/page/header/PageHeader'
import { find, list, add, deleteDataset } from '@/services/datasets'

export default {
  name: 'DatasetMain',
  components: {PageHeader},
  data () {
    return {
      current:1,
      desc: '数据集是 OCR 模型训练和评估的基础，支持多种类型的文档图像数据集管理，包括表格、发票、合同等。您可以创建、导入、编辑和管理不同类型的数据集，用于模型训练和性能评估。',
      pageSize: 10,
      listLoading: false,
      datasetLisTotal: 0,
      datasetList: []
    }
  },
  created() {
    this.fetchDatasets()
  },
  methods: {
    async fetchDatasets() {
      this.listLoading = true
      try {
        const res = await list({
          page: this.current,
          size: this.pageSize
        })
        this.datasetList = res.data.data.record || []
        this.datasetLisTotal = res.data.data.total || 0
      } catch (error) {
        this.$message.error('获取数据集列表失败')
      }finally {
        this.listLoading = false
      }
    },
    onPageChange(page) {
      this.current = page
      this.fetchDatasets()
    },
    handleCardClick(item) {
      this.$router.push({
        path: '/dataset/list',
        query: {
          id: item.id,
          title: item.title
        }
      })
    },
    handleDetail(item) {
      this.$router.push({
        path: '/dataset/list',
        query: {
          id: item.id,
          mode: 'detail'
        }
      })
    },
    handleDelete(item) {
      // 添加实际的删除逻辑，使用 item 参数
      console.log('删除项目:', item.title)
      // 这里可以添加确认对话框和实际的删除操作
    },
    showCreateModal() {
    // 这里弹出创建数据集的弹框
    this.$message.info('弹出创建数据集弹框')
  },
  handleImport() {
    // 这里处理导入数据逻辑
    this.$message.info('导入数据功能')
  },
  openDoc() {
    window.open(process.env.VUE_APP_WEBSITE + '/help', '_blank')
  }
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

  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }
  .new-btn{
    border-radius: 2px;
    width: 100%;
    height: 187px;
  }
  .meta-content{
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    height: 80px;
    -webkit-box-orient: vertical;
  }
.status-item {
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  
  .anticon {
    margin-right: 8px;
  }
  
  .status-value {
    margin-left: 4px;
    font-weight: 500;
  }
}

.pagination-container {
    clear: both; /* 清除浮动 */
    width: 100%;
    text-align: center;
    padding: 16px 0;
    background: #fff;
  }
</style>
