<template lang="html">
    <div>
    <ul class="mui-table-view">
    <router-link to="/mine/updatemine">
    <li  class="mui-table-view-cell mui-media">
        <a href="javascript:;" :id="model">
            <img class="mui-media-object mui-pull-left" :src="usermodel.userphoto">
            <div class="mui-media-body" id="model">
                {{usermodel.userid}}
                <p class='mui-ellipsis'>{{usermodel.usershowme}}</p>
            </div>
        </a>
    </li>
    </router-link>

    </ul>
        </div>

</template>
<script>
import { Indicator } from 'mint-ui';
export default {
  name: 'personal',
  data(){
    return {"usermodel":""}
  },
  methods:{

  },
  created(){

    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
    var userid = localMessage.get("userid");
//  console.log(userid);
    this.axios.get('http://txspring.cn:8010/findByUserIdDao?userid='+userid).then((res)=>{

      Indicator.close();
//    console.log(res);
      this.usermodel = res.data;
//    console.log(this.usermodel);
    }).catch((error)=>{
    	 Indicator.close();
      console.log(error);
    });
  },
  computed :{
			model() {
       			return this.$store.getters.changeModel
     		 }
		}
}
</script>

<style lang="css" scoped>
  .mui-table-view .mui-media-object{
    max-width: 66px;
    height: 50px;
    line-height: 50px;
    border-radius: 15%;
  }
   #morning{
		background-color:#fff;
	} 
    #night{
    	 color: #fff;
       background-color:#373535;
    }
</style>
