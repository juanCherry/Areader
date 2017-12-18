var tools = {
     //返回年月日时分
     returnAllTime:(nowtime)=>{
        let date = new Date(nowtime);
        return  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
     },
     //返回年月日
     returnYearMonth:(nowtime)=>{
       var date = new Date(nowtime);
       let hour = date.getHours();
       if(hour < 10){
         hour = '0' + hour;
       }
       return  date.getFullYear() + '-' + date.getMonth() + '-' + hour;

     },
     returnTime:(nowtime)=>{
     	let date = new Date(nowtime);
     	var hour = date.getHours();
     	var minute = date.getMinutes();
     	if(hour < 10){
     		hour = '0' + hour;
     	}
     	if(minute < 10){
     		minute = '0' + minute;
     	}
        return  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + hour + ':' + minute;
     }
}
