<template>
	<div class="footerbottom" @touchstart="changeFn($event)">
		<mt-tabbar>
			<mt-tab-item id="tab1">
				<div id="tohome" @click="toView($event)" :class="{ 'menu-item active' : tabb[0], 'menu-item': !tabb[0]}">
					<i slot="icon" class="iconfont icon-shouye-xianxing"></i>
					<div>首页</div>
					<!-- <router-link to="/home" ref="home">-->
					<!--</router-link>-->
				</div>

				<!--ref="home" id="routerHome"-->
			</mt-tab-item>
			<mt-tab-item id="tab2">

				<div id="tocategory" @click="toView($event)" :class="{ 'menu-item active' : tabb[1], 'menu-item': !tabb[1]}">
					<i slot="icon" class="iconfont icon-leimupinleifenleileibie"></i>
					<div>分类</div>
					<!--  <router-link to="/category">-->
					<!--</router-link>-->
				</div>
			</mt-tab-item>
			<mt-tab-item id="tab3">
				<div id="toshop" @click="toView($event)" :class="{ 'menu-item active' : tabb[2], 'menu-item': !tabb[2]}">
					<i slot="icon" class="iconfont icon-shangpin-xianxing"></i>
					<div>市场</div>
					<!--<router-link to="/shop">-->
					<!--</router-link>-->
				</div>
			</mt-tab-item>
			<mt-tab-item id="tab4">
				<div id="tomine" @click="toView($event)" :class="{ 'menu-item active' : tabb[3], 'menu-item': !tabb[3]}">
					<i slot="icon" class="iconfont icon-wode"></i>
					<div>我的</div>
					<!--<router-link to="/mine">-->
					<!--</router-link>-->
				</div>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	import { Tabbar, TabItem } from 'mint-ui';
	export default {
		name: 'footerbottom',
		data() {
			return {
				tabb: [true, false, false, false],
				//               tabb1:false,
				//               tabb2:true,
				//               tabb3:false,
				//               tabb4:false
			}
		},
		methods: {
			toView(ev) {
				switch(ev.currentTarget.id) {
					case 'tohome':

//						setTimeout(function() {
//							var menuitemArr = document.querySelectorAll('.menu-item');
//							for(var item of menuitemArr) {
//								console.log(item.children)
//								for(var citem of item.children) {
//									citem.style.color = "#999";
//								}
//							}
//							var tohomediv = document.querySelector('#tohome');
//							for(var item of tohomediv.children) {
//								item.style.color = "#007aff";
//							}
//						setTimeout(function() {
//							var menuitemArr = document.querySelectorAll('.menu-item');
//							for(var item of menuitemArr) {
//								console.log(item.children)
//								for(var citem of item.children) {
//									citem.style.color = "#999";
//								}
//							}
//							var tohomediv = document.querySelector('#tohome');
//							for(var item of tohomediv.children) {
//								item.style.color = "#007aff";
//							}
//						}, 200)
						localMessage.set('activeview', '0');
						this.$router.push('/home');

						break;
					case 'tocategory':

//						setTimeout(function() {
//							var menuitemArr = document.querySelectorAll('.menu-item');
//							for(var item of menuitemArr) {
//								for(var citem of item.children) {
//									citem.style.color = "#999";
//								}
//							}
//							var tohomediv = document.querySelector('#tocategory');
//							for(var item of tohomediv.children) {
//								item.style.color = "#007aff";
//							}
//						setTimeout(function() {
//							var menuitemArr = document.querySelectorAll('.menu-item');
//							for(var item of menuitemArr) {
//								for(var citem of item.children) {
//									citem.style.color = "#999";
//								}
//							}
//							var tohomediv = document.querySelector('#tocategory');
//							for(var item of tohomediv.children) {
//								item.style.color = "#007aff";
//							}
//						}, 200)
						localMessage.set('activeview', '1');
						this.$router.push('/category');
						break;
					case 'toshop':

//						setTimeout(function() {
//							var menuitemArr = document.querySelectorAll('.menu-item');
//							for(var item of menuitemArr) {
//								console.log(item.children)
//								for(var citem of item.children) {
//									citem.style.color = "#999";
//								}
//							}
//							var tohomediv = document.querySelector('#toshop');
//							for(var item of tohomediv.children) {
//								item.style.color = "#007aff";
//							}
//						setTimeout(function() {
//							var menuitemArr = document.querySelectorAll('.menu-item');
//							for(var item of menuitemArr) {
//								console.log(item.children)
//								for(var citem of item.children) {
//									citem.style.color = "#999";
//								}
//							}
//							var tohomediv = document.querySelector('#toshop');
//							for(var item of tohomediv.children) {
//								item.style.color = "#007aff";
//							}
//						}, 200)
localMessage.set('activeview', '2');
						this.$router.push('/shop');
						break;
					case 'tomine':

//						setTimeout(function() {
//							var menuitemArr = document.querySelectorAll('.menu-item');
//							for(var item of menuitemArr) {
//								console.log(item.children)
//								for(var citem of item.children) {
//									citem.style.color = "#999";
//								}
//							}
//							var tohomediv = document.querySelector('#tomine');
//							for(var item of tohomediv.children) {
//								item.style.color = "#007aff";
//							}
//						setTimeout(function() {
//							var menuitemArr = document.querySelectorAll('.menu-item');
//							for(var item of menuitemArr) {
//								console.log(item.children)
//								for(var citem of item.children) {
//									citem.style.color = "#999";
//								}
//							}
//							var tohomediv = document.querySelector('#tomine');
//							for(var item of tohomediv.children) {
//								item.style.color = "#007aff";
//							}
//						}, 200)
localMessage.set('activeview', '3');
						this.$router.push('/mine');
						break;
					default:
						break;
				}

			},
			changeFn(ev) {
				//  		var _this = ev.currentTarget;
				//  		//找到当前点击元素的父标签，（包裹a元素和i元素）
				//  		var divTag = ev.target.parentNode.parentNode;
				//  		var iTag = divTag.querySelector('i');
				//  		var aTag = ev.target.parentNode.parentNode.querySelector('a');
				//			//所有icon图标在被激活前为灰色
				//  		var iList = _this.querySelectorAll('i');
				//  		for(var i = 0; i < iList.length; i++){
				//  			iList[i].style.color = '#999';
				//  		}
				//  		//同理 包裹路由的a标签也为灰色状态
				//  		var list = divTag.parentNode.querySelectorAll('a');
				//  		for(var j = 0;j < list.length;j++){
				//  			list[j].style.color = '#999';
				//  		}
				//  		iTag.style.color = '#007aff';
				//  		aTag.style.color = '#007aff';
			}
		},
		created() {
//			console.log(this.tabb);
//			console.log(localMessage.get('activeview'));
			for (var i in this.tabb) {
				this.tabb[i]=false;
			}
			var i = parseInt(localMessage.get('activeview'));
			this.tabb[i]=true;
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mint-tabbar {
		position: fixed;
		bottom: 0;
	}
	
	.iconfont {
		font-size: 24px !important;
	}
	
	.footerbottom a {
		text-decoration: none;
	}
	
	.iconfont {
		font-size: 24px !important;
	}
	
	.mint-tab-item {
		padding: 4px 0;
		color: #000;
	}
	
	.footerbottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 99;
	}
	
	.footerbottom a {
		text-decoration: none;
		color: #999;
	}
	
	.footerbottom .routerHomeI,
	.router-link-active {
		color: #007aff;
	}
	
	.active {
		color: #007aff;
	}
	
	.noactive {
		color: #999;
	}
</style>