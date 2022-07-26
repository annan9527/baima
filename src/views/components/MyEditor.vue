<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="handleChange"
    />
  </div>
</template>
<script>
import { baseUrl } from "@/store/modules/api.js";
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      baseUrl: baseUrl,
      editor: null,
      html: null,
      toolbarConfig: {}, //工具栏配置
      editorConfig: {
        placeholder: "请输入内容",
        // 配置图片
        MENU_CONF: {
          // 配置上传图片
          uploadImage: {
            customUpload: this.update,
          },
        },
      },
      mode: "default", // or 'simple'  //模式
    };
  },
  methods: {
    changehtml(val) {
      if (val) {
        this.html = val;
      } else {
         this.html = "<p><br></p>"; 
      }
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    // 上传图片
    update(file, insertFn) {
      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();
      let url = "";
      data.append("file", file); //file为上传文件返回的所有file
      var config = {
        method: "post",
        url: "/api/upload", //上传图片的地址
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      axios(config)
        .then(function (res) {
          console.log(res.data.link);
          url = res.data.link;
          insertFn(url, "使用说明", url); //插入图片（使用的wangEditor插件）
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleChange() {
      this.$emit("changes", this.html);
    },
  },

  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
   
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script> -->
<style src="@wangeditor/editor/dist/css/style.css"></style>