import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state : {
		//初始化值，默认为夜间模式为false
		isNight : false
	},
	getters:{
		//改变模式，如果用户选择夜间模式，返回night字符串，页面对应为.night的css样式，否则对应.morning的css样式
		changeModel(state){
    		return state.isNight ? 'night' : 'morning'
  		},
  		//改变模式的text
  		changeModelText(state){
    		return state.isNight ? '日间模式' : '夜间模式'
  		},
  		//改变模式的src
  		changeModelImgSrc(state){
  			return state.isNight ? 'http://oz033lzfm.bkt.clouddn.com/sun.png' : 'http://oz033lzfm.bkt.clouddn.com/yejianmoshi.png'
  		},
  		//用户退出登录的话，再次登录还是默认日间模式
  		changeModelExit(state){
  			return state.isNight=false;
  		}
		
	},
	mutations : {
		CHANGE_MODEL(state){
			state.isNight = !state.isNight;
		}
	},
	actions:{
		changeModel(context){
			context.commit('CHANGE_MODEL')
		}
	}
	
	
})
