<template>
  <div class="page-layout">
    <page-header ref="pageHeader" :style="`margin-top: 0px`" >
      <slot name="action"  slot="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p>{{desc}}</p>
        <div class="link">
          <span @click="addNew">
            <a-icon type="plus-circle" />创建数据集
          </span>
          <span @click="openDoc">
            <a-icon type="file-text" />使用说明
          </span>
        </div>
      </div>
      
      <slot v-if="this.$slots.extra" slot="extra" name="extra"></slot>
    </page-header>
    <a-card class="card-list">
    
    <div>
      
      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows.sync="selectedRows"
        @clear="onClear"
        @change="onChange"
        :pagination="{...pagination, onChange: onPageChange}"
        @selectedRowChange="onSelectChange"
      >
        <div slot="description" slot-scope="{text}">
          {{text}}
        </div>
        <div slot="action" slot-scope="{text, record}">
          
          <a style="margin-right: 8px" @click="handleEdit(record)">
            <a-icon type="edit"/>编辑
          </a>
          <a @click="deleteRecord(record.key)">
            <a-icon type="delete" />删除
          </a>
          <router-link :to="`structure/detail?id=${record.key}`" >详情</router-link>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
    </div>
  </a-card>

  <a-modal 
      v-model="open" 
      title="新增数据转换规则" 
      @ok="handleOk" 
      width="700px"
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
              <a-input v-model="formData.name" placeholder="请输入名称" style="width: 100%" />
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row style="margin-top: 16px">
        <a-col :span="24">
          <div class="dataset-upload">
            <div class="upload-label">
              <span class="label">模板文件：</span>
            </div>
            <div class="upload-content">
              <a-textarea 
                v-model="formData.output_excel" 
                placeholder="请输入模板文件路径"
                :rows="4"
                style="width: 100%" 
              />
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row style="margin-top: 16px">
        <a-col :span="24">
          <div class="dataset-upload">
            <div class="upload-label">
              <span class="label">类型：</span>
            </div>
            <div class="upload-content">
              <a-select v-model="formData.type" placeholder="请选择类型" style="width: 100%">
                <a-select-option :value="0">原料进厂</a-select-option>
                <a-select-option :value="1">原料检验</a-select-option>
                <a-select-option :value="2">产品检验</a-select-option>
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
import StandardTable from '@/components/table/StandardTable'

const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '模板文件',
    dataIndex: 'output_excel',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: '类型',
    dataIndex: 'type',
    customRender: (text) => {
      const typeMap = {
        0: '原料进厂',
        1: '原料检验',
        2: '产品检验'
      }
      return typeMap[text] || text
    }
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    sorter: true
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'CardList',
  components: {PageHeader,StandardTable},
  data () {
    return {
      current:2,
      desc: '数据结构化转换是OCR识别后的关键环节。本功能支持将OCR识别后的Excel文件，通过灵活的JSON规则映射，实现数据的智能提取和结构化转换。可处理多种类型的文档，包括表格、发票、合同等，并可自定义转换规则，确保数据能高效、准确地对接到第三方系统。',
      dataSource:[],
      advanced: true,
      columns: columns,
      selectedRows: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      open: false,
      loading: false,
      formData: {
        name: '',
        output_excel: '',
        type: undefined
      }
    }
  },
  authorize: {
    deleteRecord: 'delete'
  },
  mounted() {
    this.getData()
  },
  methods: {
    onPageChange(page, pageSize) {
      this.pagination.current = page
      this.pagination.pageSize = pageSize
      this.getData()
    },
    getData() {
      // 模拟接口返回数据
      const mockData = {
        code: 200,
        msg: "success",
        data: {
          total: 6,
          list: [
            {
              id: 5,
              name: "玻璃纤维液体过滤纸检验记录(半成品)",
              output_excel: "temp/05.xlsx",
              type: 2,
              update_time: "2025-03-21T17:18:19"
            },
            {
              id: 4,
              name: "玻璃纤维空气过滤纸检验记录(半成品)",
              output_excel: "temp/04_02.xlsx",
              type: 2,
              update_time: "2025-04-01T10:17:13"
            },
            {
              id: 6,
              name: "玻璃纤维空气过滤纸检验记录(成品)",
              output_excel: "temp/04_01.xlsx",
              type: 2,
              update_time: "2025-04-01T09:11:57"
            },
            {
              id: 3,
              name: "原料进厂检验表Ⅲ",
              output_excel: "temp/03_02.xlsx",
              type: 1,
              update_time: "2025-04-22T06:42:31"
            },
            {
              id: 2,
              name: "原料进厂检验表Ⅱ",
              output_excel: "temp/02_01.xlsx",
              type: 0,
              update_time: "2025-04-01T10:17:13"
            },
            {
              id: 1,
              name: "原料进厂检验表I",
              output_excel: "temp/01.xlsx",
              type: 0,
              update_time: "2025-04-01T07:31:57"
            }
          ]
        }
      };
  
      // 处理数据
      if (mockData.code === 200) {
        const { total, list } = mockData.data;
        this.dataSource = list.map(item => ({
          ...item,
          key: item.id // 为每条数据添加唯一的key
        }));
        this.pagination.total = total;
      }
    },
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key)
      this.selectedRows = this.selectedRows.filter(item => item.key !== key)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    remove () {
      this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
      this.selectedRows = []
    },
    onClear() {
      this.$message.info('您清空了勾选的所有行')
    },
    onStatusTitleClick() {
      this.$message.info('你点击了状态栏表头')
    },
    onChange() {
      this.$message.info('表格状态改变了')
    },
    onSelectChange() {
      this.$message.info('选中行改变了')
    },
    addNew () {
      this.open = true
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
    
  
  handleImport() {
    // 这里处理导入数据逻辑
    this.$message.info('导入数据功能')
  },
  openDoc() {
    window.open(process.env.VUE_APP_WEBSITE + '/help', '_blank')
  },
  handleEdit(record) {
    this.formData = {
      ...record
    }
    this.open = true
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
