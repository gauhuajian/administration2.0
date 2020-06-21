<template>
	<el-menu
		:default-active="$route.path"
		class="el-menu-vertical-demo"
		background-color="#545c64"
		text-color="#fff"
		active-text-color="#ffd04b"
		:router="true"
	>
		<el-submenu :index="'' + item.id" v-for="item in menuData" :key="item.id">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span>{{ item.authName }}</span>
			</template>
			<el-menu-item v-for="item2 in item.children" :key="item2.id" :index="'/' + item2.path">{{
				item2.authName
			}}</el-menu-item>
		</el-submenu>
	</el-menu>
</template>
<script>
export default {
	props: ['menuData'],
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
	},
};
</script>
