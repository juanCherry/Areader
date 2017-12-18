<template lang="html">
<div style="height:100%;background-color:#fff">
  <div class="allBook" :id="model">
    <div class="title">
      <mt-header title="全部书籍">
      <router-link to="/shop" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    </div>
    <div>
    <!-- <router-link to="bookdetail"> -->
        <div class="allbooks">
          <div v-for="(book,index) in book[index]" class="book" @click="bookdetail(book.id)">
            <div class="bookPicture">

              <img :src="book.src" alt="">

            </div>
            <div class="bookdown">
              <div class="bookName">
                <span :id="model">{{book.name}}</span>
              </div>
              <div class="bookAuthor">
                <span :id="model">{{book.autor}}</span>
              </div>
            </div>
          </div>
        </div>
      <!-- </router-link> -->
    </div>
  </div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
  data(){
    return{
      book: [],
      index: this.$route.params.id
    }
  },
  created() {
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
    this.axios.get('http://oz033lzfm.bkt.clouddn.com/bDetail.json').then(data=>{
        Indicator.close();
        var temp = data.data.data;
        // console.log(temp[1].id);
        for(var i=0;i<temp.length;i++){
          this.book.push(temp[i].item);
        }
        console.log(this.book[0])
    })
  },
  methods:{
    bookdetail(id){
      console.log(id);
      this.$router.push('/bookdetail/'+id);
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

  .allBook{
    width: 100%;
    background-color: #fff;
    height: 680px;
  }
  .allbooks{
    padding-top: 20px;
    padding-right: 14px;
    margin-top: 5px;
  }
  .allbooks .book{
    width: 30%;
    float: left;
    margin-left: 10px;
  }
  .allbooks .bookPicture{
    width: 1.6rem;
    height: 2.2rem;
    margin: 0;
    padding: 0;
  }
  .allbooks .bookPicture img{
    width: 1.6rem;
    height: 2.2rem;
    border-radius: 8px;
    box-shadow: 1px 1px 2px gray;
  }
  .allbooks .bookPicture img:first-of-type{
    margin-left: 14px;
  }
  .allbooks .bookName{
    width: 1.4rem;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
    margin-left: 22px;
    margin-top: 5px;
  }
  .allbooks .bookAuthor{
    width: 1.4rem;
    font-size: 13px;
    color: #999999;
    margin-left: 22px;
    margin-top: 2px;
    padding-bottom: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
