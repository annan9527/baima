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
          :rules="rules"
          size="small"
          label-width="80px"
        >
          <el-form-item label="党员">
            <el-select
              v-model="form.userId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入党员姓名"
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
          <el-form-item label="联户名">
            <el-select
              multiple
              v-model="arr"
              filterable
              remote
              reserve-keyword
              placeholder="请输入联户人姓名"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in list"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.mobile
                }}</span>
              </el-option>
            </el-select>
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
          label="党员姓名"
        />
        <el-table-column
          v-if="columns.visible('areaNames')"
          prop="areaNames"
          label="联户名"
        />
        <el-table-column
          v-permission="['admin', 'partyMember:edit', 'partyMember:del']"
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
import { check } from "@/api/tbUsers/tbUsers.js";
import crudPartyMember from "@/api/system/partyMember.js";
import CRUD, { crud, form, header, presenter } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
import pagination from "@crud/Pagination";
import MaterialList from "@/components/material";

// crud交由presenter持有
const defaultCrud = CRUD({
  title: "党员联户",
  url: "api/partyMember",
  sort: "id,desc",
  crudMethod: { ...crudPartyMember },
});
const defaultForm = { id: null, userId: null, areaNames: null, userName: null };
export default {
  name: "PartyMember",
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
      loading: false,
      arr: [],
      list: [],
      permission: {
        add: ["admin", "partyMember:add"],
        edit: ["admin", "partyMember:edit"],
        del: ["admin", "partyMember:del"],
      },
      rules: {},
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
            console.log(res);
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
    // 获取数据前设置好接口地址
    [CRUD.HOOK.beforeRefresh]() {
      return true;
    }, // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      if (form.id) {
        let str = form.areaNames;
        this.arr = str.split("、");
      } else {
        this.arr = [];
      }

      console.log(form);
    },
    [CRUD.HOOK.beforeSubmit](crud, form) {
      this.form.areaNames = this.arr.join("、");
    },
    // 回显
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.list = [];
      this.list.push({
        value: form.userId,
        label: form.userName,
      });
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
