import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store'
import {ACTION_NAMES} from './store/action_name'

Vue.use(Router);

export default new Router({
  // mode: "history",
	routes: [
		{ 
      path: '/',
      component: () => import('./views/Home.vue') 
    },{
			path: '/bucket/:id/path/:path',
      component: () => import('./components/Bucket.vue'),
      beforeEnter: (to, from, next) => {
        // console.log('beforeEnter:' + to.path + " " + to.params.id)
        let bucket = to.params.id 
        // let pathKey = to.params.path
        if(bucket && bucket !== ""){
          store.dispatch(ACTION_NAMES.CHANGE_BUCKET , bucket)
          // store.dispatch(ACTION_NAMES.CHANGE_DIR , pathKey)
        }
        next()
      }
		}
	]
});
