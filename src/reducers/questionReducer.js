import _ from 'lodash'

import { FETCH_QUESTIONS, ADD_QUESTION, ADD_SOLUTION } from '../actions/types'

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_QUESTIONS:
			return { ...state, ..._.mapKeys(action.payload, 'row') }
		case ADD_QUESTION:
			if (action.payload.row in state) {
				Object.assign(state[action.payload.row], action.payload)
				return { ...state }
			}

			return { ...state, [action.payload.row]: action.payload }
		case ADD_SOLUTION:
			let { row, solution_link: link, user_column } = action.payload
			for (let solution of state[row].solutions) {
				if (solution.user_column === user_column) {
					solution.link = link
					return { ...state }
				}
			}

			state[row].solutions.push({ link, user_column })
			return { ...state }

		default:
			return state
	}
}
