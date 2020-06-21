<template>
	<el-pagination
		background
		layout="prev, pager, next"
		:total="total"
		:current-page="pagenum"
		:page-size="2"
		@current-change="pageClick"
	>
	</el-pagination>
</template>
<script>
export default {
	name: '',
	props: ['total', 'pagenum'],
	methods: {
		pageClick(e) {
			this.$emit('userPage', e);
		},
	},
};
</script>
<style lang="less" scoped></style>
