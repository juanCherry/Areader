<template lang="html">
      <div id="mineCreate">
      <mt-header title="个人写作列表">
      <router-link to="/mine" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="parentCollection" :to="'/bdetailarticle/'+item.detailpageid" v-for="item in articlemodel" v-if="articlemodel" @click="showdetail(item.detailpageid)">
         <p class="collectionTitle">{{item.detailpagetitle}}</p>
         <p class="collectionTime">{{item.createdAt | filterByTime}}</p>
      </div>
     <div class="isnull" v-if="shown">您的作品空空如也,快去添加吧！</div>
      </div>
</template>

<script>
	export default {
		name: 'minecreate',
    data(){
		  return {
		     "articlemodel":{},
         "shown":false
      }
    },

    created(){
      var userid = localMessage.get("userid");
		  this.axios.get('http://txspring.cn:8010/getDetailByid?detailuserid='+userid).then((res)=>{

                  if(res.data.type=="0"){
                      this.shown = true;
                  }
                  else{
                    this.articlemodel = res.data;
                  }
      })
        .catch((error)=>{

        })
    },
    methods:{
      showdetail(id){
          console.log(id);
          this.$router.push('/bdetailarticle/'+id);
      }
    },
    filters:{
      filterByTime(value){
        if(value!=""){
          return tools.returnYearMonth(value);
        }
        else{
          return value;
        }
      }
    }
	}
</script>

<style lang="css">
        #mineCreate .hidden{
          overflow: hidden;
        }
        #mineCreate .bottomborder{
         border-bottom: 1.2px solid #c8c7cc !important;
        }
        p{
          margin: 0px;
          padding: 0px;
        }
        .parentCollection{
          background-color: #ffffff;
          min-height: 40px;
          overflow: hidden;
          color: inherit;
          border-bottom: 1.2px solid #c8c7cc !important;
          position: relative;
        }
        .collectionTitle{
          float: left;
          min-height: 48px;
          line-height: 48px;
          font-size: 16px;
          width: 60%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: inherit;
          font-family: 'Helvetica Neue',Helvetica,sans-serif;
          padding-left: 0.2rem;
        }
        .collectionTime{
          float: right;
          min-height: 48px;
          line-height: 48px;
          color: green;
          font-size: 17px;
          font-family: 'Helvetica Neue',Helvetica,sans-serif;
          padding-right: 0.2rem;
          margin-right: 0.4rem;
        }
        .collectionTime::after{
          border: 2px solid #c8c8cd;
          border-bottom-width: 0;
          border-left-width: 0;
          content:"";
          top:50%;
          right: 20px;
          position: absolute;
          width: 5px;
          height:5px;
          transform: translateY(-50%) rotate(45deg);
          float: right;
        }
        .isnull{
           text-align: center;
           margin-top: 100px;
          font-family: 'Helvetica Neue',Helvetica,sans-serif;
          font-size: 18px;
        }
</style>
