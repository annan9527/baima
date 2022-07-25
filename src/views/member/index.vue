<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col>
        <!--工具栏-->
        <div class="head-container">
          <div v-if="crud.props.searchToggle">
            <el-input
              v-model="query.ageStart"
              clearable
              size="small"
              placeholder="年龄范围（开始）"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            />
            <el-input
              v-model="query.ageEnd"
              clearable
              size="small"
              placeholder="年龄范围（结束）"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            />
            <el-select
              v-model="query.changZhu"
              clearable
              size="small"
              placeholder="是否常驻"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
            <el-date-picker
              v-model="query.checkTime"
              type="date"
              placeholder="核酸检测时间"
              size="small"
              class="date-item"
              value-format="yyyy-MM-dd"
            />
            <el-select
              v-model="query.cunLiangWei"
              clearable
              size="small"
              placeholder="是否村两委"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
            <el-select
              v-model="query.diBaoHu"
              clearable
              size="small"
              placeholder="是否低保户"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
            <el-input
              v-model="query.domicile"
              clearable
              size="small"
              placeholder="户籍地"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            />
            <el-input
              v-model="query.idCard"
              clearable
              size="small"
              placeholder="身份证号"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            />
            <el-select
              v-model="query.liuDongDangYuan"
              clearable
              size="small"
              placeholder="是否流动党员"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
            <el-select
              v-model="query.partyMember"
              clearable
              size="small"
              placeholder="是否党员"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
            <el-select
              v-model="query.relation"
              clearable
              size="small"
              placeholder="是否户主"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
            <el-select
              v-model="query.sex"
              clearable
              size="small"
              placeholder="性别"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            >
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
            <el-input
              v-model="query.userName"
              clearable
              size="small"
              placeholder="姓名"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            />
            <el-select
              v-model="query.vaccineNum"
              clearable
              size="small"
              placeholder="疫苗次数是否满三次"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
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
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="form.userName" />
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
              <el-input v-model.number="form.mobile" />
            </el-form-item>
            <el-form-item label="授权地区" prop="areaId" style="width: 100%">
              <treeselect
                v-model="form.areaId"
                :options="depts"
                style="width: 300px"
                placeholder="选择地区"
                :normalizer="normalizer"
              />
            </el-form-item>
            <el-form-item
              label="所属地区"
              prop="regionAreaId"
              style="width: 100%"
            >
              <treeselect
                v-model="form.regionAreaId"
                :options="depts"
                style="width: 300px"
                placeholder="选择部门"
                :normalizer="normalizer"
              />
            </el-form-item>
            <el-form-item label="户籍地" prop="domicile">
              <el-input v-model="form.domicile" />
            </el-form-item>
            <el-form-item label="居住地" prop="homePlace">
              <el-input v-model="form.homePlace" />
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="form.idCard" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="form.remark" />
            </el-form-item>
            <el-form-item label="是否低保户">
              <el-radio-group v-model="form.diBaoHu" style="width: 178px">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否村两委">
              <el-radio-group v-model="form.cunLiangWei" style="width: 178px">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否流动党员">
              <el-radio-group
                v-model="form.liuDongDangYuan"
                style="width: 178px"
              >
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否党员">
              <el-radio-group v-model="form.partyMember" style="width: 178px">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex" style="width: 178px">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否战备人员">
              <el-radio-group
                v-model="form.zhanBeiRenYuan"
                style="width: 178px"
              >
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否残疾人">
              <el-radio-group v-model="form.canJi" style="width: 178px">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否村民代表">
              <el-radio-group v-model="form.cunMinDaiBiao" style="width: 178px">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否特殊人群">
              <el-radio-group v-model="form.teShuRenQun" style="width: 178px">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="与户主关系">
              <el-input v-model="form.relation" />
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="form.roleName" placeholder="请选择">
                <el-option label="网格管理员" value="网格管理员" />
                <el-option label="微网格管理员" value="微网格管理员" />
                <el-option label="普通用户" value="普通用户" />
              </el-select>
            </el-form-item>
            <el-form-item label="疫苗次数" prop="vaccineNum">
              <el-input v-model.number="form.vaccineNum" />
            </el-form-item>
            <el-form-item label="疫苗情况备注" prop="vaccineRemark">
              <el-input v-model="form.vaccineRemark" />
            </el-form-item>
            <el-form-item label="工作单位" prop="workUnit">
              <el-input v-model="form.workUnit" />
            </el-form-item>
            <el-form-item label="积分" prop="scores">
              <el-input v-model.number="form.scores" />
            </el-form-item>
            <el-upload
              class="avatar-uploader"
              action="/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <!-- 头像 -->
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
                style="margin-left: 100px; border-style: dashed"
                >添加照片</i
              >
            </el-upload>
            <el-form-item label="审核状态">
              <el-radio-group v-model="form.checked">
                <el-radio label="审核通过">审核通过</el-radio>
                <el-radio label="待审核">待审核</el-radio>
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
        <!-- 编辑 -->
        <el-table
          ref="table"
          v-loading="crud.loading"
          :data="crud.data"
          style="width: 100%"
          @selection-change="crud.selectionChangeHandler"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            v-if="columns.visible('regionAreaName')"
            :show-overflow-tooltip="true"
            width="125"
            prop="regionAreaName"
            label="所属地区"
          />
          <el-table-column
            v-if="columns.visible('relation')"
            :show-overflow-tooltip="true"
            prop="relation"
            label="身份"
          />
          <el-table-column
            v-if="columns.visible('homePlace')"
            :show-overflow-tooltip="true"
            prop="homePlace"
            label="居住地"
          />
          <el-table-column
            v-if="columns.visible('userName')"
            :show-overflow-tooltip="true"
            prop="userName"
            label="姓名"
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
            width="130"
            label="手机号"
          />
          <el-table-column
            v-if="columns.visible('workUnit')"
            :show-overflow-tooltip="true"
            width="125"
            prop="workUnit"
            label="工作单位"
          />
          <el-table-column
            v-if="columns.visible('workUnit')"
            width="130"
            prop="houseHold"
            label="户头情况"
          />
          <el-table-column
            v-if="columns.visible('vaccineNum')"
            :show-overflow-tooltip="true"
            prop="vaccineNum"
            label="疫苗次数"
          />
          <el-table-column
            v-if="columns.visible('scores')"
            :show-overflow-tooltip="true"
            prop="scores"
            label="积分"
          />
          <el-table-column
            v-if="columns.visible('checkTime')"
            width="150"
            prop="checkTime"
            label="核酸检测时间"
          />
          <el-table-column
            v-if="columns.visible('domicile')"
            :show-overflow-tooltip="true"
            prop="domicile"
            label="户籍地"
          />

          <el-table-column label="操作" width="125" align="center">
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
// 获取树形结构
import { tree } from "@/api/system/areaCode.js";
import crudUser from "@/api/tbUsers/tbUsers.js";
import { isvalidPhone } from "@/utils/validate";
import { getDepts } from "@/api/system/dept";
import { getAll, getLevel } from "@/api/system/role";
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
  title: "用户",
  url: "api/tbUsers",
  crudMethod: { ...crudUser },
  sort: "region_area_id,asc",
});
const defaultForm = {
  checkTime:null,
  areaId: null,
  canJi: "否",
  changZhu: "否",
  remark: "",
  teShuRenQun: "否",
  checked: "审核通过",
  cunLiangWei: "否",
  cunMinDaiBiao: "否",
  diBaoHu: "否",
  domicile: null,
  homePlace: null,
  idCard: null,
  liuDongDangYuan: "否",
  partyMember: "否",
  photoId: null,
  relation: null,
  roleName: null,
  sex: null,
  userName: "",
  vaccineNum: null,
  vaccineRemark: null,
  workUnit: null,
  zhanBeiRenYuan: "否",
  scores: null,
  mobile: null,
};
export default {
  name: "User",
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
      imageUrl: "",
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
        // nickName: [
        //   { required: true, message: "请输入用户昵称", trigger: "blur" },
        //   {
        //     min: 2,
        //     max: 20,
        //     message: "长度在 2 到 20 个字符",
        //     trigger: "blur",
        //   },
        // ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        roles: [{ required: true, message: "请选择角色", trigger: "blur" }],
        phone: [{ required: true, trigger: "blur", validator: validPhone }],
      },
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.photoId = res.link;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      this.getDepts();
      this.getRoles();
    },
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
      
        this.depts = res;
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
      getAll()
        .then((res) => {
          this.roles = res;
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

    // 获取权限级别
    getRoleLevel() {
      getLevel()
        .then((res) => {
          this.level = res.level;
        })
        .catch(() => {});
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
    checkboxT(row, rowIndex) {
      return row.id !== this.user.id;
    },
  },
};
</script>

<style scoped>
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
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
