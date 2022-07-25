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
          <el-form-item label="网格名">
            <el-input v-model="form.girdName" style="width: 370px" />
          </el-form-item>
          <el-form-item label="网格长">
            <el-select
              v-model="form.leaderId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入网格长姓名"
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
          <el-form-item label="专职网格员">
            <el-select
              v-model="form.girdMemberId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入网格员姓名"
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
          <el-form-item label="兼职网格员">
            <el-select
              v-model="form.girdMemberPartId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入兼职网格员姓名"
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
          <el-form-item label="网格指导员">
            <el-select
              v-model="form.instructorId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入网格指导员姓名"
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
          v-if="columns.visible('girdName')"
          prop="girdName"
          label="网格名"
        />
        <el-table-column
          v-if="columns.visible('leaderId')"
          prop="leaderName"
          label="网格长"
        />
        <el-table-column
          v-if="columns.visible('instructorId')"
          prop="instructorName"
          label="网格指导员"
        />
        <el-table-column
          v-if="columns.visible('girdMemberId')"
          prop="girdMemberName"
          label="专职网格员"
        />
        <el-table-column
          v-if="columns.visible('girdMemberPartId')"
          prop="girdMemberPartName"
          label="兼职网格员"
        />
        <el-table-column
          v-permission="['admin', 'gird:edit', 'gird:del']"
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
import { check } from "@/api/tbUsers/tbUsers.js";
import Treeselect from "@riophae/vue-treeselect";
import CRUD, { crud, form, header, presenter } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
import pagination from "@crud/Pagination";
import MaterialList from "@/components/material";
import crudGird from "@/api/tools/gird.js";

// crud交由presenter持有
const defaultCrud = CRUD({
  title: "网格管理",
  url: "api/gird",
  sort: "id,desc",
  crudMethod: { ...crudGird },
});
const defaultForm = {
  id: null,
  girdName: null,
  leaderId: null,
  girdMemberId: null,
  girdMemberPartId: null,
  instructorId: null,
};
export default {
  name: "Gird",
  components: {
    Treeselect,
    pagination,
    crudOperation,
    rrOperation,
    udOperation,
    MaterialList,
  },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  data() {
    return {
      list: [],
      loading: false,
      permission: {
        add: ["admin", "gird:add"],
        edit: ["admin", "gird:edit"],
        del: ["admin", "gird:del"],
      },
      rules: {},
      queryTypeOptions: [
        {
          key: "girdName",
          display_name: "网格名",
        },
      ],
      smartGirdlist: [],
    };
  },
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
      const query = this.query;
      if (query.type && query.value) {
        this.crud.params[query.type] = query.value;
      } else {
        delete this.crud.params.girdName;
      }
      return true;
    }, // 新增与编辑前做的操作
    [CRUD.HOOK.beforeSubmit](crud, form) {},
    [CRUD.HOOK.beforeToEdit](crud, form) {
      let arr = [];

      for (let item in form) {
        if (item === "leaderName") {
          let o = { value: form.leaderId, label: form[item] };
          arr.push(o);
        }
        if (item === "girdMemberName") {
          let o = { value: form.girdMemberId, label: form[item] };
          arr.push(o);
        }
        if (item === "girdMemberPartName") {
          let o = { value: form.girdMemberPartId, label: form[item] };
          arr.push(o);
        }
        if (item === "instructorName") {
          let o = { value: form.instructorId, label: form[item] };
          arr.push(o);
        }
      }
      this.list = arr;
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
