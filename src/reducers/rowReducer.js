import { UPDATE_ROW_RANGE, FETCH_QUESTION_COUNT } from '../actions/types'

export default (state = { questionCount: null, startRow: null, endRow: null }, action) => {
	switch (action.type) {
		case UPDATE_ROW_RANGE:
			return { ...state, startRow: state.startRow - 20, endRow: state.startRow }
		case FETCH_QUESTION_COUNT:
			return { ...state, questionCount: action.payload, startRow: action.payload - 20, endRow: action.payload }
		default:
			return state
	}
}
