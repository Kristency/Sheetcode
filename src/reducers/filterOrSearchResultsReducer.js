import { FETCH_SEARCH_RESULTS, FETCH_FILTER_RESULTS } from '../actions/types'

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_SEARCH_RESULTS:
			return action.payload
		case FETCH_FILTER_RESULTS:
			return action.payload
		default:
			return state
	}
}
