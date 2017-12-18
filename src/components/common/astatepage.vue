<template lang="html">
	<div class="astatepage">
		<ul>
			<li v-for="item in result" v-if="item" @click="todetailarticleView(item.detailpageid)" :class="model">
				<div class="conHeader">
					<img :src="item.userphoto" alt="" />
					<p>{{fromWhich}}&nbsp;<span class="sorts">{{item.classname}}</span></p>
					<p>&nbsp;{{cTime}}</p>
					<p>&nbsp;{{item.createdAt | filterByTime}}</p>
				</div>
				<div class="artTitle">
					<h3>{{item.detailpagetitle}}</h3>
				</div>
				<div class="detailCon" v-html="item.detailpagecontent">

				</div>
				<div class="conFooter">
					<p class="agree"><span>{{item.detailpagegood}}</span>赞同·</p>
					<p class="comments"><span>{{item.detailpagecount}}</span>阅读·</p>
					<p class="careproblem">{{careProblem}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import rem from '../../../static/js/rem.js'
	import axios from 'axios'
	export default {
		name: 'astatepage',
		data() {
			return {
				//全部内容
				result: {},
				fromWhich: '来自话题:',
				careProblem: '关注问题',
				cTime :　'',
				clsId : ''
			}
		},
		methods: {
			//点击跳转到动态详情
			todetailarticleView(num){
//				alert(num);
				this.$router.push('/bdetailarticle/'+num)
			}
		},
		filters:{
			//将获取的时间字符串进行简单的处理，保留到分钟
			filterByTime(nowtime){
				return tools.returnTime(nowtime);
			}
		}
		,
		created() {
				//获取所有动态
				axios.get('http://txspring.cn:8010/getAllArticleDesc').then((response) => {
					this.result = response.data;
				}).catch((error) => {
					console.log(error)
				})

		},
		components: {

		},
		computed :{
		  	model(){
		  		document.body.className = this.$store.getters.changeModel
		  		//获取当前是日间/夜间模式
		  		return this.$store.getters.changeModel;
		  	}
 		}

	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		font-family: "arial", "simsun", "microsoft yahei";
	}
	.astatepage {
		width: 100%;
		margin-top: 1.4rem;
		position: relative;
		z-index: 99;
	}

	.astatepage ul {
		margin-top: 0.2rem;
		list-style: none;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.astatepage ul li {
		width: 100%;
		height: 3.2rem;
		background-color: #fff;
		border: 1px solid #ececec;
		margin-top: 0.05rem;
	}

	.astatepage .conHeader,
	.astatepage .artTitle,
	.astatepage .conFooter {
		margin-left: 0.3rem;
		margin-top: 0.2rem;
	}

	.astatepage .detailCon {
		margin-left: 0.3rem;
	}

	.astatepage .conHeader {
		height: 0.4rem;
	}

	.astatepage .conHeader img,
	.astatepage .conHeader p {
		float: left;
	}

	.astatepage .conHeader p {
		margin: 0.1rem 0 0 0.2rem;
	}

	.astatepage .conHeader img {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
	}

	.astatepage .artTitle h3 {
		font-size: 0.27rem;
		line-height: 0.32rem;
		color: #333333;
	}

	.astatepage .detailCon {
		width: 92%;
		height: 1.4rem;
		font-weight: bolder;
		font-size: 0.25rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		word-break: break-all;
		color: #555;
	}

	.astatepage .conFooter .agree,
	.astatepage .conFooter .comments {
		float: left;
		margin: 0 0.1rem 0 0;
	}
	.morning{
		background-color:#EFEFF4;
	 }
    .night{
    	 color: #fff;
         background-color:#373535;
    }
    .astatepage ul li.morning{
		color:#999;
		background-color:#fff;
	 }
    .astatepage ul li.night{
    	 color: #fff;
         background-color:#373535;
    }
    .astatepage ul li.night .artTitle h3{
    	color:#b7b7b7;
    }
    .astatepage ul li.night .detailCon{
    	color:#d9d9d9;
    }
</style>
