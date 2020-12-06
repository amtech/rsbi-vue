import {sendRequest} from "./service-utils";
import {Result} from "../common/Result.js";
import {handleVueError,handleVueWarning,handleGlobalError,handleGlobalRejection} from "./errorHandler.js";
window.Result = Result;
export const globalPlugin = {
  install(Vue){
    Vue.config.productionTip = false;
    Vue.prototype.$sendRequest = sendRequest.bind(Vue.prototype,Vue.prototype);
    Vue.prototype.$isDev = process.env.NODE_ENV == 'development';
    Vue.config.errorHandler = handleVueError;
    Vue.config.warnHandler = handleVueWarning;
    window.onerror = handleGlobalError;
    window.onunhandledrejection = handleGlobalRejection;
  }
}
export const globalMixins = {
  data(){
    return{

    }
  },
  methods:{},
  mounted(){
    if(this.$isDev){
      (window.comps || (window.comps = {}))[this.$options.name || "anonymous"] = this;
    }
  }
}

