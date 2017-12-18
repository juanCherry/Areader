<template>
	<div>
		<div class="atab">
			<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<a class="mui-control-item mui-active" href="#item1mobile" @touchstart.prevent="ashow($event)" id="state" ref="dt">
					动态
				</a>
				<a class="mui-control-item" href="#item2mobile" @touchstart.prevent="ashow($event)" id="hot" ref="hot">
					热门
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'atab',
		data(){
			return{
				
			}
		},
		methods:{
			//给当前展示模块添加一个背景颜色变化的效果
			ashow(ev){
				var current = ev.target;
				ev.target.style.backgroundColor = '#fafafa';
				this.$emit('transferTab',current.id);
				setTimeout(()=>{
					ev.target.style.backgroundColor = '#fff';
				},1000)
			}
		},
		components:{
		}
	}
</script>
<style>
	.atab{
		height:0.6rem; 
		width:100%;
		position:fixed;
		left:0;
		top:0.8rem;
		z-index:2;
	}
	.atab #sliderSegmentedControl{
		width:100%;
		height:0.6rem;
		background-color:#fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.atab .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active{
		color:#000;
		border-bottom:2px solid #007aff;
	}
	.atab .mui-segmented-control .mui-control-item {
		line-height:35px;
	}
	.atab #sliderSegmentedControl a{
		width:50%;
		font-size:0.3rem;
		text-align: center;
		color:#000;
		height: 0.6rem;
	}
	.atab #sliderSegmentedControl a.mui-active{
		border-bottom: 2px solid #007aff;
	}
</style>