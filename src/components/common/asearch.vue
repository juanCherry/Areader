<template>
	<div class="asearch">
		<mt-search placeholder="搜索" v-on:input="arefreshlist($event)" class="search">
		</mt-search>
	</div>
</template>

<script>import Vue from 'vue'
import axios from 'axios'
import refresh from '@/components/common/arefresh'
import rem from '../../../static/js/rem.js'
import { Toast } from 'mint-ui';
Vue.prototype.rel = 0;
export default {
	name: 'search',
	data() {
		return {
			iptvalue: {}, //用户在输入框的输入的值
			searchResult: {}
		}
	},
	methods: {
		//用户在查询数据时，展示加载效果
		arefreshlist(ev) {
			let ipt = document.querySelector('input');
			this.iptvalue = ipt.value.length;
			//向home.vue中传送用户在输入框输入字符的长度
			this.$emit('transferIptLength', ipt.value.length);
			//根据用户输入的内容请求相应的数据
			if(ipt.value.length > 0) {
				axios.get('http://txspring.cn:8010/getDetailByTitle?title=' + ipt.value).then((response) => {
					this.$emit('transferType', response.data)
				}).catch((error) => {
					console.log(error)
				})
			}

		}
	},
	components: {
		refresh
	},
	watch: {
		iptvalue(newValue, oldVaule) {
			if(newValue == 0) {
				this.isShow = false;
			}
		}
	}

}</script>

<style>.asearch {
	width: 100%;
	height: 0.8rem;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
}

.mint-search {
	height: 0.8rem;
}

.asearch .mint-searchbar {
	background-color: #fff;
}

.asearch .mint-searchbar-inner,
.mint-searchbar-core {
	background-color: #ececec;
	height: 0.6rem;
}


/*mui自带取消模块*/

.asearch .mint-searchbar-cancel,
.mint-searchbar-inner .mintui-search {
	display: none;
}

.asearch .mint-searchbar-inner {
	border-radius: 0.5rem;
}


/*搜索框input*/

.asearch .mint-searchbar-core {
	background: url('../../../static/images/search.png') no-repeat 0.2rem 0.35rem;
	padding-left: 0.5rem;
	background-size: 0.3rem;
	font-size: 0.25rem;
	padding-top: 0.2rem;
	height: 0.8rem;
}

input[type=search] {
	text-align: left;
	text-indent: 0.4rem;
	padding: 0.3rem 0 0 0;
}

.asearch .afresh {
	margin-top: 2rem;
}

input[type=search] .night {
	color: #000;
}</style>