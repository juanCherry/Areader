<template lang="html">
  <div class="allweather">
    <div class="weatherhead">
      <mt-header title="Weather">
        <span @click="back()" slot="left">
          <mt-button  icon="back">返回</mt-button>
        </span>
      </mt-header>
    </div>
    <div class="weatherbody">
      <p class="city">{{data.city}}</p>
      <div class="tem">
        <p class="temperture">{{data.wendu}}</p>
        <p class="du">o</p>
        <p class="cdu">c</p>
        <p class="type">{{today.type}}</p>
      </div>
      <p class="aqi">Clear | AQI {{data.aqi}} </p>
      <div class="bottomitem">
        <p class="windy">{{today.fengxiang}}</p>
        <!-- <p>{{today.fengli}}</p> -->
        <!-- <p class="mark">{{data.ganmao}}</p> -->
      </div>
    </div>
  </div>

</template>

<script>
  import { Indicator } from 'mint-ui';
export default{
  data(){
    return{
      data:'',
      today:'',
      snow: ['大雪','小雪','中雪','雪','暴雪'],
      rain: ['大雨','小雨','中雨','雨','暴雨']
    }
  },
  created(){
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
    this.axios.get('http://wthrcdn.etouch.cn/weather_mini?city=北京').then(data=>{
      var temp=data.data.data;
      this.data=temp;
      console.log(this.data);
      var forecast=temp.forecast;
      var fx=forecast[0].fengxiang;
      this.windy=fx;
      this.today=forecast[0];
      console.log(this.today);
    })
  },
  mounted(){
    var  _this = this;
    setTimeout(function(){
      var weatherbody=document.querySelector('.weatherbody');
      if(_this.today.type=='晴'){
        console.log(1);
        weatherbody.style.background="url(http://oz033lzfm.bkt.clouddn.com/shine.gif) no-repeat"
        weatherbody.style.backgroundSize="100% 100%"
      }else if (_this.today.type=='雷') {
        weatherbody.style.background="url(http://oz033lzfm.bkt.clouddn.com/thunder.gif) no-repeat"
        weatherbody.style.backgroundSize="100% 100%"
      }else if (_this.rain.indexOf(_this.today.type)>=0) {
        weatherbody.style.background="url(http://oz033lzfm.bkt.clouddn.com/rain.gif) no-repeat"
        weatherbody.style.backgroundSize="100% 100%"
      }else if (_this.snow.indexOf(_this.today.type)>=0){
        weatherbody.style.background="url(http://oz033lzfm.bkt.clouddn.com/snow.gif) no-repeat"
        weatherbody.style.backgroundSize="100% 100%"
      }else{
        weatherbody.style.background="url(http://oz033lzfm.bkt.clouddn.com/cloudy.gif) no-repeat"
        weatherbody.style.backgroundSize="100% 100%"
      }
    },800)
  },
  methods:{
    back(){
      history.back();
    }
  }
}
</script>

<style lang="css">
  *{
    margin: 0;
  }
  .allweather{
    background-color: #fff;
  }
  .weatherbody{
    height: 220px;
    border-radius: 0 0 10px 10px;
    background-color: #fff;
  }
  .city{
    color:#fff;
    font-size: 24px;
    font-family: cursive;
    margin: 0;
    margin-left: 35px;
    padding-top: 25px;
  }
  .temperture{
    color: #fff;
    margin-left: 30px;
    font-size: 64px;
    margin-top: 10px;
  }
  .tem{
    width: 100%;
    height: 80px;
  }
  .tem>p{
    float:left;
    margin-top: 30px;
  }
  .du{
    display: inline-block;
    vertical-align: top;
    font-size:18px;
    font-weight: bold;
    color:#fff;
    padding-left: 0;
    margin-top: 10px;
  }
  .cdu{
    display: inline-block;
    font-size: 32px;
    /*font-weight: bold;*/
    color:#fff;
    vertical-align: top;
    margin-top: 2px;
    margin-left: 1px;
  }
  .type{
    color:#fff;
    font-size: 50px;
    font-family: cursive;
    margin: 0;
    margin-left: 30px;

  }
  .windy{
    color:#fff;
    font-size: 30px;
    font-family: cursive;
    margin: 0;
    margin-left: 30px;
    padding-top: 13px;
  }
  /*.mark{
    color:#fff;
    font-size: 24px;
    font-family: cursive;
    margin: 0;
    margin-left: 30px;
    padding-top: 113px;
    text-indent: 1em;
  }*/
  .aqi{
    color: #fff;
    font-size: 20px;
    margin-left: 30px;
  }
</style>
