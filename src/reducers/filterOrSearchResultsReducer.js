import { FETCH_SEARCH_RESULTS, FETCH_FILTER_RESULTS, CLEAR_PREVIOUS_RESULTS } from '../actions/types'

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_SEARCH_RESULTS:
			return action.payload
		case FETCH_FILTER_RESULTS:
			return action.payload
		case CLEAR_PREVIOUS_RESULTS:
			return []
		default:
			return state
	}
}
