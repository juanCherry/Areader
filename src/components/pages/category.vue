<template>
  <div class="category" :id="model">
    <div class="box">
      <div class="topSort">
        <mt-header title="分类" style="font-size:20px">
          <!--<div slot="left">
            <mt-button @click="back()" icon="back" style="font-size:16px">返回</mt-button>
          </div>-->
         <!-- <mt-button icon="more" slot="right"></mt-button>-->
        </mt-header>
      </div>
    </div>
       <categorylist></categorylist>
       <footerbottom></footerbottom>
  </div>
</template>

<script>
// 引入需要用的组件
  import footerbottom from "@/components/common/footerbottom"
  import categorylist from '@/components/page/categorylist'

  export default {
    name: 'category',
    components:{
      categorylist,
      footerbottom
    },
    methods: {
      back(){
        history.back();
      }
    },
    computed:{
    	model(){
    		return this.$store.getters.changeModel;
    	}
    }
  }
</script>

<style scoped>
   .box{

   }
   #morning{
   	background-color:#EFEFF4;
   }
   #night{
   	background-color: #373535;
   }
</style>
