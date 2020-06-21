<template>
	<el-dialog title="分配权限" @open="openControl" @close="outControl" :visible.sync="controlVisible">
		<el-tree
			:data="rights"
			show-checkbox
			node-key="id"
			:default-expanded-keys="[2, 3]"
			:default-checked-keys="[5]"
			:props="defaultProps"
			ref="tree"
		>
		</el-tree>
		<div slot="footer" class="dialog-footer">
			<el-button @click="controlVisible = false">取 消</el-button>
			<el-button type="primary" @click="ControlClick">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
export default {
	props: ['rights', 'keys', 'showControl'],
	data() {
		return {
			controlVisible: false,
			defaultProps: {
				children: 'children',
				label: 'authName',
			},
		};
	},
	methods: {
		ControlClick() {
			let keys1 = this.$refs.tree.getHalfCheckedKeys();
			let keys2 = this.$refs.tree.getCheckedKeys();
			let keys = [...keys1, ...keys2];
			this.$emit('controlClick', keys);
		},
		openControl() {
			this.$nextTick(() => {
				this.$refs.tree.setCheckedKeys(this.keys);
			});
		},
		outControl() {
			this.$emit('outControl');
		},
	},
	watch: {
		showControl(news) {
			this.controlVisible = news;
		},
	},
};
</script>
<style lang="less" scoped></style>
