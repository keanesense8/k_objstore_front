import { MUTATION_TYPES } from './mutation_type';

export default {
	[MUTATION_TYPES.CHANGE_BUCKET](state, bucket) {
		state.bucket = bucket;
	},
	[MUTATION_TYPES.CHANGE_BUCKETS](state, buckets) {
		state.buckets = buckets;
	},
	[MUTATION_TYPES.CHANGE_FILES](state, files) {
		state.files = files;
	}
};
