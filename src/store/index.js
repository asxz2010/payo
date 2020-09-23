import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
    ChangeShowCom: true,
  },

  getters: {
    getCount(state){
      return state.count
    },
    isShow(state){
      return state.ChangeShowCom
    }
  },

  mutations: {
    addCount(state, num){
      state.count = state.count + num
    },

    // delCount(state, num){
    //   if(state.count>0){
    //     state.count = state.count - num
    //   }else{
    //     state.count = 0
    //   }
    // },

    // show(state){
    //   state.ChangeShowCom = true
    // },

    // hide(state){
    //   state.ChangeShowCom = false
    // }

  },
  
  actions:{
    getAddCount(context, num){
      context.commit('addCount', num)
    }
  }

})
