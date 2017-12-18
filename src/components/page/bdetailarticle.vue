<template lang="html">
	<div class="bdetailarticle">
		<barticleheader class="atop" :article="result"></barticleheader>
		<barticlebody class="abody" :article="result" :createtime="createtime" :author="author"></barticlebody>
		<barticlebottom class="barticlebottom" :article="result"></barticlebottom>
	</div>
</template>

<script>
	import barticleheader from '../common/barticleheader'
	import barticlebody from '../common/barticlebody'
	import barticlebottom from '../common/barticlebottom'
	import { Indicator } from 'mint-ui';
	export default {
		name: 'app',
		data() {
			return {
				id: this.$route.params.id,
				createtime: '',
				author: {},
				result: {}

			}
		},
		components: {
			barticleheader,
			barticlebody,
			barticlebottom
		},
		
		created() {
			//现在父组件请求文章内容和作者，然后把数据传到子组件显示
			var _this = this;
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
			this.axios.get('http://txspring.cn:8010/getContentByPageDeatilId?detailid=' + _this.id)
				.then(function(response) {
					_this.result = response.data;
					var date = new Date(response.data.createdAt);
					_this.createtime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
					_this.axios.get('http://txspring.cn:8010/findByUserIdDao?userid=' + _this.result.detaileuserid)
						.then(function(response) {
							_this.author = response.data;
							Indicator.close();
						}).catch(function(error) {
							console.log(error);

						})

				}).catch(function(error) {
					Indicator.close();
					console.log(error);

				})

		}
		
	}
</script>

<style lang="css">
	.bdetailarticle {
		background-color: #FFFFFF;
		min-height: 11rem;
	}

	.abody {
		/*position: fixed;
		z-index: -10;*/
	}

	.barticlebottom {
		position: fixed;
		z-index: 10;
		bottom: 0;
		width: 100%;
	}
</style>
