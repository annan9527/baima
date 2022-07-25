<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="树状发送短信" name="first">
          <el-form ref="form" :model="form" style="width: 600px" label-width="120px">
            <el-form-item label="内容">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex" style="width: 178px" @change="getTree">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="疫苗次数">
              <el-radio-group v-model="form.vaccineNum" style="width: 178px" @change="getTree">
                <el-radio label="1">1</el-radio>
                <el-radio label="2">2</el-radio>
                <el-radio label="3">3</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄范围" >
              <el-input  v-model="form.ageStart" @change="getTree" style="width: 100px"></el-input>
              -<el-input  v-model="form.ageEnd" @change="getTree" style="width: 100px"></el-input>
            </el-form-item>
            <el-form-item label="发送人">
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps">
              </el-tree>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitFirst">发送</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>
        <el-tab-pane label="excel发送短信" name="second">
          <el-form ref="form" :model="form" style="width: 600px" label-width="120px">
            <el-form-item label="内容">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="excel">
              <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
                :http-request="onImport"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">发送短信
                </el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import {send} from "@/api/tools/sms";
import {smsTree} from "@/api/system/dept";
import {initData, upload} from "@/api/data";

export default {
  name: "send",
  data() {
    return {
      activeName: 'first',
      form: {
        sex: null,
        vaccineNum: null,
        content: ''
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      data: [],
      fileList: []
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    onImport(ctx){
      let form = new FormData();
      form.append("file", ctx.file);
      upload(form,this.form.content).then(res=>{
        console.log(res)
        if (res.code===200){
          this.$message({
            type: 'success',
            message: '发送成功!'
          });
        }
      }).catch(err=>{
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    beforeAvatarUpload(file) {
      const content = this.form.content === '';
      if (content) {
        this.$message.error('请先输入短信内容');
      }
      return !content;
    },
    submitUpload() {

      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    onSubmitFirst() {
      const node = this.$refs.tree.getCheckedNodes();
      const mobiles = []
      for (const nodeElement of node) {
        if (nodeElement.mobile) {
          mobiles.push(nodeElement.mobile)
        }
      }
      this.form.mobile = mobiles.join(',')
      send(this.form).then(res => {
        if (res.success) {
          this.$message({
            message: '发送成功',
            type: 'success'
          });
        }
      })
    },
    getTree() {
      initData('api/areaCode/sms/tree', this.form).then(res => {     
        this.data = res
      })
    }
  }
}
</script>

<style scoped>

</style>
