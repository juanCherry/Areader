<template lang='html'>
	<div class="sortImg">
		<transition>
			<div class="sort animated" :class="{'isShow':show}">
				<transition-group enter-active-class="fadeInRight" tag="div">
					<div class="" key="" v-for="(item,index) in result">

						<div @click="changclass(item.classid,result[index].classname)" class="css animated"><img :id="item.classid" :class="'img' + [index]" :src="result[index].classImg"></div>

					</div>
				</transition-group>
			</div>
		</transition>

	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import bus from '../../data.js'
	export default {
		data() {
			return {
				show: true,
				result: []
			}
		},
		methods: {
			changclass(id, classname) {
				console.log(classname);
				localMessage.set('detailid', id);
				localMessage.set('classnames', classname);
				this.$router.push({
					path: '/category/categorydetailu',
					name: 'categorydetailu'
					// params: {
					//     detailid: id,
					//     title: classname
					// }
				})
			}
		},
		// 请求分类种类
		created() {
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
			this.axios.get('http://txspring.cn:8010/getAllClass').then(data => {
				this.result = data.data;
				Indicator.close();
			});

			setInterval(() => {
				if(this.show) {
					this.show = false;
				} else {
					this.show = true;
				}
			}, 4000);
		}
	}
</script>

<style lang='css'>
	.sort {
		width: 6rem;
		height: 6rem;
		margin: 2rem auto;
		background: rgba(30, 144, 255, 0.2);
		border-radius: 50%;
		display: flex;
		position: relative;
	}
	
	.sortImg {
		height: 100%;
		/*background-color: #EFEFF4;*/
	}
	
	.isShow {
		transition: 3s ease;
		transform: rotate(360deg);
		/*animation : shows 2s;
      animation-iteration-count:2;
      animation-fill-mode:forwards;*/
	}
	/*@keframes shows{
      0%{transform : rotate(60deg);}
      20%{transform : rotate(120deg);}
      40%{transform : rotate(180deg);}
      60%{transform : rotate(240deg);}
      80%{transform : rotate(300deg);}
      100%{transform : rotate(360deg);}
    }*/
	
	.img0 {
		width: 0.6rem;
		height: 0.6rem;
		;
		align-self: center;
		position: absolute;
		left: 0.55rem;
		top: 1.8rem;
	}
	
	.img1 {
		width: 0.65rem;
		height: 0.65rem;
		align-self: center;
		position: absolute;
		top: 1.8rem;
		right: 0.5rem;
	}
	
	.img2 {
		width: 0.9rem;
		height: 0.9rem;
		align-self: center;
		position: absolute;
		left: 2.7rem;
		top: 0.3rem;
	}
	
	.img3 {
		width: 0.6rem;
		height: 0.6rem;
		align-self: center;
		position: absolute;
		left: 0.55rem;
		top: 3.8rem;
	}
	
	.img4 {
		width: 0.6rem;
		height: 0.6rem;
		align-self: center;
		position: absolute;
		left: 2.7rem;
		top: 5.1rem;
	}
	
	.img5 {
		width: 0.9rem;
		height: 0.9rem;
		;
		align-self: center;
		position: absolute;
		right: 0.5rem;
		top: 3.65rem;
	}
</style>