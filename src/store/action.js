import { ACTION_NAMES } from './action_name';
import { MUTATION_TYPES } from './mutation_type';
import Vue from 'vue';

export default {
	[ACTION_NAMES.CHANGE_DIR]({ commit , state}, dirto) {
        // console.log('action:' + dirto);
        // console.log(state)
        let apiUrl = '/api/self/bucket/' + state.bucket + "/path/" +   dirto.split("/").join("_")
		commit(MUTATION_TYPES.CHANGE_LOADING  ,true)
        // mystring.split(',').join(newchar);
        // console.log('api:' + apiUrl)
		Vue.http.get(apiUrl).then((response) => {
            // console.log('response:');
            // console.log(response.data);
            commit(MUTATION_TYPES.CHANGE_FILES, response.data);
			commit(MUTATION_TYPES.CHANGE_LOADING  ,false)
			// let filterRes = response.data.filter((n) => {
			// 	return n.path === dirto;
			// });
			// // console.log(filterRes);
			// if (filterRes.length !== 0) {
			// 	//filterRes[0].files;
			// 	commit(MUTATION_TYPES.CHANGE_FILES, filterRes[0].files);
			// }
		});
	},
	[ACTION_NAMES.CHANGE_BUCKET]({ commit }, bucket) {
        // console.log("change bucket " + bucket)
		commit(MUTATION_TYPES.CHANGE_BUCKET, bucket);
    },
    [ACTION_NAMES.EMPTY_DIR]({ commit }){
        commit(MUTATION_TYPES.CHANGE_FILES,[]);
	},
	[ACTION_NAMES.CHANGE_LOADING]({commit} , v){
		commit(MUTATION_TYPES.CHANGE_LOADING  ,v)
	}
};
