<template lang="html">
  <div class="all" :class="model">
    <div class="bookNav" :id="model">
      <div v-for="(item,i) in temp" @click="bookall(item.id)" class="titleIcon" >
        <img :src="item.img">
        <p>{{item.title}}</p>
      </div>
      
    </div>
    <div v-for="(item,i) in temp" class="bookShow" :id="model">
      <div class="listTitle">
        <p>{{item.type}}</p>
        
        <span @click="bookall(item.id)">{{allBook[i]}}</span>

      </div>
        <div class="content" >
          <div class="books">
            <div v-for="(book,index) in book[i]" @click="bookdetail(book.id)" class="book">
              <div class="bookPicture">
                <img :src="book.src" alt="">
              </div>
              <div class="bookdown">
                <div class="bookName">
                  <span>{{book.name}}</span>
                </div>
                <div class="bookAuthor">
                  <span>{{book.autor}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shop',
  data(){
    return{
      temp:'',
      type: [],
      allBook: [],
      book: []
    }
  },
  methods:{
      bookdetail(id){
        this.$router.push('/bookdetail/'+id);
      },
      bookall(i){
//      console.log(i)
        this.$router.push('/allbooks/'+i)
      }
  },
  created() {
    this.axios.get('http://oz033lzfm.bkt.clouddn.com/bDetail.json').then(data=>{
        var temp = data.data.data;
        this.temp=temp;
//      console.log(this.temp)
        for(var i=0;i<temp.length;i++){
          this.type.push(temp[i].type);
          this.book.push(temp[i].item);
          this.allBook.push(temp[i].all)
        }
//      console.log(this.book)
    })
  },
  computed : {
		model(){
   			return this.$store.getters.changeModel
 		 }
	}
}
</script>

<style lang="css" scoped>
body{
	background-color: #ededed;
}
   .all{
    padding-bottom: 50px;
    background-color: #EFEFF4;
   }
   .bookNav{
     background-color: #fff;
     display: flex;
     justify-content: space-around;
     align-items: center;
   }
   .titleIcon{
     margin: 0;
     padding: 0;
     padding-top: 12px;
     padding-bottom: 10px;
   }
   .titleIcon>img{
     width: 25px;
     margin-left: 1px;
   }
   .titleIcon>p{
     margin: 0;
     font-size: 14px;
     color: #a5a5a5;
   }
   .bookShow{
     /*height: 150px;*/
     background-color: #fff;
     margin-top: 5px;
     border-top: 1px lightgray solid;
     border-bottom: 1px lightgray solid;
   }
   .listTitle{
     height: 50px;
   }
   .listTitle>p{
     margin: 0;
     font-weight: bold;
     font-size: 16px;
     float: left;
     color: #444444;
     margin-left: 22px;
     margin-top: 18px;
   }
   .listTitle>span{
     font-size: 14px;
     font-family: "微软雅黑";
     float: right;
     text-decoration: none;
     color: #0084ff;
     margin-right: 15px;
     margin-top: 18px;
   }
   .content{
     width: 100%;
     overflow: auto;
   }
   .content::-webkit-scrollbar{
                display: none;
            }
   .books{
     width: 190%;
     display: flex;
     justify-content: space-around;
     align-items: center;
     padding-right: 14px;
     margin-top: 5px;
   }
   .bookPicture{
     width: 1.6rem;
     height: 2.2rem;
     margin: 0;
     padding: 0;
   }
   .bookPicture img{
     width: 1.6rem;
     height: 2.2rem;
     /*margin-top: 10px;*/
     border-radius: 8px;
     box-shadow: 1px 1px 2px gray;
   }
   .bookPicture img:first-of-type{
     margin-left: 14px;
   }
   .bookdown{
     height: 65px;
   }
   .bookName{
     width: 1.4rem;
     /*height: 35px;*/
     font-size: 14px;
     font-weight: bold;
     color: #444444;
     margin-left: 22px;
     margin-top: 5px;
     overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
   }
   .bookAuthor{
     width: 1.4rem;
     /*height: 50px;*/
     font-size: 13px;
     color: #999999;
     margin-left: 22px;
     margin-top: 2px;
     padding-bottom: 15px;
     overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
   }
   .morning{
		background-color:#ededed;
	} 
	.night{
		 color: #fff;
	   background-color:#373535;
	}
	 #morning{
		background-color:#fff;
	} 
	#night{
		 color: #fff;
	   background-color:#373535;
	}
	#night .listTitle>p,#night .bookName{
		color:#c7c7c7;
	}
	
</style>
