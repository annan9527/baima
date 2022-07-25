<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
        <el-row>
        <el-button type="success" @click="crud.toAdd">修改积分</el-button>
      </el-row>
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <!-- <crudOperation :permission="permission" /> -->
    
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
          <el-form-item label="用户">
            <el-select
              v-model="forms"
              filterable
              remote
              reserve-keyword
              placeholder="请输入用户姓名"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in list"
                :key="item.value"
                :label="item.label"
                :value="`${item.value}|${item.label}`"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.mobile
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="积分类型">
            <el-input
              style="width: 370px"
              placeholder="请输入积分类型"
              v-model="form.scoreType"
            ></el-input>
          </el-form-item>
          <el-form-item label="积分">
            <el-input
              style="width: 370px"
              placeholder="请输入积分"
              v-model.number="form.scores"
            ></el-input>
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
        <el-table-column
          v-if="columns.visible('userName')"
          prop="userName"
          label="用户名"
        />
        <!-- <el-table-column
          v-if="columns.visible('userName')"
          prop="userName"
          label="操作人姓名"
        /> -->
        <el-table-column
          v-if="columns.visible('scoreType')"
          prop="scoreType"
          label="类型：登录、提意见、答复"
        />
        <el-table-column
          v-if="columns.visible('scores')"
          prop="scores"
          label="积分"
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
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import { check } from "@/api/tbUsers/tbUsers.js";
import CRUD, { crud, form, header, presenter } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
import pagination from "@crud/Pagination";
import MaterialList from "@/components/material";
import crudScore from "@/api/system/score.js";
// crud交由presenter持有
const defaultCrud = CRUD({
  title: "积分管理",
  url: "api/score",
  sort: "id,desc",
  crudMethod: { ...crudScore },
});
const defaultForm = {
  id: null,
  userId: null,
  userName: null,
  scoreType: null,
  scores: null,
  createTime: null,
  states: null,
};
export default {
  name: "Integral",
  components: {
    pagination,
    crudOperation,
    rrOperation,
    udOperation,
    MaterialList,
  },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  data() {
    return {
      forms: "",
      list: [],
      loading: false,
      dialogFormVisible: false,
      rules: {
        id: [
          {
            required: true,
            message: "积分事件主键不能为空",
            trigger: "blur",
          },
        ],
        userId: [
          {
            required: true,
            message: "操作人主键不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
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
      this.list = [];
    },
    // 获取数据前设置好接口地址
    [CRUD.HOOK.beforeRefresh]() {
      return true;
    }, // 新增与编辑前做的操作
    [CRUD.HOOK.beforeSubmit](crud, form) {
      const arr = this.forms.split("|");
      this.form.userId = arr[0];
      this.form.userName = arr[1];
    },
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
  width: 32px;
  height: 32px;
  line-height: 32px;
}
</style>
