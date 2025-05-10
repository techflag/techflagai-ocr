<template>
  <div class="page-layout">
    <page-header ref="pageHeader" :style="`margin-top: 0px`" >
      <slot name="action"  slot="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p>{{desc}}</p>
        <div class="link">
          <span @click="handleNewModel()">
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
      <a-list-item 
        :key="item.id" 
        v-for="item in modelsList" 
        style="position: relative; cursor: pointer;"
        @click="handleModeConfig(item)"
      >
        <a-button 
          v-if="item.status === 2" 
          size="small" 
          type="primary" 
          class="deployed" 
          @click="toggleDeployment(item)"
          style="color: white;"
        >
          {{ item.use_status === 1 ? '下线' : '发布上线' }}
        </a-button>
        <a-list-item-meta :title="item.name">
          <div slot="description" v-if="item.status === 2">
            <a-tag v-if="item.acc">准确率（Accuracy）：{{item.acc}}</a-tag>
            <a-tag>训练集占比：{{item.train_set}}%</a-tag>
            <a-tag>测试集占比：{{item.val_set}}%</a-tag>
            <a-tag>状态：
              <span v-if="item.status === 0">配置中</span>
              <span v-if="item.status === 1">运行中</span>
              <span v-if="item.status === 2">运行完成</span>
              <span v-if="item.status === 3">已取消</span>
            </a-tag>
          </div>
        </a-list-item-meta>
        <div class="content">
          <div class="train-status" style="margin-top: 12px;">
            <span>更新时间：{{item.update_time}}</span>
            <a-button size="small" type="primary" style="margin-left: 16px;">查看日志</a-button>
          </div>
        </div>
      </a-list-item>
    </a-list>
  </div>
  <div class="pagination-container">
  <a-pagination v-model="current" :total="modelsLisTotal" :show-total="total => `共 ${total} 条记录`"  @change="onPageChange" show-less-items  />
  </div>  

  <a-modal 
      v-model="open" 
      title="新增模型" 
      @ok="handleOk" 
      width="400px"
      :destroyOnClose="true"
    >
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">提交</a-button>
      </template>
      
      <a-row>
        <a-col :span="24">
          <div class="dataset-upload">
            <div class="upload-label">
              <span class="label">名称：</span>
            </div>
            <div class="upload-content">
              <a-input 
                v-model="modelName" 
                placeholder="请输入模型名称" 
                style="width: 100%"
                :maxLength="20"
                :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
              />
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <div class="dataset-upload">
            <div class="upload-label">
              <span class="label">模型：</span>
            </div>
            <div class="upload-content">
              <a-select v-model="producte_line" @change="val => producte_line = val" style="width: 200px">
                <a-select-option 
                  v-for="option in modelOptions" 
                  :key="option.value" 
                  :value="option.value"
                  :selected="option.value === producte_line"
                >
                  {{ option.label }}
                </a-select-option>
              </a-select>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-modal>
  
</div>

  
</template>

<script>
import PageHeader from '@/components/page/header/PageHeader'
import { find, list,save_model } from '@/services/models'

export default {
  name: 'ModelsList',
  components: {PageHeader},
  
  data () {
    return {
      desc: '本OCR模型的训练结果显示出良好的性能指标。模型在识别正确样本方面表现出色，准确率（Accuracy）为80%。精确率（Precision）和召回率（Recall）均为80%，表明模型在识别正样本时的准确性和覆盖率都达到了较高水平。F1分数（F1 Score）为80%，综合了精确率和召回率的表现。均方误差（MSE）和均方根误差（RMSE）均为80%，显示出模型在预测误差方面的稳定性。平均绝对误差（MAE）为80%，进一步验证了模型的预测精度。当前训练状态为：训练中，表明模型仍在持续优化中。',
      trainStatus: 'finished',
      isDeployed: false, // 默认未上线
      current:1,
      pageSize: 10,
      listLoading: false,
      modelsLisTotal: 0,
      modelsList: [],
      modelName: '',
      open: false,
      loading: false,
      producte_line: '1',
      modelOptions: [
        { value: '1', label: '自训练' },
        { value: '2', label: '百度OCR' },
        { value: '3', label: '合合OCR' }
      ]
    }
  },
  created() {
    this.fetchModels()
  },
  methods: {
    onPageChange(page) {
      this.current = page
      this.fetchModels()
    },
    toggleDeployment() {
      this.isDeployed = !this.isDeployed;
      // 在这里添加发布上线或下线的逻辑
      console.log(this.isDeployed ? '模型已上线' : '模型已下线');
    },
    openDoc() {
      window.open(process.env.VUE_APP_WEBSITE + '/help', '_blank')
    },
    handleModeConfig(item) {
      this.$router.push({
        path: '/models/config',
        query: {
          id: item ? item.id : null
        }
      })
    },

    handleNewModel() {
      this.open = true
    },
    
    async fetchModels() {
      this.listLoading = true
      try {
        const res = await list({
          page: this.current,
          size: this.pageSize
        })
        this.modelsList = res.data.data.record || []
        this.modelsLisTotal = res.data.data.total || 0
      } catch (error) {
        this.$message.error('获取模型列表失败')
      } finally {
        this.listLoading = false
      }
    },
    handleCancel() {
      this.open = false
    },
    handleOk() {
      if (!this.modelName || this.modelName.trim().length === 0) {
        this.$message.error('请输入模型名称')
        return
      }
      if (this.modelName.length > 20) {
        this.$message.error('模型名称不能超过20个字符')
        return
      }
      this.loading = true
      save_model({
        name: this.modelName,
        producte_line: 1,
      }).then(res => {
        // 检查响应状态码
        if (res.data.code === 200) {
          this.loading = false;
          this.open = false;
          this.$message.success('创建模型成功');
          this.modelName = '';
          this.fetchModels();
        } else {
          this.$message.error(res.data.msg || '创建模型失败');
        }
      }).catch(error => {
        this.loading = false;
        this.$message.error('创建模型失败：' + (error.message || '未知错误'));
      })
    }
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

  .pagination-container {
    clear: both; /* 清除浮动 */
    width: 100%;
    text-align: center;
    padding: 16px 0;
    background: #fff;
  }
</style>
