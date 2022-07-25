<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
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
          size="small"
          label-width="80px"
        >
          <el-form-item label="姓名">
            <el-input v-model="form.userName" style="width: 370px" />
          </el-form-item>
          <el-form-item label="工作">
            <el-input v-model="form.workType" style="width: 370px" />
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.mobile" style="width: 370px" />
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
          v-if="columns.visible('userName')"
          prop="userName"
          label="姓名"
        />
        <el-table-column
          v-if="columns.visible('workType')"
          prop="workType"
          label="职业"
        />
        <el-table-column
          v-if="columns.visible('mobile')"
          prop="mobile"
          label="联系方式"
        />
       
        <el-table-column
          v-permission="['admin', 'userWork:edit', 'userWork:del']"
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
import crudUserWork from "@/api/system/userWork.js";
import CRUD, { crud, form, header, presenter } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
import pagination from "@crud/Pagination";
import MaterialList from "@/components/material";

// crud交由presenter持有
const defaultCrud = CRUD({
  title: "邻里服务",
  url: "api/userWork",
  sort: "id,desc",
  crudMethod: { ...crudUserWork },
});
const defaultForm = {
  id: null,
  userName: null,
  workType: null,
  mobile: null,
  createTime: null,
};
export default {
  name: "UserWork",
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
      permission: {
        add: ["admin", "userWork:add"],
        edit: ["admin", "userWork:edit"],
        del: ["admin", "userWork:del"],
      },
    };
  },
  watch: {},
  methods: {
    // 获取数据前设置好接口地址
    [CRUD.HOOK.beforeRefresh]() {
      return true;
    }, // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {},
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
