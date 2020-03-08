import { FETCH_QUESTION_COUNT } from '../actions/types'

export default (state = null, action) => {
	switch (action.type) {
		case FETCH_QUESTION_COUNT:
			return action.payload
		default:
			return state
	}
}
