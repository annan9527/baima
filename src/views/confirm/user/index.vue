<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col>
        <!--工具栏-->
        <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
        <crudOperation :permission="permission" />
        <!--表单渲染-->
        <el-dialog
          append-to-body
          :close-on-click-modal="false"
          :before-close="crud.cancelCU"
          :visible.sync="crud.status.cu > 0"
          :title="crud.status.title"
          width="800px"
        >
          <el-form
            ref="form"
            :inline="true"
            :model="form"
            :rules="rules"
            size="small"
            label-width="110px"
          >
            <!-- <el-form-item label="类型" prop="type">
              <el-input v-model.number="form.type" />
            </el-form-item> -->
            <el-form-item label="类型">
              <el-select
                v-model="form.region"
                placeholder="请选择活动区域"
                v-model.number="form.type"
              >
                <el-option
                  label="衢南公司收入"
                  value="衢南公司收入"
                ></el-option>
                <el-option label="村集体收入" value="村集体收入"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年" prop="year">
              <el-input v-model.number="form.year" />
            </el-form-item>
            <el-form-item label="季度" prop="quarter">
              <el-input v-model.number="form.quarter" />
            </el-form-item>
            <el-form-item label="金额" prop="money">
              <el-input v-model.number="form.money" />
            </el-form-item>
            <el-form-item label="是否有效">
              <el-radio-group v-model="form.states" style="width: 178px">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
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
          style="width: 100%"
          @selection-change="crud.selectionChangeHandler"
        >
          <el-table-column
            :selectable="checkboxT"
            type="selection"
            width="55"
          />
          <el-table-column
            v-if="columns.visible('type')"
            :show-overflow-tooltip="true"
            prop="type"
            label="类型"
          />
          <el-table-column
            v-if="columns.visible('year')"
            :show-overflow-tooltip="true"
            prop="year"
            label="年"
          />
          <el-table-column
            v-if="columns.visible('quarter')"
            :show-overflow-tooltip="true"
            prop="quarter"
            label="季度"
          >
          </el-table-column>
          <el-table-column
            v-if="columns.visible('money')"
            :show-overflow-tooltip="true"
            prop="money"
            label="金额"
          />
          <el-table-column
            label="操作"
            width="125"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <udOperation
                :data="scope.row"
                :permission="permission"
                :disabled-dle="scope.row.id === user.id"
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
import collectiveIncome from "@/api/system/collectiveIncome";
import { isvalidPhone } from "@/utils/validate";
import { getDepts, tree } from "@/api/system/dept";
import { getAll, getRoles, getLevel } from "@/api/system/role";
import { getAllJob } from "@/api/system/job";
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
  title: "集体收入管理",
  url: "api/collectiveIncome/",
  crudMethod: { ...collectiveIncome },
});
const defaultForm = {
  type: null,
  year: null,
  quarter: null,
  money: null,
};
export default {
  name: "Collective",
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
    // 自定义验证
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };
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
      rules: {
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        year: [{ required: true, message: "请输入年份", trigger: "blur" }],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        quarter: [{ required: true, message: "请输入季度", trigger: "blur" }],
      },
      users: [],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.$nextTick(() => {
      this.crud.toQuery();
      this.crud.msg.add = "新增成功";
    });
  },
  mounted: function () {
    const that = this;
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 180 + "px;";
    };
  },
  methods: {
    changeRole(value) {
      userRoles = [];
      value.forEach(function (data, index) {
        const role = { id: data };
        userRoles.push(role);
      });
    },
    [CRUD.HOOK.afterAddError](crud) {
      this.afterErrorMethod(crud);
    },
    [CRUD.HOOK.afterEditError](crud) {
      this.afterErrorMethod(crud);
    },
    afterErrorMethod(crud) {
      // 恢复select
      const initRoles = [];
      userRoles.forEach(function (role, index) {
        initRoles.push(role.id);
      });
      crud.form.roles = initRoles;
    },
    deleteTag(value) {
      userRoles.forEach(function (data, index) {
        if (data.id === value) {
          userRoles.splice(index, value);
        }
      });
    },
    beforeInit() {
      this.url = "api/users";
      return true;
    },
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      console.log(form);
    },
    selectModel(setVal) {
      this.form.userId = this.form.item.id;
      this.form.userName = this.form.item.userName;
    },
    // 提交前做的操作
    [CRUD.HOOK.afterValidateCU](crud) {},
    // 获取左侧部门数据
    getDeptDatas() {
      const sort = "id,desc";
      const params = { sort: sort };
      if (this.deptName) {
        params["name"] = this.deptName;
      }
      getDepts(params).then((res) => {
        this.deptDatas = res.content;
      });
    },
    // 获取弹窗内部门数据
    getDepts() {
      tree({ enabled: true }).then((res) => {
        this.depts = res.data;
      });
    },
    // 切换部门
    handleNodeClick(data) {
      if (data.pid === 0) {
        this.query.deptId = null;
      } else {
        this.query.deptId = data.id;
      }
      this.crud.toQuery();
    },
    // 改变状态
    changeEnabled(data, val) {
      this.$confirm(
        '此操作将 "' +
          this.dict.label.user_status[val] +
          '" ' +
          data.username +
          ", 是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          crudUser
            .edit(data)
            .then((res) => {
              this.crud.notify(
                this.dict.label.user_status[val] + "成功",
                CRUD.NOTIFICATION_TYPE.SUCCESS
              );
            })
            .catch(() => {
              data.enabled = !data.enabled;
            });
        })
        .catch(() => {
          data.enabled = !data.enabled;
        });
    },
    // 获取弹窗内角色数据
    getRoles() {
      getRoles()
        .then((res) => {
          this.roles = res.data.list;
        })
        .catch(() => {});
    },
    // 获取弹窗内岗位数据
    getJobs(id) {
      getAllJob(id)
        .then((res) => {
          this.jobs = res.content;
        })
        .catch(() => {});
    },
    // 点击部门搜索对应的岗位
    selectFun(node, instanceId) {
      this.getJobs(node.id);
      this.form.job.id = null;
    },
    normalizer(node) {
      return {
        id: node.key,
        label: node.name,
        children: node.children,
      };
    },
    // 获取权限级别
    getRoleLevel() {
      getLevel()
        .then((res) => {
          this.level = res.level;
        })
        .catch(() => {});
    },
    checkboxT(row, rowIndex) {
      return row.id !== this.user.id;
    },
  },
};
</script>

<style scoped>
</style>
