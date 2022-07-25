<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          v-model="query.value"
          clearable
          placeholder="输入搜索内容"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <el-select
          v-model="query.type"
          clearable
          placeholder="类型"
          class="filter-item"
          style="width: 130px"
        >
          <el-option
            v-for="item in queryTypeOptions"
            :key="item.key"
            :label="item.display_name"
            :value="item.key"
          />
        </el-select>
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog
        :close-on-click-modal="false"
        :before-close="crud.cancelCU"
        :visible.sync="crud.status.cu > 0"
        :title="crud.status.title"
        width="500px"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          size="small"
          label-width="80px"
        >
          <el-form-item label="组别">
            <el-input v-model="form.groupName" style="width: 370px" />
          </el-form-item>
          <el-form-item label="片区">
            <el-select v-model="form.pid" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.vaule"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="微网格名称">
            <el-input v-model="form.girdName" style="width: 370px" />
          </el-form-item>
          <el-form-item label="管理户号">
            <treeselect
              v-model="areaIds"
              :multiple="true"
              :options="depts"
              style="width: 308px"
              placeholder="选择户号"
              :normalizer="normalizer"
            />
          </el-form-item>
          <el-form-item label="微网格管理员用户" style="width: 500px">
            <el-select
              v-model="form.userId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入管理员姓名"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.mobile
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保障员用户">
            <el-select
              v-model="form.protectionUserId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入保障员用户姓名"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.mobile
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="信息员用户">
            <el-select
              v-model="form.informationUserId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入信息员用户姓名"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.mobile
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="form.createTime"
              type="datetime"
              style="width: 370px"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button
            :loading="crud.cu === 2"
            type="primary"
            @click="crud.submitCU"
            >确认</el-button
          >
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        size="small"
        style="width: 100%"
        @selection-change="crud.selectionChangeHandler"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-if="columns.visible('groupName')"
          prop="groupName"
          label="组别"
        />
        <el-table-column
          v-if="columns.visible('pid')"
          prop="parentGirdName"
          label="片区"
        />
        <el-table-column
          v-if="columns.visible('girdName')"
          prop="girdName"
          label="微网格名称"
        />
        <el-table-column
          v-if="columns.visible('userId')"
          prop="userName"
          label="微网格管理员用户"
        />
        <el-table-column
          v-if="columns.visible('protectionUserId')"
          prop="protectionUserName"
          label="保障员用户"
        />
        <el-table-column
          v-if="columns.visible('informationUserId')"
          prop="informationUserName"
          label="信息员用户"
        />
        <el-table-column
          v-if="columns.visible('createTime')"
          prop="createTime"
          label="创建时间"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-permission="['admin', 'smartGird:edit', 'smartGird:del']"
          label="操作"
          width="150px"
          align="center"
        >
          <template slot-scope="scope">
            <udOperation :data="scope.row" :permission="permission" />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
// 获取所有角色
// 获取树形结构
// 获取微网格列表
import { girdall } from "@/api/tools/gird.js";
import { tree } from "@/api/system/areaCode.js";
import { check } from "@/api/tbUsers/tbUsers.js";
import CRUD, { crud, form, header, presenter } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
import pagination from "@crud/Pagination";
import MaterialList from "@/components/material";
import crudSmartGird from "@/api/tools/smartGird.js";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// crud交由presenter持有
const defaultCrud = CRUD({
  title: "微网格管理",
  url: "api/smartGird",
  sort: "id,desc",
  crudMethod: { ...crudSmartGird },
});
const defaultForm = {
  id:null,
  groupName: null,
  pid: null, //片区
  girdName: null,
  areaIds: null,
  userId: null,
  userName: null,
  informationUserId: null,
  informationUserName: null,
  createTime: null,
  protectionUserName: null,
  protectionUserId: null,
  parentGirdName: null,
};
export default {
  name: "SmartGird",
  components: {
    pagination,
    crudOperation,
    rrOperation,
    udOperation,
    MaterialList,
    Treeselect,
  },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  data() {
    return {
      options: [],
      smartGirdlist: [],
      areaIds: [], //回显
      deptName: "",
      depts: [],
      list: [],
      deptDatas: [],
      loading: false,
      defaultProps: { children: "children", label: "name" },
      permission: {
        add: ["admin", "smartGird:add"],
        edit: ["admin", "smartGird:edit"],
        del: ["admin", "smartGird:del"],
      },
      rules: {},
      queryTypeOptions: [
        {
          key: "groupName",
          display_name: "组别",
        },
        {
          key: "pid",
          display_name: "片区",
        },
        {
          key: "girdName",
          display_name: "微网格名称",
        },
      ],
    };
  },
  watch: {},
  methods: {
    Girdall() {
      girdall().then((res) => {
        console.log(res);
        this.options = res.content.map((item) => {
          return { vaule: item.id, label: item.girdName };
        });
        console.log(this.options);
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          check(query).then((res) => {
            this.list = res.content.map((item) => {
              return {
                value: item.id,
                label: item.userName,
                mobile: item.mobile,
              };
            });
          });
        }, 1000);
      }
    },
    //  树
    getDepts() {
      tree({ enabled: true }).then((res) => {
        this.depts = res;
      });
    },
    // 树
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
    // 获取数据前设置好接口地址
    [CRUD.HOOK.beforeRefresh]() {
      const query = this.query;
      if (query.type && query.value) {
        this.crud.params[query.type] = query.value;
      } else {
        delete this.crud.params.groupName;
        delete this.crud.params.pid;
        delete this.crud.params.girdName;
      }
      return true;
    }, // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
    
      this.getDepts();
      if (!form.areaIds) {
        this.areaIds = null;
      }
    },
    [CRUD.HOOK.beforeSubmit](crud, form) {
      this.form.areaIds = this.areaIds.join(",");
    },
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.list = [];
      this.list.push({
        value: form.informationUserId,
        label: form.informationUserName,
      });
      this.list.push({
        value: form.protectionUserId,
        label: form.protectionUserName,
      });
      this.list.push({ value: form.userId, label: form.userName });
      //  回显
      let str = form.areaIds;
      this.areaIds = str.split(",");
    },
  },
  created() {
    this.Girdall();
  },
};
</script>

<style scoped>
.table-img {
  display: inline-block;
  text-align: center;
  background: #ccc;
  color: #fff;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  width: 50px;
  height: 32px;
  line-height: 32px;
}
.el-form-item__label {
  width: 88px;
}
</style>
