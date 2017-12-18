<template>
  <div class="sortPage">

    <div class="topSort">
      <mt-header title="分类" style="font-size:20px">
        <div slot="left">
          <mt-button @click="back()" icon="back" style="font-size:16px">返回</mt-button>
        </div>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <h4 class="sortAtical" :id="model">{{ classnametitle }}类文章</h4>
    <div class="sortAticalAll" v-for="sort in result" @click="tobdetailarticleview(sort.detailpageid)" :id="model">
       <div class="classAndUser" :id="model">
           <img :src="sort.userphoto" alt="">
           <p>文章作者: {{sort.detaileuserid}}</p>
       </div>
       <h4>{{sort.detailpagetitle}}</h4>
       <p>{{sort.detailpagecontent}}</p>
       <div class="datailGood">
          <p style="margin-right:0.1rem;">{{sort.detailpagegood}}赞同</p>
          <p>{{sort.detailpagecount}}阅读</p>
       </div>
    </div>
    <div class="noMore">
      <p>已经没有更多了...</p>
    </div>

  </div>
</template>

<script>
import bus from '../../data.js'
export default {
  data () {
    return {
      result : {},
      id : this.$route.params.detailid,
      classnametitle : ''
    }
  },
  methods: {
    back(){
      history.back();
    },
    // 获取到某篇文章，通过路由传参进入文章详情
    tobdetailarticleview(num){
    	console.log(num);
    	this.$router.push('/bdetailarticle/'+num);
    }
  },
  // 请求某个分类的文章
  created(){
    // 通过localStorage来保存每次变化获取到的值
  	var detailid =localMessage.get('detailid');

    this.classnametitle = localMessage.get('classnames');
    // 请求某个类所有的文章
    this.axios.get('http://txspring.cn:8010/getAllClassAll?classid=' + detailid).then(data=>{
      this.result = data.data;
      console.log(data);
    });

  },
  computed:{
			model(){
				return this.$store.getters.changeModel;
			}
	}
}
</script>

<style>
    .sortAtical{
      height : 0.5rem;
      padding-left : 0.2rem;
      line-height : 0.5rem;
      background : #fff;
      font-size : 0.25rem;
      color : gray;
    }
    .sortAticalAll{
      background : #fff;
      border-radius : 30px 0px 30px 0px;

    }
    .sortAticalAll>p{
      /*width : 93%;*/
      height : 1.4rem;
      font-weight: bolder;
  		font-size: 0.25rem;
  		overflow: hidden;
  		text-overflow: ellipsis;
  		display: -webkit-box;
  		-webkit-line-clamp: 4;
  		word-break:break-all;
  		-webkit-box-orient: vertical;
  		color: #555;
      margin-left : 0.2rem;
    }
    .sortAticalAll>h4{
      color: #007aff;
      margin-left : 0.2rem;
    }
    .classAndUser{
      margin-top : 0.15rem;
      background : #fff;
      border-radius : 30px 0px 30px 0px;
      display : flex;
    }
    .classAndUser>img{
      width : 0.5rem;
      height : 0.5rem;
      border-radius : 50%;
      margin-left : 0.2rem;
      margin-top : 0.15rem;
    }
    .classAndUser>p{
      margin-left : 0.2rem;
      margin-top : 0.15rem;

    }
    .datailGood{
      display: flex;
      margin-left : 0.2rem;
    }
    .noMore{
      margin-top : 0.3rem;
      text-align : center;
    }
    .morning{
			background-color:#fff;
	 }
    #night{
    	 color: #fff;
       background-color:#3f3c3c;
    }
</style>
