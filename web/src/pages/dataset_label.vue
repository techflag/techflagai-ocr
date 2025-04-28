<template>
  <div class="page-layout">
    <page-header ref="pageHeader" :style="`margin-top: 0px`" >
      <slot name="action"  slot="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p>{{desc}}</p>
        <div v-if="this.linkList" class="link">
          <template  v-for="(link, index) in linkList">
            <a :key="index" :href="link.href"><a-icon :type="link.icon" />{{link.title}}</a>
          </template>
        </div>
      </div>
      <slot v-if="this.$slots.extra" slot="extra" name="extra"></slot>
    </page-header>
    <div class="card-list">
      <a-layout>
      
      <a-layout>
        <a-layout-sider width="220" style="background: #fff; padding: 24px;">
          <!-- 选择框部分 -->
          <div class="sider-header">
            <a-select
              style="width: 100%; margin-bottom: 16px;"
              placeholder="请选择标签类型"
              @change="handleTypeChange"
            >
              <a-select-option value="1">表格</a-select-option>
              <a-select-option value="2">发票</a-select-option>
              <a-select-option value="3">合同</a-select-option>
            </a-select>
          </div>
          
          <!-- 图片列表部分 -->
          <div class="image-list">
            <a-list
              :dataSource="imageList"
              :pagination="false"
              size="small"
            >
              <a-list-item slot="renderItem" slot-scope="item">
                <a-card hoverable @click="handleImageClick(item)">
                  <img 
                    slot="cover" 
                    :src="item.imageUrl" 
                    alt="图片"
                    style="height: 100px; object-fit: cover;"
                  />
                  <a-card-meta :title="item.title"></a-card-meta>
                </a-card>
              </a-list-item>
            </a-list>
          </div>

          <!-- 分页部分 -->
          <div class="pagination" style="text-align: center; margin-top: 16px;">
            <a-pagination 
              size="small"
              :total="50" 
              :pageSize="10"
              @change="handlePageChange"
            />
          </div>
        </a-layout-sider>
        <a-layout-content style="padding: 24px; background: #fff; min-height: 280px;">
          <Annotate ref="annotate" />
        </a-layout-content>
      </a-layout>
     
    </a-layout>
  </div>
  </div>

  
</template>

<script>
import PageHeader from '@/components/page/header/PageHeader'
import Annotate from '@/components/ocr/Annotate.vue'  // 添加导入语句

export default {
  name: 'CardList',
  components: {
    PageHeader,
    Annotate  // 注册组件
  },
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
    handlePageChange(page) {
      console.log('当前页码:', page)
    },
    handleTypeChange(value) {
      console.log('选择的标签类型:', value)
    },
    handleImageClick(item) {
      // 获取对 Annotate 组件的引用
      const annotateComponent = this.$refs.annotate;
      if (annotateComponent) {
        // 调用 getDatasetById 方法并传入图片ID
        annotateComponent.getDatasetById(item.id);
      }
    },
  },
  
  data () {
    return {
      imageList: [
        {
          id: 'https://handwrite.oss-cn-nanjing.aliyuncs.com/kqlz1%2F02',
          title: '样本图片1',
          imageUrl: 'https://handwrite.oss-cn-nanjing.aliyuncs.com/kqlz1%2F02.png',
        },
        {
          id: 'https://handwrite.oss-cn-nanjing.aliyuncs.com/kqlz1%2F03',
          title: '样本图片2',
          imageUrl: 'https://handwrite.oss-cn-nanjing.aliyuncs.com/kqlz1%2F03.png',
        },
        {
          id: 'https://handwrite.oss-cn-nanjing.aliyuncs.com/kqlz1%2F07',
          title: '样本图片3',
          imageUrl: 'https://handwrite.oss-cn-nanjing.aliyuncs.com/kqlz1%2F07.png',
        }
      ],
      current: 2,
      desc: '数据集是 OCR 模型训练和评估的基础，支持多种类型的文档图像数据集管理，包括表格、发票、合同等。您可以创建、导入、编辑和管理不同类型的数据集，用于模型训练和性能评估。',
      linkList: [
        {icon: 'plus-circle', href: '/#/', title: '创建数据集'},
        {icon: 'upload', href: '/#/', title: '导入数据'},
        {icon: 'file-text', href: '/#/', title: '使用说明'}
      ],
      extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
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
    a{
      font-size: 14px;
      margin-right: 32px;
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

  .image-list {
    height: calc(100vh - 250px);
    overflow-y: auto;
    
    .ant-card {
      margin-bottom: 8px;
    }
    
    .image-status {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  
  .sider-header {
    margin-bottom: 16px;
  }
</style>
