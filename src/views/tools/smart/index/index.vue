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
              placeholder="姓名"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            />
            <rrOperation :crud="crud" />
          </div>
          <crudOperation show="" :permission="permission" />
        </div>
        <!--表单渲染-->
        <!-- 弹层 -->
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
            <el-form-item label="微网格名称" prop="girdName">
              <el-input v-model="form.girdName" />
            </el-form-item>
            <el-form-item label="管辖范围" prop="areaNames">
              <el-input v-model="form.areaNames" />
            </el-form-item>
            <el-form-item label="微网格员" prop="userName">
              <el-select
                v-model="form.item"
                value-key="id"
                @change="selectModel1"
                clearable
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
            <el-form-item label="联系电话" prop="userMobile">
              <el-input v-model="form.userMobile" />
            </el-form-item>
            <el-form-item label="信息员" prop="userName">
              <el-select
                v-model="form.item2"
                value-key="id"
                @change="selectModel2"
                clearable
              >
                <el-option
                  v-for="item in users"
                  :key="item.id"
                  :label="item.userName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话" prop="informationUserMobile">
              <el-input v-model="form.informationUserMobile" />
            </el-form-item>
            <el-form-item label="保障员" prop="userName">
              <el-select
                v-model="form.item3"
                value-key="id"
                @change="selectModel3"
                clearable
              >
                <el-option
                  v-for="item in users"
                  :key="item.id"
                  :label="item.userName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话" prop="protectionUserMobile">
              <el-input v-model="form.protectionUserMobile" />
            </el-form-item>
            <!-- 上传头像 -->
            <el-form-item label="上传头像"> 
              <el-upload
                class="avatar-uploader"
                action="http://47.100.166.173:8099/qujiangqu/api/common/file/upload"
                :show-file-list="false"
               :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
            v-if="columns.visible('girdName')"
            :show-overflow-tooltip="true"
            prop="girdName"
            label="微网格名称"
          />
          <el-table-column
            v-if="columns.visible('areaNames')"
            :show-overflow-tooltip="true"
            prop="areaNames"
            label="管辖范围"
          />
          <el-table-column
            v-if="columns.visible('userName')"
            :show-overflow-tooltip="true"
            prop="userName"
            label="微网格员"
          />
          <el-table-column
            v-if="columns.visible('informationUserName')"
            :show-overflow-tooltip="true"
            prop="informationUserName"
            label="信息员"
          />
          <el-table-column
            v-if="columns.visible('protectionUserName')"
            :show-overflow-tooltip="true"
            prop="protectionUserName"
            label="保障员"
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
import crudUser from "@/api/system/smart";
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
import { initData } from "@/api/data";

let userRoles = [];
// crud交由presenter持有
const defaultCrud = CRUD({
  title: "微网格信息",
  url: "api/smart/gird/page",
  query: { checked: "待审核" },
  crudMethod: { ...crudUser },
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
  name: "small",
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
      imageUrl: "", //上传头像,
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
    // 上传图片
    handleAvatarSuccess(res, file) {
       this.form.photoId=res.data
      this.imageUrl = URL.createObjectURL(file.raw);
    },
     beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
      initData("/api/users/smart-grid-manager/list").then((res) => {
        this.users = res.data;
      });
      form.enabled = form.enabled.toString();
    },
    selectModel1(setVal) {
      console.log(setVal);
      this.form.userId = setVal.id;
      this.form.userName = setVal.userName;
    },
    selectModel2(setVal) {
      this.form.userId = setVal.id;
      this.form.informationUserName = setVal.userName;
    },
    selectModel3(setVal) {
      this.form.userId = setVal.id;
      this.form.protectionUserName = setVal.userName;
    },
    // 打开编辑弹窗前做的操作
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.getJobs(this.form.dept.id);
      userRoles = [];
      const roles = [];
      form.roles.forEach(function (role, index) {
        roles.push(role.id);
        // 初始化编辑时候的角色
        const rol = { id: role.id };
        userRoles.push(rol);
      });
      form.roles = roles;
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

<style  scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
   
  border-color: #409eff;
}
.avatar-uploader-icon {
 border: 1px solid #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  border: 1px solid #d9d9d9;
  width: 100px;
  height: 100px;
  display: block;
}
</style>
