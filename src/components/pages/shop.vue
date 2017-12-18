<template>
  <div class="shop">
      <mt-header fixed title="Shopping" class='mtheader'></mt-header>
      <Swiper></Swiper>
      <bookShop></bookShop>
      <footerbottom></footerbottom>
  </div>
</template>

<script>
  import footerbottom from "@/components/common/footerbottom.vue";
  import Swiper from "@/components/common/dSwiper.vue"
  import bookShop from "@/components/common/dShop.vue"
  export default{
    name: 'shop',
    components:{
      footerbottom,
      Swiper,
      bookShop
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .shop{
  	background-color: #EFEFF4;
  }
  .swiper{
    background-color: #fff;
  }
  
 
</style>
