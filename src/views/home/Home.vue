<template>
	<el-container>
		<el-header>
			<el-header>
				<el-row>
					<el-col :span="8" :offset="8"><h1>管理中心</h1></el-col>
					<el-col :span="8"><span class="out" @click="outClick">退出登录</span></el-col>
				</el-row>
			</el-header>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<!-- 菜单 -->
				<el-menu :menuData="menuData" />
			</el-aside>
			<el-main>
				<!-- 嵌套路由 -->
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
//网络请求
import { getMenu } from '@/network/home';
//相关组件
import elMenu from './pages/Elmenu';
export default {
	components: {
		elMenu,
	},
	data() {
		return {
			menuData: {},
		};
	},
	created() {
		this.loadMenu();
	},
	methods: {
		async loadMenu() {
			let res = await getMenu();
			this.menuData = res.data.data;
		},
		outClick() {
			localStorage.removeItem('token');
			this.$router.push('/login');
		},
	},
};
</script>
<style lang="less" scoped>
.el-container {
	height: 100%;
	.el-header {
		background: #b3c1cd;
		padding: 0;
		.el-col {
			h1 {
				line-height: 60px;
				text-align: center;
				color: #fff;
			}
			span {
				cursor: pointer;
				float: right;
				line-height: 60px;
				color: #fff;
			}
			.out {
				margin-right: 20px;
			}
		}
	}
	.el-aside {
		background: #545c64;
	}
	.el-main {
		background: #eaeef1;
	}
}
</style>
