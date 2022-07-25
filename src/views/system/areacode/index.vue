<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <crudOperation :permission="permission" />
    </div>
    <!--表单组件-->
    <!-- 弹层 -->
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="编码" prop="areaId">
          <el-input v-model="form.areaId" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="名称" prop="areaName">
          <el-input v-model="form.areaName" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="类型" prop="areaType">
          <el-input v-model="form.areaType" style="width: 370px;" />
        </el-form-item>
        <el-form-item v-if="form.parentId !== 0" style="margin-bottom: 0;" label="上级组织" prop="pid">
          <treeselect v-model="form.parentId" :options="depts" style="width: 370px;" :normalizer="normalizer" placeholder="选择上级类目" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :tree-props="{hasChildren: 'hasChildren'}" lazy :load="load" :data="crud.data" row-key="areaId" @select="crud.selectChange" @select-all="crud.selectAllChange" @selection-change="crud.selectionChangeHandler">
      <el-table-column :selectable="checkboxT" type="selection" width="55" />
      <el-table-column v-if="columns.visible('areaName')" label="地区名称" prop="areaName" sortable/>
      <el-table-column v-if="columns.visible('areaType')" label="地区类型" prop="areaType" sortable/>
      <el-table-column  label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            :disabled-dle="scope.row.id === 1"
            msg="确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {initData} from '@/api/data.js'
import crudDept from '@/api/system/areaCode.js'
import Treeselect from '@riophae/vue-treeselect'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import { tree } from "@/api/system/areaCode.js";
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


// crud交由presenter持有
const defaultCrud = CRUD({ title: '组织架构', url: 'api/areaCode/list',query:{pid:3308}, crudMethod: { ...crudDept }})
const defaultForm = { areaId: null, areaName: null, areaType: null, parentId: null }
export default {
  name: 'Dept',
  components: { Treeselect, crudOperation, rrOperation, udOperation },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  // 设置数据字典
  dicts: ['dept_status'],
  data() {
    return {
      depts: [],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      permission: {
        add: ['admin', 'dept:add'],
        edit: ['admin', 'dept:edit'],
        del: ['admin', 'dept:del']
      },
      enabledTypeOptions: [
        { key: 'true', display_name: '正常' },
        { key: 'false', display_name: '禁用' }
      ]
    }
  },
  methods: {
    load(tree, treeNode, resolve) {
      initData('api/areaCode/list',{pid:tree.areaId}).then(res=>{
        resolve(res.content)
      })
    },
    getDeptDatas(tree, treeNode, resolve) {
      const params = { pid: tree.id }
      setTimeout(() => {
          crudDept.tree(params).then(res => {
          resolve(res.data)
        })
      }, 100)
    },
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      
    },
    getSupDepts(id) {
      var data={"pid":id};
      crudDept.tree(data).then(res => {
        const date = res.data
        this.buildDepts(date)
        this.depts = date
        console.log(this.depts)
      })
    },
    buildDepts(depts) {
      depts.forEach(data => {
        if (data.children) {
          this.buildDepts(data.children)
        }
        if (data.hasChildren && !data.children) {
          data.children = null
        }
      })
    },
    normalizer(node) {
       //去掉children=null的属性
      if (node.children == null || node.children == "null") {
        delete node.children;
        return {
          id: node.key,
          label: node.name,
        };
      } else {
        return {
          id: node.key,
          label: node.name,
          children: node.children,
        };
      }
    },
    getDepts() {
        tree({ enabled: true }).then((res) => {
        this.depts = res;
      });
    },
    // 获取弹窗内部门数据
    loadDepts({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        crudDept.getDepts({ enabled: true, pid: parentNode.id }).then(res => {
          parentNode.children = res.content.map(function(obj) {
            if (obj.hasChildren) {
              obj.children = null
            }
            return obj
          })
          setTimeout(() => {
            callback()
          }, 100)
        })
      }
    },
    // 提交前的验证
    [CRUD.HOOK.afterValidateCU]() {
    },
     [CRUD.HOOK.afterToCU](crud, form) {
      this.getDepts();
    },
    // 改变状态
    changeEnabled(data, val) {
      this.$confirm('此操作将 "' + this.dict.label.dept_status[val] + '" ' + data.name + '部门, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crudDept.edit(data).then(res => {
          this.crud.notify(this.dict.label.dept_status[val] + '成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        }).catch(err => {
          data.enabled = !data.enabled
          console.log(err.response.data.message)
        })
      }).catch(() => {
        data.enabled = !data.enabled
      })
    },
    checkboxT(row, rowIndex) {
      return row.id !== 1
    }
  },
  created(){
    console.log(this.crud.crudMethod.add)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value {
  height: 30px;
  line-height: 30px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
