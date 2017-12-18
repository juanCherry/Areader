<template>
    <div class="weatherall">
        <weatherday></weatherday>
        <dline></dline>
    </div>
</template>

<script>
import weatherday from '@/components/common/dWeather.vue';
import dline from '@/components/common/dline';
import { Indicator } from 'mint-ui';
export default {
    name: 'weather',
    components:{
        weatherday,
        dline
    },
    data(){
      return {}
    },
    created(){
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      });
      setTimeout(function () {
        Indicator.close();
      },1000);
    }
}
</script>
<style>
  .weatherall{
  	width: 100%;
  	height: 100%;
  	background-color: #fff;
  }
</style>
