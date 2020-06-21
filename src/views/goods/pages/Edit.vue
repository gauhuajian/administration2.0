<template>
	<div>
		<quill-editor
			ref="myQuillEditor"
			v-model="queryText"
			:options="editorOption"
			@blur="onEditorBlur($event)"
			@focus="onEditorFocus($event)"
			@ready="onEditorReady($event)"
		/>
		<el-button type="primary " @click="addGoods">完成</el-button>
	</div>
</template>
<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';
export default {
	name: '',
	data() {
		return {
			queryText: '',
			editorOption: {},
		};
	},
	components: {
		quillEditor,
	},
	methods: {
		addGoods() {
			this.$emit('addGoods', this.queryText);
		},
		onEditorBlur(quill) {},
		onEditorFocus(quill) {},
		onEditorReady(quill) {},
		onEditorChange({ quill, html, text }) {
			this.content = html;
		},
	},
};
</script>
<style lang="less" scoped>
/deep/.ql-editor {
	min-height: 200px;
	background: #fff;
}
</style>
