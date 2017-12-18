<template>
	<div id="wrap" :class="model">
		<!--搜索框-->
		<asearch v-on:transferType="getType" v-on:transferIptLength="getIptLength"></asearch>
		<!--导航tab-->
		<atab v-on:transferTab="getTab" ></atab>
		<div class="loading" v-if="abol">
			<!--加载效果-->
			<arefresh></arefresh>
		</div>
		<div class="page" v-else v-show="ismatched">
			<!--显示动态和热门-->
			<div v-if="showHot">
				<astatepage></astatepage>
			</div>
			<div v-else>
				<ahotpage></ahotpage>
			</div>
		</div>
		<!--如果用户输入搜索内容，则显示这一区域-->
		<div class="amatchtitle" v-show="backHotAndState" :class="model">
			<ul>
				<li v-for="item in matchdata" @click="todetailarticleView(item.detailpageid)" :class="model">
					<div class="conHeader">
						<img :src="item.userphoto" alt="" />
						<p>来自话题：&nbsp;<span class="sorts">{{item.detailclassid}}</span></p>
					</div>
					<div class="artTitle">
						<h3>{{item.detailpagetitle}}</h3>
					</div>
					<div class="detailCon" v-html="item.detailpagecontent">
					</div>
					<div class="conFooter">
						<p class="agree"><span>{{item.detailpagegood}}</span>赞同·</p>
						<p class="comments"><span>{{item.detailpagecount}}</span>评论·</p>
						<p class="careproblem">关注问题</p>
					</div>
				</li>
			</ul>
		</div>
		<!--如果没有匹配的搜索内容，显示为None-->
		<div v-if="showNone" class="showNone">嘤嘤嘤...暂时没有匹配内容噢</div>
		<!--回到顶部-->
		<transition name="fade">
			<div class="toTop" v-if="backTop">
				<img src="../../../static/images/toTop.png" alt="" @click="toBack" />
			</div>
		</transition>
		<!--底部区域-->
		<transition name="fade">
			<footerbottom v-if="isScroll"></footerbottom>
		</transition>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import asearch from '@/components/common/asearch'
	import atab from '@/components/common/atab'
	import arefresh from '@/components/common/arefresh'
	import ahotpage from '@/components/common/ahotpage'
	import astatepage from '@/components/common/astatepage'
	import footerbottom from '@/components/common/footerbottom'
	export default {
		name: 'home',
		data() {
			return {
				//是否显示加载效果
				abol: true,
				//显示hot页
				showHot: true,
				//是否匹配用户在输入框的所有内容
				ismatched: true,
				//返回hot热门和state动态页
				backHotAndState: false,
				//拿到用户在输入框输入的匹配内容
				matchdata: {},
				//是否滚动页面
				isScroll: true,
				//回到顶部
				backTop: false,
				//滚动的高度
				scrollTop: '',
				//在输入框搜索的字符长度
				iptValueLen : '',
				// 如果没有出现与用户输入的内容相匹配的内容，就显示搜索不到的提示
				showNone : false

			}
		},
		methods: {
      getType(data) {
        //从asearch子组件中传来的type数据，type 不为0 表示能匹配上用户当前搜索的内容
        if (data.type != 0 && this.iptValueLen > 0) {
          this.backHotAndState = true;
          this.ismatched = false;
          this.matchdata = data;
          this.showNone = false;
        }else if(data.type == 0 && this.iptValueLen > 0){
        	this.ismatched = false;
        	this.backHotAndState = false;
        	this.showNone = true;
        }
      },
      //功能：当点击热门时显示热门内容，当点击动态时显示动态内容
      getTab(data) {
        this.ismatched = true;
        this.backHotAndState = false;
        if (data == 'hot') {
          this.showHot = !this.showHot;
        } else if (data == 'state') {
          this.showHot = !this.showHot;
        }
      },
      //从asearch 传来用户输入内容的长度，如果长度为0表示用户暂时不搜索数据，则取消匹配 用户之前在输入框中输入的内容
      getIptLength(data) {
      	this.iptValueLen = data;
        if (data == 0) {
          this.backHotAndState = false;
          this.ismatched = true;
        }
      },
      //获取当前滚动的高度，如果滚动高度超过150 则让底部导航栏消失，否则展示底部导航栏
      getScrollHeight() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.scrollTop = scrollTop;
        this.isScroll = scrollTop > 150 ? false : true;
        this.backTop = scrollTop > 180 ? true : false;
      },
      //回到顶部
      toBack() {
        $('body,html').animate({
          scrollTop: 0
        }, 600)
      },
      todetailarticleView(num){

		this.$router.push('/bdetailarticle/'+num)
	  }
    },
  	components: {
			asearch,
			atab,
			arefresh,
			ahotpage,
			astatepage,
			footerbottom
		},
		created() {
			setTimeout(() => {
				this.abol = false
			}, 1200)
		},
		updated() {
			window.addEventListener('scroll', this.getScrollHeight)

		},
		computed :{
			model() {
       			return this.$store.getters.changeModel
     		 }
		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
		font-family: "arial", "simsun", "microsoft yahei";
	}
	.showNone{
		position:relative;
		z-index:10;
		margin-top:1.8rem;
		text-align: center;
		font-size: 18px;
		font-weight: bolder;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	.page{
		margin-top:1.4rem;
		position:relative;
		z-index:10;
	}
	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}

	.amatchtitle {
		margin-top: 1.4rem;
		position: relative;
		z-index:99;
	}

	.amatchtitle ul {
		margin-top: 0.2rem;
		list-style: none;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.amatchtitle ul li {
		width: 100%;
		height: 3.3rem;
		background-color: #fff;
		border: 1px solid #ececec;
		margin-top: 0.05rem;
	}

	.amatchtitle.conHeader,
	.amatchtitle .artTitle,
	.amatchtitle .conFooter {
		margin-left: 0.3rem;
		margin-top: 0.2rem;
	}

	.amatchtitle .detailCon {
		margin-left: 0.3rem;
	}

	.amatchtitle .conHeader {
		height: 0.4rem;
		margin-left: 0.3rem;
		margin-top: 0.2rem;
	}

	.amatchtitle .conHeader img,
	.amatchtitle .conHeader p {
		float: left;
	}

	.amatchtitle .conHeader p {
		margin: 0.1rem 0 0 0.2rem;
	}

	.amatchtitle .conHeader img {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
	}

	.amatchtitle .artTitle h3 {
		font-size: 0.27rem;
		line-height: 0.32rem;
		color: #007AFF;
	}

	.amatchtitle .detailCon {
		width: 92%;
		height: 1.4rem;
		font-weight: bolder;
		font-size: 0.25rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		color: #555;
	}

	.amatchtitle .conFooter .agree,
	.amatchtitle .conFooter .comments {
		float: left;
		margin: 0 0.1rem 0 0;
	}
	.toTop {
		width:0.4rem;
		height:0.4rem;
		position: fixed;
		z-index:11;
		bottom: 0.8rem;
		right: 0.6rem;
	}
	.amatchtitle ul li.morning{
		background-color:#fff;
	}
    .amatchtitle ul li.night{
    	 color: #fff;
         background-color:#373535;
    }
</style>

