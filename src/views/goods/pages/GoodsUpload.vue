<template>
	<div>
		<el-upload
			action="http://localhost:8888/api/private/v1/upload"
			list-type="picture-card"
			:on-preview="handlePictureCardPreview"
			:on-remove="handleRemove"
			:headers="uploadHeader"
			:on-success="loadImages"
		>
			<i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="" />
		</el-dialog>
		<el-button @click="nextThree" type="primary">下一步</el-button>
		<el-button @click="back" type="primary">返回</el-button>
	</div>
</template>
<script>
export default {
	name: '',
	data() {
		return {
			uploadHeader: {
				Authorization: localStorage.token,
			},
			dialogImageUrl: '',
			dialogVisible: false,
			addGodsform: [],
		};
	},
	methods: {
		back() {
			this.$emit('back');
		},
		nextThree() {
			this.$emit('nextThree', this.addGodsform);
		},
		loadImages(res) {
			this.addGodsform.push({ pics: res.data.tmp_path });
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
	},
};
</script>
<style lang="less" scoped></style>
