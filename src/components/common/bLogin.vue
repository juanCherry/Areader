<template lang="html">
	<div class="bLoginWaper loginBar">
		<img src="../../../static/images/bclose.png" alt="" class="bexit">
		<!-- 关闭按钮 -->
		<!-- <bclose></bclose> -->
		<div class="blogo"></div>
		<!-- 登录的列表 -->
		<div class="bloginListWaper">
			<!-- logo -->

			<!-- 用户名 -->
			<div class="bInputbarWaper">
				<div class="bInputBar user">
					<i slot="icon" class="iconfont icon-wode bicenter"></i>
					<mt-field placeholder="请输入用户名" class="bIsInlineBlock" v-model="username" id="user"></mt-field>
				</div>
				<div class="bInputBar pass">
					<!--密码的 图-->
					<i slot="icon" class="iconfont icon-mima bicenter"></i>

					<mt-field placeholder="请输入密码" class="bIsInlineBlock" type="password" v-model="userpassword" id="password"></mt-field>
				</div>
			</div>
		</div>
		<!-- 登录按钮 -->
		<mt-button type="primary" class="bloginBtn" @click="bLogin()">登录</mt-button>
		<!-- 社交工具 -->
		<!-- 新用户注册 -->

	</div>
</template>

<script>
	//此处虽然已经全局引入mint-ui，但是部分的JS效果还是要单独引入，以下就是单独引入的部分JS效果
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				username: '',
				userpassword: '',
				//				show: true
			}
		},
		methods: {
			//登录事件
			bLogin() {

				Indicator.open({
					text: '登录中...',
					spinnerType: 'fading-circle'
				});
				var _this = this;
				//				console.log(this.username);
				//				console.log(this.userpassword);
				var user = this.username;
				var password = this.userpassword;
				//正则验证用户名和密码
				var userNameReg = /^[a-zA-Z0-9]{4,8}$/g;
				var userpasswordReg = /^[a-zA-Z0-9]{6,10}$/g;
				if(user == '' || password == '') {
					Toast({
						message: '用户名和密码不能为空',
						position: 'center',
						duration: 1000
					});
					this.username = '';
					this.userpassword = '';
				} else if(userNameReg.test(user)) {
					if(userpasswordReg.test(password)) {

						this.axios.post('http://txspring.cn:8010/getUser', this.qs.stringify({
								user: user,
								password: password
							}))
							.then(function(response) {
								if('type' in response.data) {

									Indicator.close();
									Toast({
										message: '登录失败，请检查用户名和密码是否输入正确！',
										position: 'center',
										duration: 2000
									});
								} else {
									//登录成功之后把数据存储在lacalStore里，方便取值，也可以方便验证用户是否已经登录过了
									localMessage.set('userid', response.data.userid);
									localMessage.set('userpassword', response.data.userpassword);
									localMessage.set('usercanuser', response.data.usercanuser);
									localMessage.set('usersex', response.data.usersex);
									localMessage.set('usershowme', response.data.usershowme);
									localMessage.set('userphoto', response.data.userphoto);
									localMessage.set('userphone', response.data.userphone);
									localMessage.set('activeview', '0');
									localMessage.set('logined', '1');

									//									console.log(_this.$router);
									_this.$router.push('/home');
									setTimeout(function() {
										Indicator.close();
										Toast({
											message: '成功登录CodeReader',
											position: 'center',
											duration: 2000
										});
									}, 800);
								}
								//								console.log(response.data.type);
							})
							.catch(function(error) {
								console.log(error);
							});
						this.username = '';
						this.userpassword = '';
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

		},
		created() {
			//因为用户在打开APP时，第一进入的页面以及显示的页面就是登录页面，所以在组件被创建时，先判断localStore里是否存在userid，如果存在直接跳入home界面中
			//此处之所以使用localStore是因为他的声明周期是只要不手动清楚就会一直存在
			//而sessionStrore只是当页面打开的时候，可以和页面之间共享数据，页面一旦关闭就不会存在
			//所以localStore更符合本团队APP的要求
			if((localMessage.get('userid') != null)) {
				this.$router.push('/home');
			}
		},
		mounted(){
        var loginInput=document.querySelector('.loginBar');

        var wh=window.innerHeight;
        //监听手机软键盘弹出事件，使输入框上移
        window.onresize=function(){
          var h=window.innerHeight;

          if(wh>h){
            loginInput.style.marginTop='-200px';
          }else{
            loginInput.style.marginTop='0px';
          }
        }

    }

	}
</script>

<style lang="css" >
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
		border-radius: 10%;
	}
	.bloginListWaper{
		margin-top: .1rem;
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

	.bloginBtn {
		display: block;
		width: 5rem;
		margin: 0 auto;
		margin-top: .5rem;
	}
</style>
