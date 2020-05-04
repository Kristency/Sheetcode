import { FETCH_SEARCH_RESULTS, FETCH_FILTER_RESULTS, CLEAR_PREVIOUS_RESULTS } from '../actions/types'

const NO_RESULTS = 'NO_RESULTS'
export default (state = [NO_RESULTS], action) => {
	switch (action.type) {
		case FETCH_SEARCH_RESULTS:
			if (action.payload.length === 0) {
				return [NO_RESULTS]
			}
			return action.payload
		case FETCH_FILTER_RESULTS:
			if (action.payload.length === 0) {
				return [NO_RESULTS]
			}
			return action.payload
		case CLEAR_PREVIOUS_RESULTS:
			return []
		default:
			return state
	}
}
