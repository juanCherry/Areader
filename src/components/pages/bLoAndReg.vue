<template lang="html">

	<div class="bLoAndReg">
		<!--登录界面和注册界面之间切换的动画效果，-->
		<!--在VUE2.0里需要用transition包裹需要进行动画过渡效果的所有部分，并且去个名字，这里的name可以随便取，不过最好以你要弄得动画效果为名字-->
		<transition name="fade">
			<!--在外层包裹一个v-if或者v-show，方便动画效果结束后隐藏或者显示该便签-->
			<div class="login" v-if="show" >
				<blogin></blogin>
				<div class="blogintext">登录遇到问题请联系管理员，或者<span id="toReg" class="toView" @click="toView($event)">还没有账户？</span></div>
			</div>
		</transition>
		<div class="register">
			<bregister></bregister>
			<div class="blogintext"><span class="toView" id="toLog" @click="toView($event)">已经有账户了，请登录！</span></div>
		</div>
	</div>

</template>

<script>
	import blogin from '../common/bLogin'
	import bregister from '../common/bregister'
	export default {
		name: 'app',
		data() {
			return {
				show: true,
			}
		},
		components: {
			blogin,
			bregister,
		},
		methods: {
			toView(ev) {
				this.show = !this.show;

			}
		}
	}
</script>

<style lang="css">
	/*此处是VUE2.0需要给动画效果设置的CSS，在transition标签中的name在此处要卸载-enter-active的前面，这里的CSS选择器的类名有规定，记住照着一下格式防着写*/
	.fade-enter-active,
	.fade-leave-active {
		transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
	/*分割线*/
	.bLoAndReg {
		width: 100%;
	}
	
	.login {
		position: fixed;
		z-index: 10;
		background-color: #fcfcfc;
		height: 100%;
		width: 100%;
	}
	
	.register {
		position: fixed;
		background-color: #C6E2FF;
		height: 100%;
		width: 100%;
	}
	
	.blogintext {
		position: relative;
		bottom: 0;
		width: 100%;
		text-align: center;
		font-size: .2rem;
		color: silver;
		margin: .5rem auto;
	}
	
	.toView {
		font-size: .2rem;
		color: red;
	}
	/*因为input的UI样式两个UI组件库发生冲突，在此重新设置UI样式*/
	/*解决两个组件的CSS样式 冲突方法有两种：*/
	/*1、!importan提高他的优先级*/
	/*2、不把两个UI组件库设成全局，而是在各自需要使用的地方单独引入，并且在style标签里写上属性scoped表示这个样式只在这个组件里生效*/
	.mint-field-core{
		border: 0 !important;
		margin: 0 !important;
	}
	.bIsInlineBlock{
		vertical-align: middle;
	}
	.bInputBar{
		line-height: 1.6rem;
	}
</style>