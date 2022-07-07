import tinymceEditor from './src/app.vue'
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('tinymce-editor', tinymceEditor)
}
tinymceEditor.install = function(Vue){
  Vue.component(tinymceEditor.name, tinymceEditor)
}

export {
    tinymceEditor
}
