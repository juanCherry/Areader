<template lang="html">
  <div class="bookContent">
    <mt-header title="书籍详情">
      <span @click="back()" slot="left">
        <mt-button  icon="back">返回</mt-button>
      </span>
    </mt-header>
    <div class="headBack">
      <img :src='bookImg[index]' alt="">
    </div>
    <div class="contentBack" >
      <h3 :id="model">{{bookname[index]}}</h3>
      <p :id="model">{{bookcontent[index]}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      bookImg: [],
      bookname:[],
      bookcontent:[],
      index:this.$route.params.id
    }
  },
  created() {
    // console.log(this.index);
    this.axios.get('http://oz033lzfm.bkt.clouddn.com/bDetail.json').then(data=>{
      var temp = data.data.data;
        for(var i=0;i<temp.length;i++){
          var items=temp[i].item;
          console.log(items.length)
          for(var j=0;j<items.length;j++){
            this.bookImg.push(items[j].src);
            this.bookname.push(items[j].name);
            this.bookcontent.push(items[j].details);
          }
        }
        // console.log(this.bookname)
    })
  },
  methods: {
    back() {
      history.back()
    }
  },
  computed :{
			model() {
       			return this.$store.getters.changeModel
     		 }
	}
}
</script>

<style lang="css">
  *{
    margin: 0;
    padding: 0;
  }
  .bookContent{
    background-image: url(http://oz033lzfm.bkt.clouddn.com/book2.jpg);
    background-size: 100% auto;
  }
  .headBack{
    width: 100%;
    height: 4rem;
    background-color: rgba(84,101,111,0.8);
    text-align: center;
  }
  .headBack>img{
    width: 2.2rem;
    height: 2.8rem;
    margin-top: 100px;
    border-radius: 5px;
    box-shadow: 1px 1px 2px lightgray;
  }
  .contentBack{
    width: 100%;
    text-align: center;
    height: 6.2rem;
    background-color: #fff;
  }
  .contentBack>h3{
    margin-top: 0;
    font-size: 0.32rem;
    padding: 45px 10px 0px 10px;
    margin: 0;
  }
  .contentBack>p{
    font-size: 0.24rem;
    text-indent: 2em;
    padding: 20px 25px;
    /*padding-bottom: 40px;*/
    text-align: justify;
    color: #444;
    line-height: 25px;
    margin-bottom: 0;
    height: 5.5rem;
    overflow: hidden;
    background-color: #fff;
  }
   #morning{
				color:#999;
				background-color:#fff;
		} 
	#night{
		 color: #fff;
	   background-color:#373535;
	}
</style>
