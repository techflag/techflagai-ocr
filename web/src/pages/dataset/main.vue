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
          <span @click="handleImport">
            <a-icon type="upload" />导入数据
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
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        
          <a-card :hoverable="true">
            <a-card-meta @click="handleCardClick(item)">
              <div style="margin-bottom: 3px" slot="title">{{item.title}}</div>
              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large" />
              <div class="meta-content" slot="description">{{item.content}}</div>
            </a-card-meta>
            <a slot="actions" @click="handleDetail(item)">详情</a>
            <a slot="actions" @click="handleDelete(item)">删除</a>
          </a-card>
        
      </a-list-item>
    </a-list>
  </div>
  <a-pagination v-model="current" :total="50" show-less-items />
  </div>

  
</template>

<script>
import PageHeader from '@/components/page/header/PageHeader'
const dataSource = []
for (let i = 0; i < 11; i++) {
  dataSource.push({
    title: 'Alipay',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    content: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  })
}

export default {
  name: 'CardList',
  components: {PageHeader},
  methods: {
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
    window.open('/#/', '_blank')
  }
  },
  
  data () {
    return {
      current:2,
      desc: '数据集是 OCR 模型训练和评估的基础，支持多种类型的文档图像数据集管理，包括表格、发票、合同等。您可以创建、导入、编辑和管理不同类型的数据集，用于模型训练和性能评估。',
      extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      dataSource
    }
  }
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
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

</style>
