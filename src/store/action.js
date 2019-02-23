import { ACTION_NAMES } from './action_name';
import { MUTATION_TYPES } from './mutation_type';
import Vue from 'vue';

export default {
	[ACTION_NAMES.CHANGE_DIR]({ commit }, dirto) {
		// console.log('action' + dirto);
		Vue.http.get('/api/fileList').then((response) => {
			// console.log('response:');
			console.log(response.data);
			let filterRes = response.data.filter((n) => {
				return n.path === dirto;
			});
			// console.log(filterRes);
			if (filterRes.length !== 0) {
				//filterRes[0].files;
				commit(MUTATION_TYPES.CHANGE_FILES, filterRes[0].files);
			}
		});
	},
	[ACTION_NAMES.CHANGE_BUCKET]({ commit }, bucket) {
        // console.log("change bucekt " + bucket)
		commit(MUTATION_TYPES.CHANGE_BUCKET, bucket);
	}
};
