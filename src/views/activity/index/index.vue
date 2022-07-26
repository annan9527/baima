<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col>
        <!--工具栏-->
        <div class="head-container">
          <div v-if="crud.props.searchToggle">
            <el-input
              v-model="query.userName"
              clearable
              size="small"
              placeholder="活动名字"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            />
            <rrOperation :crud="crud" />
          </div>
          <crudOperation show="" :permission="permission" />
        </div>
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
            <el-form-item label="活动名" prop="activityTitle">
              <el-input v-model="form.activityTitle" />
            </el-form-item>
            <el-form-item label="活动内容" prop="activityContent">
              <!-- 富文本编辑器 -->
              <MyEditor @changes="change" ref="bianji"></MyEditor>
            </el-form-item>
            <el-form-item label="活动日期" prop="activityDate">
              <el-date-picker
                v-model="form.activityDate"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="志愿者类型" prop="volunteerType">
              <el-radio-group v-model="form.volunteerType">
                <el-radio label="青春白马">青春白马</el-radio>
                <el-radio label="阳光白马">阳光白马</el-radio>
                <el-radio label="白马铁军">白马铁军</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="志愿者" prop="volunteerUserNames">
              <el-input v-model="form.volunteerUserNames" />
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
            v-if="columns.visible('activityTitle')"
            :show-overflow-tooltip="true"
            prop="activityTitle"
            label="活动名"
          />

          <el-table-column
            v-if="columns.visible('activityDate')"
            :show-overflow-tooltip="true"
            prop="activityDate"
            label="活动日期"
          >
          </el-table-column>
          <el-table-column
            v-if="columns.visible('volunteerType')"
            :show-overflow-tooltip="true"
            prop="volunteerType"
            label="志愿者类型"
          />
          <el-table-column
            v-if="columns.visible('volunteerUserNames')"
            :show-overflow-tooltip="true"
            prop="volunteerUserNames"
            label="志愿者"
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
import crudUser from "@/api/system/activity";
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
import UeditorWrap from "vue-ueditor-wrap";
import MyEditor from "../../components/MyEditor.vue";
let userRoles = [];
// crud交由presenter持有
const defaultCrud = CRUD({
  title: "志愿者活动管理",
  url: "/api/volunteerActivity",
  crudMethod: { ...crudUser },
});
const defaultForm = {
  volunteerType: "",
  id: "",
  activityTitle: "",
  activityContent: "",
  activityDate: "",
  volunteerUserNames: "",
  createTime: "",
};
export default {
  name: "Activity",
  components: {
    Treeselect,
    UeditorWrap,
    crudOperation,
    rrOperation,
    udOperation,
    pagination,
    MyEditor,
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
      zhide: null,
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
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        roles: [{ required: true, message: "请选择角色", trigger: "blur" }],
        phone: [{ required: true, trigger: "blur", validator: validPhone }],
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
    change(val) {
     
      this.form.activityContent = val;
    },
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
     
      let that = this
      setTimeout(function () {
        that.$refs.bianji.changehtml(form.activityContent);
      },0);
    },
    selectModel(setVal) {
      this.form.userId = this.form.item.id;
      this.form.userName = this.form.item.userName;
    },
    // 打开编辑弹窗前做的操作
    [CRUD.HOOK.beforeToEdit](crud, form) {
      // // this.getJobs(this.form.dept.id);
      // userRoles = [];
      // const roles = [];
      // form.roles.forEach(function (role, index) {
      //   roles.push(role.id);
      //   // 初始化编辑时候的角色
      //   const rol = { id: role.id };
      //   userRoles.push(rol);
      // });
      // form.roles = roles;
    },
    // 提交前做的操作
    // [CRUD.HOOK.afterValidateCU](,form) {
    //           console.log(form)
    // },
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
