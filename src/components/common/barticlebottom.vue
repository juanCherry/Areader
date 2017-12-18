<template>
	<div class="barticlebottom gray">
		<mt-tabbar>
			<mt-tab-item id="tab1">
				<i slot="icon" class="iconfont icon-zan1 gray" @click.prevent="upvote($event,article.detailpageid)" ref="upvote1"></i>
				<span class="goodcount gray" ref="upvote2">点赞{{(article.detailpagegood>999)?'999+':article.detailpagegood}}</span>
			</mt-tab-item>
			<mt-tab-item id="tab2">
				<i slot="icon" class="iconfont icon-yuedu gray"></i>
				<span class="gray">
					阅读{{(article.detailpagecount>999)?'999+':article.detailpagecount}}
				</span>
			</mt-tab-item>
			<mt-tab-item id="tab3">
				<i slot="icon" class="iconfont icon-shoucang storeup gray " @click.prevent="storeup($event,article.detailpageid)" ref="storebt1"></i>
				<span class="storeup gray" ref="storebt2">收藏</span>
			</mt-tab-item>
			<mt-tab-item id="tab4">
				<i slot="icon" class="iconfont icon-pinglun gray" @click="tocommentView(article.detailpageid)"></i>
				<span class="gray">评论</span>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	export default {
		name: 'barticlebottom',
		props: ['article'],
		data() {
			return {
				storeshow: false
			}
		},
		methods: {
			//点赞方法
			upvote(ev, num) {
				var _this = this;
				//进入文章只能给文章点赞一次，除非再次进入文章
				if(this.$refs.upvote1.style.color == 'rgb(0, 122, 255)') {
					console.log('已经点过赞了');
				} else {
					this.axios.get('http://txspring.cn:8010/addDetailGood?detailid=' + num)
						.then(function(response) {
							if(response.data != '1') {
								console.log('请求失败,请联系管理员');
							} else {
								console.log('请求成功');
								_this.$refs.upvote1.style.color = "#007AFF";
								_this.$refs.upvote2.style.color = "#007AFF";
								var goodcount = document.querySelector('.goodcount');
								goodcount.innerText = '点赞' + (parseInt(goodcount.innerText.slice(2)) + 1);
							}
						}).catch(function(error) {
							console.log('错误联系管理员');
							console.log(error);
						});
				}

			},
			//收藏方法
			storeup(ev, num) {
				var _this = this;
				var getuserid = localMessage.get('userid');
				this.axios.get('http://txspring.cn:8010/selectedUidAic?userid=' + getuserid + '&articalid=' + _this.article.detailpageid)
					.then(function(response) {
						if(response.data.type == '1') {
							_this.storeshow = true;
							_this.$refs.storebt1.style.color = '#007AFF';
							_this.$refs.storebt2.style.color = '#007AFF';
							Toast({
								message: '该文章已经收藏过了！',
								position: 'center',
								duration: 1000
							});
						} else {
							_this.storeshow = false;
							_this.axios.post('http://txspring.cn:8010/addCollectByAll', _this.qs.stringify({
								userid: getuserid,
								detailid: num,
							})).then(function(response) {
								//						console.log(response);
								if(response.data.type != '1') {
									Toast({
										message: '收藏失败请联系管理员！',
										position: 'center',
										duration: 1000
									});

								} else {
									Toast({
										message: '收藏成功！',
										position: 'center',
										duration: 1000
									});
									_this.$refs.storebt1.style.color = '#007AFF';
									_this.$refs.storebt2.style.color = '#007AFF';
								}
							}).catch(function(error) {
								console.log(error);
							})

						}
					}).catch(function(error) {
						console.log(error);
					})

			},
			//去评论页面
			tocommentView(num){
				this.$router.push('/cCommentPage/'+num);
			}
		},
		updated() {
			//进入文章时先判断文章是否被收藏了，如果已经收藏就把颜色变成蓝色
			var _this = this;
			var userid = localMessage.get('userid');
			_this.axios.get('http://txspring.cn:8010/selectedUidAic?userid=' + userid + '&articalid=' + _this.article.detailpageid)
				.then(function(response) {
					if(response.data.type == '1') {
						_this.storeshow = true;
						_this.$refs.storebt1.style.color = '#007AFF';
						_this.$refs.storebt2.style.color = '#007AFF';
					} else {
						_this.storeshow = false;
					}
				}).catch(function(error) {

					console.log(error);
				})

		},

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.iconfont {
		font-size: 24px !important;
	}
	
	.gray {
		color: #999999;
	}
	
	.red {
		color: #007AFF;
	}
</style>

