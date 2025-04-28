<template>
  <div class="page-layout">
    <page-header ref="pageHeader" :style="`margin-top: 0px`" >
      <slot name="action"  slot="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p>{{desc}}</p>
        <div class="link">
          <span @click="handleModeConfig">
            <a-icon type="plus-circle" />创建模型
          </span>
          
          <span @click="openDoc">
            <a-icon type="file-text" />使用说明
          </span>
        </div>
      </div>
      <slot v-if="this.$slots.extra" slot="extra" name="extra"></slot>
    </page-header>
    <div class="card-list">
    
    <a-list itemLayout="vertical">
      <a-list-item :key="n" v-for="n in 10" style="position: relative;">
          <a-button v-if="trainStatus === 'finished'" size="small" type="primary" class="deployed" @click="toggleDeployment" style="color: white;">
            {{ isDeployed ? '下线' : '发布上线' }}
          </a-button>
          <a-list-item-meta title="张三的刷脸大模型">
            <div slot="description" v-if="trainStatus === 'finished'">
              <a-tag>准确率（Accuracy）：80%</a-tag>
              <a-tag>精确率（Precision）：80%</a-tag>
              <a-tag>召回率（Recall）：80%</a-tag>
              <a-tag>F1分数（F1 Score）：80%</a-tag>
              <a-tag>均方误差（MSE）：80%</a-tag>
              <a-tag>均方根误差（RMSE）：80%</a-tag>
              <a-tag>平均绝对误差（MAE）：80%</a-tag>
            </div>
            
          </a-list-item-meta>
          <div class="content">
            <div class="detail">
              
            </div>
            
            <div class="train-status" style="margin-top: 12px;">
              <span>训练状态：</span>
              <a-tag v-if="trainStatus === 'processing'" color="blue">训练中</a-tag>
              <a-tag v-else-if="trainStatus === 'stopped'" color="red">已停止</a-tag>
              <a-tag v-else-if="trainStatus === 'finished'" color="green">已完成</a-tag>
              <a-button size="small" type="primary" style="margin-left: 16px;">查看日志</a-button>
            </div>
          </div>
          
        </a-list-item>
      </a-list>
  </div>
  <a-pagination v-model="current" :total="50" show-less-items />
  </div>

  
</template>

<script>
import PageHeader from '@/components/page/header/PageHeader'

export default {
  name: 'CardList',
  components: {PageHeader},
  
  data () {
    return {
      current: 2,
      desc: '本OCR模型的训练结果显示出良好的性能指标。模型在识别正确样本方面表现出色，准确率（Accuracy）为80%。精确率（Precision）和召回率（Recall）均为80%，表明模型在识别正样本时的准确性和覆盖率都达到了较高水平。F1分数（F1 Score）为80%，综合了精确率和召回率的表现。均方误差（MSE）和均方根误差（RMSE）均为80%，显示出模型在预测误差方面的稳定性。平均绝对误差（MAE）为80%，进一步验证了模型的预测精度。当前训练状态为：训练中，表明模型仍在持续优化中。',
      trainStatus: 'finished',
      isDeployed: false, // 默认未上线
    }
  },
  methods: {
    toggleDeployment() {
      this.isDeployed = !this.isDeployed;
      // 在这里添加发布上线或下线的逻辑
      console.log(this.isDeployed ? '模型已上线' : '模型已下线');
    },
    openDoc() {
      this.$router.push({
        path: '/dataset/create',
      })
    },
    handleModeConfig() {
      this.$router.push({
        path: '/models/config',
      })
    },
    
  }
}
</script>

<style lang="less" scoped>
:deep(.ant-tag) {
  color: #333 !important;
}
 .card-list{
    margin-top: 24px;
    background: white; 
    padding-left: 20px;
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
  .extra{
    width: 272px;
    height: 1px;
  }
  .content {
    .detail {
      line-height: 22px;
    }
    .author {
      color: @text-color-second;
      margin-top: 16px;
      line-height: 22px;
      & > :global(.ant-avatar) {
          vertical-align: top;
          margin-right: 8px;
          width: 20px;
          height: 20px;
          position: relative;
          top: 1px;
        }
      & > em {
          color: @disabled-color;
          font-style: normal;
          margin-left: 16px;
        }
    }
  }

  .deployed {
    color: white;
    position: absolute;top: 25px;right: 65px;
  }
</style>
