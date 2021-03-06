import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{ 
      path: '/',
      component: () => import('./views/Home.vue') 
    },{
			path: '/bucket/:id/path/:path',
			component: () => import('./components/Bucket.vue')
		}
	]
});
