import _ from 'lodash'

import { FETCH_QUESTIONS, ADD_QUESTION, ADD_SOLUTION } from '../actions/types'

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_QUESTIONS:
			return { ...state, ..._.mapKeys(action.payload, '_id') }
		case ADD_QUESTION:
			if (action.payload._id in state) {
				Object.assign(state[action.payload._id], action.payload)
				return { ...state }
			}

			return { ...state, [action.payload._id]: action.payload }
		case ADD_SOLUTION:
			let { _id, solution_link: link, user_column } = action.payload
			for (let solution of state[_id].solutions) {
				if (solution.user_column === user_column) {
					solution.link = link
					return { ...state }
				}
			}

			state[_id].solutions.push({ link, user_column })
			return { ...state }

		default:
			return state
	}
}
