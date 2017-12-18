<template>
    <div class="small">
        <canvas id="myChart2" width="320px" height="350px"></canvas>
    </div>
</template>

<script>
//引入chartjs
import Chart from 'chart.js'
import { Indicator } from 'mint-ui';

export default {
    components: {

    },
    data() {
        return {
            day: [],
            tem:[]
        }
    },
    mounted() {
        //由于setTimeout中指针指向window，因此在这保存指针指向，使_this指向vue组件对象
        var  _this = this;
        //由于axios的请求异步，所以需要设置一个延时定时器，使其能够收到请求下来的数据
        setTimeout(function(){
        //获取到canvas画布
        var ctx2 = document.getElementById("myChart2");
        var myChart2 = new Chart(ctx2, {
            //type属性表示图形形状:line:折线图;bar:柱状图 ;Radar:雷达图/蛛网图 ;doughnut:圆环图 ;pie:饼图 ;polarArea:极地区域图;bubble：气泡分布图;scatter：散点图
            type: "line",
            data: {
                //横坐标的数据,数组类型
                labels:_this.day ,
                datasets: [
                    {
                        //标题
                        label: "未来五天天气预测",
                        //背景颜色
                        backgroundColor: "rgba(225,10,10,0.3)",
                        //边框颜色
                        borderColor: "rgba(225,103,110,1)",
                        //边框宽
                        borderWidth: 1,
                        //数据点边框颜色
                        pointStrokeColor: "#fff",
                        //数据点颜色
                        pointStyle: "crossRot",
                        //纵坐标的数据，数组类型
                        data: _this.tem,
                        cubicInterpolationMode: "monotone",
                        spanGaps: "false",
                        // animation: true,
                        fill: "false"
                        //详细网址：http://m.blog.csdn.net/macanfa/article/details/50994593
                    }
                ]
            },
            options: {

            }

        });
        var data=myChart2.config.data;
        data.labels=this.day;
        data.datasets[0].data=this.tem;
        Indicator.close();
       },1000);
    },
    methods: {

    },
    created(){
        Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
        });
        this.axios.get('http://wthrcdn.etouch.cn/weather_mini?city=北京').then(data=>{
            Indicator.close();
            var forecast=data.data.data.forecast;
            console.log(forecast);
            for(var i=0;i<forecast.length;i++){
                var day=forecast[i].date.slice(0,3);
//                console.log(day);
                this.day.push(day);
                var low=parseInt(forecast[i].low.slice(3,5));
                var high=parseInt(forecast[i].high.slice(3,5));
                var tem=parseInt((low+high)/2);
                this.tem.push(tem);
            }
            console.log(this.day);
            console.log(this.tem);

        })
    }
}
</script>
<style>
	body{
		background-color: #fff;
	}
    .small {
        width: 100%;
        height: 100%;
        margin: 0;
        padding-left: 15px;
        padding-top: 5px;
        background: rgb(255,255,255);
    }
</style>
