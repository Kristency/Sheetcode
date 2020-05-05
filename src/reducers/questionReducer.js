import mapKeys from 'lodash/mapKeys'
import cloneDeep from 'lodash/cloneDeep'

import { FETCH_QUESTIONS, ADD_QUESTION, ADD_SOLUTION, UPDATE_QUESTION_DETAILS } from '../actions/types'

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_QUESTIONS:
			return { ...state, ...mapKeys(action.payload, '_id') }

		case ADD_QUESTION:
			if (action.payload._id in state) {
				// Object.assign() doesn't do deep copy, it only does shallow copy
				Object.assign(state[action.payload._id], action.payload)
				return cloneDeep(state)
			}

			return { ...state, [action.payload._id]: action.payload }

		case ADD_SOLUTION: {
			let { _id, solution_link: link, user_column, user_name } = action.payload
			if (_id in state) {
				let flag = false
				for (let solution of state[_id].solutions) {
					if (solution.user_column === user_column) {
						flag = true
						solution.link = link
					}
				}
				if (!flag) {
					state[_id].solutions.push({ link, user_column, user_name })
				}
			}

			return cloneDeep(state)
		}

		case UPDATE_QUESTION_DETAILS: {
			let { _id, problem_link: link, name } = action.payload
			if (_id in state) {
				state[_id].link = link
				state[_id].name = name
			}

			return cloneDeep(state)
		}

		default:
			return state
	}
}
