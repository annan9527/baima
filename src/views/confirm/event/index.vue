<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col>
        <el-table
          ref="table"
          v-loading="crud.loading"
          :data="crud.data"
          style="width: 100%"
          @selection-change="crud.selectionChangeHandler"
        >
        
          <el-table-column
            v-if="columns.visible('userName')"
            :show-overflow-tooltip="true"
            prop="userName"
            label="姓名"
          />
          <el-table-column
            v-if="columns.visible('eventTitle')"
            :show-overflow-tooltip="true"
            prop="eventTitle"
            label="事件标题"
          />
          <el-table-column
            v-if="columns.visible('eventContent')"
            :show-overflow-tooltip="true"
            prop="eventContent"
            label="事件内容"
          />
          <el-table-column
            v-if="columns.visible('status')"
            :show-overflow-tooltip="true"
            prop="status"
            label="状态"
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
        </el-table>
        <!--分页组件-->
        <pagination />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import event from "@/api/system/event";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
import pagination from "@crud/Pagination";
import Treeselect from "@riophae/vue-treeselect";
import { mapGetters } from "vuex";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

let userRoles = [];
// crud交由presenter持有
const defaultCrud = CRUD({
  title: "用户",
  url: "api/event",
  crudMethod: { ...event },
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
  name: "Event",
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
        add: ["admin", "event:add"],
        edit: ["admin", "event:edit"],
        del: ["admin", "event:del"],
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
  },
};
</script>

<style scoped>
</style>
