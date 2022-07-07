<template>
  <div>
    <Editor v-model="content" :init="init" :disabled="disabled"></Editor>
  </div>
</template>


<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/link"; //超链接插件
import "tinymce/plugins/code"; //代码块插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/advlist"; // 列表插件
import "tinymce/plugins/contextmenu"; //右键菜单插件
import "tinymce/plugins/colorpicker"; //选择颜色插件
import "tinymce/plugins/textcolor"; //文本颜色插件
import "tinymce/plugins/fullscreen"; //全屏
import "tinymce/plugins/help";
import "tinymce/plugins/charmap";
import "tinymce/plugins/paste";
import "tinymce/plugins/print";
import "tinymce/plugins/preview";
import "tinymce/plugins/hr";
import "tinymce/plugins/anchor";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/autosave";
import "tinymce/plugins/fullpage";
import "tinymce/plugins/emoticons";
import 'tinymce/plugins/emoticons/js/emojis';
import "tinymce/plugins/toc";
import "tinymce/plugins/quickbars";

import 'tinymce/icons/default'
import MinClient from "@cjsz/minio-client";
import {imgSrcTurn} from "@cjsz/minio-client/dist/util";
export default {
  name:'tinymce-editor',
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 770
    },
    plugins: {
      type: [String, Array],
      default:
          " preview searchreplace autolink directionality visualblocks visualchars fullscreen print image link media template code codesample table charmap hr nonbreaking insertdatetime advlist lists textpattern autosave autoresize emoticons quickbars pagebreak toc anchor"
    },
    toolbar: {
      type: [String, Array],
      default:
          "code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link codesample | alignleft aligncenter alignright alignjustify outdent indent formatpainter | \
      styleselect formatselect fontselect fontsizeselect | numlist bullist  | blockquote subscript superscript removeformat | \
      emoticons table image media charmap hr pagebreak insertdatetime | fullscreen preview | print searchreplace toc anchor"
    }
  },
  data() {
    return {
      anim:'',
      //初始化配置
      init: {
        menubar: true, // 菜单栏显隐
        language_url: "/static/tiny/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/tiny/skins/ui/oxide",
        min_height: 450,
        max_height: 770,
        toolbar_mode: "sliding",
        plugins: this.plugins,
        toolbar: this.toolbar,
        content_style: "p {margin: 5px 0;}",
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        font_formats:
            "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
        branding: false,
        // file_picker_callback: function(callback, value, meta) {
        //   console.log('未配置')
        // },
        // 图片上传
        images_upload_handler: (blobInfo, success, failure) => {
          MinClient.bigFileUpload('szyun/image/', blobInfo.blob() ,(progress)=>{
          }).then((fileUrl) => {
            if (fileUrl) {
              success(imgSrcTurn(fileUrl))
            }else{
              failure('上传出错')
            }
          }).catch(()=>{
            failure('上传出错')
          });
        }
      },
      content: this.value
    };
  },
  mounted() {
    tinymce.init({
      plugins: 'lists',
      toolbar: 'numlist bullist'
    });
  },
  methods: {

  },
  watch: {
    value(newValue) {
      this.content = newValue;
    },
    content(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>
<style scoped lang="scss">

</style>
