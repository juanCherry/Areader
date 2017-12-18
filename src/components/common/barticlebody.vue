<template lang="html">
	<div class="barticlebody" :class="model">
		<div class="articletitle">{{article.detailpagetitle}}
		</div>
		<div class="colorsilver">
			<!--分割线-->
		</div>
		<div class="authorWaper">
			<div class="authorHeaPho"><img :src="author.userphoto"/></div>
			<div class="authorOther">
				<p class="authorName">{{author.userid}}</p>
				<p class="authorMsg">{{author.usershowme}}</p>
			</div>
		</div>
		<!-- v-html="article.detailpagecontent"-->
		<!--之所以使用v-html是因为从富文本存储入数据库的文章数据是带html语言的文本样式，如果想让这些文本按照原本存储的格式排版，就可以通过v-html来展示数据，因为存储的的时候是按照html格式存储，所以在这里用html展示就可以保持原有样式-->
		<div class="articlecontent" v-html="article.detailpagecontent">
		</div>
		 <div class="articletime">
				<p>{{createtime}}</p>
				<p>著作权归属作者所有</p>
			</div>
		<div class="bottomnbsp"></div>
		<div class="scolltotopwaper" v-if="scolltopshow">
			<i slot="icon" class="iconfont icon-dingbu scolltotop" @click.prevent="toTop()"></i>
		</div>

	</div>
</template>

<script>
	export default{
		name:"barticlebody",
		props:['article','createtime','author'],
		data(){
			return {
				scolltopshow:false,
			}
		},
		methods:{
			//返回文章顶部
			toTop() {
				$('html,body').animate({
					scrollTop: 0
				}, 'fast');
			},
			//当页面滚动超过150时，才显示出返回顶部的按钮
			showtop(){
				var scrolltop =window.pageYOffset || document.documentElement.scrollTop;
				if (scrolltop > 150) {
					this.scolltopshow = true;
					console.log(this.scolltopshow);
				} else{
					this.scolltopshow = false;
				}
			}
		},
		created(){
			window.addEventListener('scroll',this.showtop);
		},
		computed :{
			model() {
       			return this.$store.getters.changeModel
     		 }
		}
	}
</script>

<style lang="css" scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.barticlebody {
		width: 100%;
		height: 100%;
		font-size: .3rem;
		color: #444444;
	}

	.articletitle {
		width: 100%;
		font-size: .3rem;
		padding: .3rem .5rem;
		text-align: center;
		box-sizing: border-box;
		word-wrap: break-word;
	}
	/*背景灰色的div*/

	.colorsilver {
		width: 100%;
		height: 0.1rem;
		background-color: #ebebeb;
	}
	/*作者内容显示*/

	.authorWaper {
		border-bottom: 1px solid #ebebeb;
		width: 100%;
		overflow: hidden;
	}

	.authorWaper>div {
		display: inline-block;
		box-sizing: border-box;
	}

	.authorHeaPho {
		width: 15%;
		/*border: 1px solid red;*/
		height: 1rem;
		width: 1rem;
		text-align: center;
		margin: .1rem;
		line-height: 1rem;
		vertical-align: middle;
		border-radius: 50%;
	}
	.authorHeaPho img{
		width: 100%;
		height: 1rem;
		border-radius: 50%;

	}

	.authorOther {
		width: 75%;
		/*border: 1px solid red;*/
		margin: .1rem;
		line-height: .5rem;
		vertical-align: middle;
		/*overflow: hidden;*/
	}

	.authorName,
	.authorMsg {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.articlecontent{
		text-indent: 2em;
		padding: .2rem;
		box-sizing: border-box;
		width: 100%;
		text-align: justify;
		/*word-wrap: break-word;*/

	}
	.bottomnbsp{
		width: 100%;
		height:1rem;
	}
	.articletime{
		margin-top: .5rem;
		margin-bottom: 2rem;
		margin-right: .2rem;
		text-align: right;
	}
	.articletime>p{
		line-height: .5rem;
	}
	.scolltotopwaper{
		position: fixed;
		bottom: 1.5rem;
		left: .5rem;
		z-index: 99;
		border-radius: 50%;
		border: 1px solid #007AFF;
		width: .8rem;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		background-color: #FFFFFF;
	}
	.scolltotop{
		font-size: .7rem;
		color: #007AFF;
	}
	.morning{
		color:#999;
		background-color:#fff;
	}
    .night{
    	 color: #c7c7c7;
         background-color:#373535;
    }
</style>
