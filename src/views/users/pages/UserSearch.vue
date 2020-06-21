<template>
	<el-row>
		<el-col :span="8">
			<el-input v-model="quertText" placeholder="请输入要搜索用户"></el-input>
		</el-col>
		<el-col :span="2">
			<el-button @click="searchClick" icon="el-icon-search"></el-button>
		</el-col>
		<el-col :span="8">
			<el-button @click="showUser">添加用户</el-button>
		</el-col>
	</el-row>
</template>
<script>
export default {
	data() {
		return {
			quertText: '',
		};
	},
	methods: {
		showUser() {
			this.$emit('showUser');
		},
		searchClick() {
			this.$emit('searchClick', this.quertText);
		},
	},
};
</script>
<style lang="less" scoped></style>
