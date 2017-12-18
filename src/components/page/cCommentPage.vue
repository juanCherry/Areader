<template lang='html'>
	<div class="commend" :class="model">
		<mt-header title="评论" class="mt_header" style="font-size:20px">
			<div slot="left">
				<mt-button @click="back()" icon="back" style="font-size:16px">返回</mt-button>
			</div>
			<mt-button icon="more" slot="right"></mt-button>
		</mt-header>
		<div class="commentCount">
			<p>{{msg}}<span>{{result.length}}</span></p>
		</div>
		<div class="commentBox" v-show="result.length > 0" v-for="item in result">
			<div class="commentList" :id="model">
				<img :src="item.userphoto" alt="">
				<div class="contentList">
					<p class="userText">{{item.remarkpersonid}}</p>
					<p class="contentText">{{item.remarkcontent}}</p>
					<h5>{{createdAt}}</h5>
				</div>
				<a :id="item.remarkid" href="#" @click="deleteC(item.remarkid,item.remarkpersonid)">删除</a>
			</div>
		</div>
		<div v-if="result.length > 0" class="noMore">
			<p>已经到底了...</p>
		</div>
		<div v-else class="nullShow">
			<p>空空如也~</p>
		</div>
		<div class="userCom">
			<input v-model="input2" type="text" name="" value="" placeholder="添加评论">
			<div class="mui-btn mui-btn-primary" @click="sendBtn()">发送</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	// 引入 mint－ui的Indicator模块
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';

	export default {
		data() {
			return {
				articleid: this.$route.params.id,
				msg: "相关评论 ",
				num: 1,
				result: {},
				bol: true,
				input2: "",
				createdAt: ''
			}
		},
		methods: {
			back() {
				history.back();
			},
			// 点击获取到点击的这条评论的id
			deleteC(id, personId) {
				//console.log(personId);
				// 如果评论人的id和用户的id相同的时候，就可以删除评论
				if(localMessage.get('userid') == personId) {
					MessageBox.confirm('你确定删除这条评论吗?').then(action => {
						this.axios.get('http://txspring.cn:8010/deleteRemarkByPersonId?remarkid=' + id + '&remarkpersonid=' + localMessage.get('userid')).then(datas => {
							Toast({
								message: '删除成功',
								position: 'bottom'
								// iconClass: 'icon icon-wangyanruyes'
							});
							setTimeout(function() {
								window.location.reload();
							}, 800)
							this.$router.push('/cCommentPage/' + this.articleid);
						})
					});
				} else {
					Toast({
						message: '你不能删除这条评论',
						position: 'center',
						duration: 5000
					});
				}
			},
			sendBtn() {
				// 请求增加评论的接口  对接口使用qs模块进行字符串转换
				this.axios.post('http://txspring.cn:8010/addRemark', this.qs.stringify({
					remarkcontent: this.input2,
					remarkpersonid: localMessage.get('userid'),
					remarkarticleid: this.articleid
				})).then(data => {
					//  console.log(data.data.type);

					Indicator.close();

					if(data.data.type == '1') {
						Toast({
							message: '评论成功',
							position: 'bottom',
							duration: 5000
						});
					} else {
						Toast({
							message: '评论失败',
							position: 'bottom',
							duration: 5000
						});
					}
				});
				this.input2 = '';
				// 评论成功后刷新页面
				setTimeout(function() {
					window.location.reload();
				}, 800);
				this.$router.push('/cCommentPage/' + this.articleid);
			}
		},
				computed :{
			model() {
       			return this.$store.getters.changeModel
     		 }
		},
		created() {
			// 实例创建完成后，未请求到数据前显示[加载成功]
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});

			// 请求所有的评论
			this.axios.get("http://txspring.cn:8010/getAllRemark?remarkarticleid=" + "'" + this.articleid + "'").then(dataid => {
				this.result = dataid.data;
				// 通过for循环对请求到的时间戳进行格式转换
				for(var i = 0; i < this.result.length; i++) {
					var date = new Date(this.result[i].createdAt);
					this.createdAt = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
					console.log(this.createdAt);
				}
				// 请求成功后 [加载成功]自动关闭
				Indicator.close();
			});
		},
		computed: {
			model() {

				return this.$store.getters.changeModel
			}
		}
	}
</script>

<style lang='css' scoped>
	.mt_header {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
	}
	
	.commentCount {
		display: flex;
		height: 0.5rem;
		margin-top: 0.7rem;
	}
	
	.commentCount>p {
		margin-left: 0.15rem;
	}
	
	.commentCount span {
		color: gray;
		line-height: 0.5rem;
		padding-left: 0.1rem;
	}
	
	.commentBox {
		/*margin-top : 0.5rem;*/
	}
	
	.commentList {
		background: #fff;
		margin-bottom: 0.15rem;
		display: flex;
		justify-content: space-around;
	}
	
	.commentList>img {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		margin-top: 0.1rem;
		/*margin-left : 0.2rem;*/
	}
	
	.commentList>a {
		display: block;
		height: 0.6rem;
		font-size: 0.25rem;
		padding-top: 0.2rem;
		margin-right: 0.2rem;
	}
	
	.contentList {
		width: 4rem;
	}
	
	.contentList>p {
		margin-top: 0.1rem;
	}
	
	.contentList>h5 {
		margin-bottom: 0.3rem;
	}
	
	.userText {
		font-size: 0.25rem;
	}
	
	.contentText {
		padding-top: 0.2rem;
		font-size: 0.3rem;
		color: #000;
	}
	
	.userCom {
		width: 100%;
		background: #fff;
		box-shadow: 1px 1px 5px lightgray;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 200;
		display: flex;
		justify-content: center;
	}
	
	.userCom>input {
		border: none;
		width: 4.75rem;
		margin-top: 0.25rem;
		font-size: 14px;
		border-bottom: 1px solid lightgray;
	}
	
	.mui-btn {
		line-height: 0.43rem;
		height: 0.65rem;
		margin-top: 0.25rem;
		margin-left: 0.15rem;
	}
	
	.noMore,
	.nullShow {
		margin-top: 0.3rem;
		text-align: center;
		margin-bottom: 1.5rem;
	}
	
	#morning {
		color:#c7c7c7;
		background-color: #fff;
	}
	
	div#night {
		color: #c7c7c7;
		background-color: #4b4b4b;
	}
	
	div#night .contentText {
		color: #C7C7C7;
	}
	div#night .userCom>input{
		color:#c7c7c7;
	}
</style>