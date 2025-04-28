<template>
  <div class="page-layout">
    <page-header ref="pageHeader" :style="`margin-top: 0px`" >
      <slot name="action"  slot="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p>{{desc}}</p>
        <div class="link">
          
        </div>
      </div>
      <slot v-if="this.$slots.extra" slot="extra" name="extra"></slot>
    </page-header>
    <div class="card-list">
    
      <a-row class="row">
        <a-col :span="2" class="input_lable">
          模型名称：
        </a-col>
        <a-col >
          <a-input placeholder="试试看"  v-model="modelName"  style="width:300px" >
        </a-input>
        </a-col>
      </a-row> 
      <a-row class="row">
        <a-col :span="2" class="input_lable">
          数据集：
        </a-col>
        <a-col> 
          <a-select placeholder="不限" style="width: 120px">
                <a-select-option value="1">优秀</a-select-option>
              </a-select>
        
        </a-col>
      </a-row> 
    </div>
    <div class="card-list">
    
    <a-row class="row">
      <a-col :span="2" class="input_lable">
        <a-icon type="sliders" theme="twoTone" /> 数据处理
      </a-col>
      
    </a-row> 
    <a-row class="row">
      <a-col :span="2" class="input_lable">
        训练占比:
      </a-col>
      <a-col :span="2"  class="ratio"> 
        <a-input-number
            v-model="train_ratio"
            :min="0"
            :max="70"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
          />
    
      </a-col>
      <a-col :span="12" class="input_lable">
        <a-slider v-model="sliderValue" :tooltip-open="true" />
      </a-col>
      <a-col :span="2" class="input_lable">
        验证占比:
      </a-col>
      <a-col :span="2" class="ratio"> 
        <a-input-number
            v-model="verify_ratio"
            :min="0"
            :max="30"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
            
          />
      </a-col>
    </a-row> 
    <a-row class="row">
      <a-col :span="2">
        
      </a-col>
      <a-col  class="train_desc">
        本工具可完成数据集的训练集和验证集按比例随机切分，如果上传数据焦中含数据切分文件，会进行重新切分并保存为新的数据集，切分占比1-99之间，不可为0
      </a-col>
    </a-row>
    <a-row class="row">
      <a-col :span="2" class="train_desc">
        
      </a-col>
      <a-col :span="6" class="train_dataset">
        训练集：701个样本，占比70.00%
      </a-col>
      <a-col :span="6" class="train_dataset">
        验证集：176个样本，占比30.00%
      </a-col>
      <a-col :span="10" class="train_desc">
        
      </a-col>
    </a-row>
    <a-row class="row">
      <a-col class="dataset_check">
        <a-button type="primary" block>数据校验</a-button>
      </a-col>
    </a-row>
  </div>
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
      modelName: 'finished',
      sliderValue: 30,
      verify_ratio: 30,
      train_ratio: 30
    }
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
:deep(.ant-tag) {
  color: #333 !important;
}
 .card-list{
    padding-top: 15px;
    margin-top: 24px;
    background: white; 
    padding-left: 20px;
    padding-bottom: 24px;
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

  .input_lable {
    height: 31px; line-height: 31px; 
    text-align: right;
  }
  .train_desc {
    height: 31px; line-height: 31px; 
    text-align: left;
  }
  .train_dataset{
    background: #1890ff1a;
    padding: 0 10px;
    margin-right: 10px;
    height: 31px; line-height: 31px; 
  }
  .row{
    height: 46px;
  }
  .ratio{
    padding-left: 10px;
  }
  .dataset_check {
    height: 31px; line-height: 31px; 
    text-align: center;
    button{
      width: 300px;
    }
  }
</style>
