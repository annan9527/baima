<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col>
        <!--工具栏-->
        <div class="head-container">
         
        </div>
        <!--表单渲染-->
        <!--表格渲染-->
        <el-table
          ref="table"
          v-loading="crud.loading"
          :data="crud.data"
          style="width: 100%"
        >
          <el-table-column
            v-if="columns.visible('userName')"
            :show-overflow-tooltip="true"
            prop="userName"
            label="姓名"
          />
          <el-table-column
            v-if="columns.visible('workUnit')"
            :show-overflow-tooltip="true"
            width="125"
            prop="workUnit"
            label="工作单位"
          />
          <el-table-column
            v-if="columns.visible('domicile')"
            :show-overflow-tooltip="true"
            prop="domicile"
            label="户籍地"
          />
          <el-table-column
            v-if="columns.visible('homePlace')"
            :show-overflow-tooltip="true"
            prop="homePlace"
            label="居住地"
          />
          <el-table-column
            v-if="columns.visible('idCard')"
            prop="idCard"
            width="150"
            label="身份证号"
          />
          <el-table-column
            v-if="columns.visible('mobile')"
            :show-overflow-tooltip="true"
            prop="mobile"
            width="100"
            label="手机号"
          />
          <el-table-column
            v-if="columns.visible('createTime')"
            :show-overflow-tooltip="true"
            prop="createTime"
            width="140"
            label="创建日期"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="删除"
            width="125"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="del(scope)"
                />
            </template>
          </el-table-column>
          <el-table-column
            label="审核"
            width="125"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button @click="check(scope)" type="warning" size="mini"
                >审核</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <pagination />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import tenantUsers from "@/api/system/tenantUsers";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
import pagination from "@crud/Pagination";
import Treeselect from "@riophae/vue-treeselect";
import { mapGetters } from "vuex";


let userRoles = [];
// crud交由presenter持有
const defaultCrud = CRUD({
  title: "用户",
  url: "api/tenantUsers",
  query: { checked: "待审核" },
  crudMethod: { ...tenantUsers },
});
const defaultForm = {
  username: null,
  nickName: null,
  sex: "男",
  email: null,
  enabled: "false",
  roles: [],
  job: { id: null },
  dept: { id: null },
  phone: null,
};
export default {
  name: "Tenant",
  components: {
    Treeselect,
    crudOperation,
    rrOperation,
    udOperation,
    pagination,
  },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  // 数据字典
  dicts: ["user_status"],
  data() {
    return {
      height: document.documentElement.clientHeight - 180 + "px;",
      deptName: "",
      depts: [],
      deptDatas: [],
      jobs: [],
      level: 3,
      roles: [],
      defaultProps: { children: "children", label: "name" },
      permission: {
        add: ["admin", "user:add"],
        edit: ["admin", "user:edit"],
        del: ["admin", "user:del"],
      },
      enabledTypeOptions: [
        { key: "true", display_name: "激活" },
        { key: "false", display_name: "锁定" },
      ],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.crud.optShow = {
      add: false,
      edit: false,
      del: false,
    };
  },
  mounted: function () {
    const that = this;
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 180 + "px;";
    };
  },
  methods: {

    // 删除
    del(scope){
       this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.crud.doDelete(scope.row)        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    // 审核
    check(val) {
      console.log(val.row.id);
       this.$confirm('审核通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '审核成功!'
          });
          // 审核成功 删除数据
         this.crud.doEdit(val.row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          });          
        });
    },
    
    
  },
};
</script>

<style scoped>
</style>
