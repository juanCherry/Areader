<template lang="html">
	<!--<transition name="fade">-->
	<!--v-if="show"-->
	<div class="bLoginWaper registerBar">
		<img src="../../../static/images/bclose.png" alt="" class="bexit" @click="bclose()">
		<!-- 关闭按钮 -->
		<!-- <bclose></bclose> -->
		<div class="blogo"></div>
		<!-- 登录的列表 -->
		<div class="bloginListWaper">
			<!-- logo -->

			<!-- <blogo><blogo> -->
			<!-- 用户名 -->
			<div class="bInputbarWaper">
				<div class="bInputBar">
					<i slot="icon" class="iconfont icon-wode bicenter"></i>
					<mt-field placeholder="请输入用户名" class="bIsInlineBlock" v-model="username"></mt-field>
				</div>
				<div class="bInputBar">
					<!--密码的 图-->
					<i slot="icon" class="iconfont icon-mima bicenter"></i>
					<mt-field placeholder="请输入密码" class="bIsInlineBlock" type="password" v-model="userpassword"></mt-field>
				</div>
			</div>
		</div>
		<!-- 登录按钮 -->
		<mt-button type="primary" class="bRegisterBtn" @click.prevent="bRegister()">注册</mt-button>
		<!-- 登录遇到问题请联系管理员 -->
		<!--<div class="blogintext"><span id="toLoginView" v-on:click="show = !show">已经有账户了，请登录！</span></div>-->
		<!-- 社交工具 -->
		<!-- 新用户注册 -->

	</div>
	<!--</transition>-->
</template>

<script>
	import { Toast } from 'mint-ui'
	//	import axios from 'axios'
	export default {
		data() {
			return {
				username: '',
				userpassword: '',
				//				show:true
			}
		},
		methods: {

			bclose() {
				console.log('关闭')
			},
			bRegister() {
				console.log(this.username);
				console.log(this.userpassword);
				var userNameReg = /^[a-zA-Z0-9]{4,8}$/g;
				var userpasswordReg = /^[a-zA-Z0-9]{6,10}$/g;
				if(this.username == '' || this.userpassword == '') {
					Toast({
						message: '用户名和密码不能为空',
						position: 'center',
						duration: 1000
					});
					this.username = '';
					this.userpassword = '';
				} else if(userNameReg.test(this.username)) {
					if(userpasswordReg.test(this.userpassword)) {
						this.axios.post('http://txspring.cn:8010/addUser', this.qs.stringify({
								user: this.username,
								password: this.userpassword
							}))
							.then(function(response) {
								if(response.data.type == "0") {
									Toast({
										message: '注册失败！用户已经存在',
										position: 'center',
										duration: 2000
									});
								} else {
									Toast({
										message: '恭喜你注册成功！赶紧登录吧！',
										position: 'center',
										duration: 2000
									});
								}
								console.log(response.data.type);
							})
							.catch(function(error) {
								Toast({
									message: '出现超级问题，请联系管理员',
									position: 'center',
									duration: 2000
								});
								console.log(error);
							});

						this.username = '';
						this.userpassword = '';
						//						console.log('注册成功');
					} else {
						Toast({
							message: '密码个数6-10,由字母和数字组成',
							position: 'center',
							duration: 1000
						});
						this.username = '';
						this.userpassword = '';
						console.log('密码不符合');
					}
				} else {
					Toast({
						message: '用户名个数4-8,由字母和数字组成',
						position: 'center',
						duration: 1000
					});
					this.username = '';
					this.userpassword = '';
					console.log('用户名不符合');
				}

			},
			//			toLoginView(){
			//
			//			}
		},
		watch: {
			username(newvalue, oldvalue) {
				//				console.log(newvalue);
				//				console.log(oldvalue);
			}
		},
    mounted(){
      var registerInput=document.querySelector('.registerBar');
      var wheight=window.innerHeight;
      //监听手机软键盘弹出事件，使输入框上移
      window.onresize=function(){
        var oheight=window.innerHeight;

        if(wheight>oheight){
          registerInput.style.marginTop='-200px';
        }else{
          registerInput.style.marginTop='0px';
        }
      }
    }

  }
</script>

<style lang="css">
	* {
		padding: 0;
		margin: 0;
	}
	/*最外层的waper*/

	.bLoginWaper {
		width: 100%;
		/*text-align: center;*/
	}
	/*退出按钮*/

	.bexit {
		width: 0.5rem;
		margin: 0.5rem;
		/*position: relative;

		left: 0;*/
	}
	/*登录的waper*/

	.bloginListWaper {
		width: 5rem;
		margin: 0 auto;
		margin-top: .5rem;
		text-align: center;
		background-color: #ffffff;
	}
	/*logo*/

	.blogo {
		background: url(http://oz033lzfm.bkt.clouddn.com/bCDlogo.jpg) no-repeat center;
		background-size: 1.5rem 1.5rem;
		width: 1.5rem;
		height: 1.5rem;
		margin: 0 auto;
	}
	/*一个input标签*/

	.bicenter {
		vertical-align: middle;
	}

	.bIsInlineBlock {
		display: inline-block;
		background-image: none;
	}

	.mint-cell {
		min-height: 0 !important;
	}

	.mint-field,
	.mint-cell-wrapper {
		background-image: none!important;
		line-height: .5rem !important;
	}

	.mint-cell-value {
		width: 3.1rem;
	}

	.bRegisterBtn {
		display: block;
		width: 5rem;
		margin: 0 auto;
		margin-top: .5rem;
	}
	/*.blogintext {

		width: 5rem;

		text-align: center;

		font-size: .2rem;

		color: silver;

		margin: .5rem auto;

	}



	#toLoginView {

		font-size: .2rem;

		color: red;

	}*/
</style>
