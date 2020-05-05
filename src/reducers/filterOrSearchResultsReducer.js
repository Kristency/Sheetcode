import cloneDeep from 'lodash/cloneDeep'

import {
	FETCH_SEARCH_RESULTS,
	FETCH_FILTER_RESULTS,
	CLEAR_PREVIOUS_RESULTS,
	ADD_SOLUTION_RESULTS_PAGE,
	UPDATE_QUESTION_DETAILS_RESULTS_PAGE
} from '../actions/types'

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

		case ADD_SOLUTION_RESULTS_PAGE: {
			let { _id, solution_link: link, user_column, user_name } = action.payload
			for (let question of state) {
				if (question._id === _id) {
					let flag = false
					for (let solution of question.solutions) {
						if (solution.user_column === user_column) {
							flag = true
							solution.link = link
						}
					}
					if (!flag) {
						question.solutions.push({ link, user_column, user_name })
					}
				}
			}

			return cloneDeep(state)
		}

		case UPDATE_QUESTION_DETAILS_RESULTS_PAGE: {
			let { _id, problem_link: link, name } = action.payload
			for (let question of state) {
				if (question._id === _id) {
					question.link = link
					question.name = name
				}
			}

			return cloneDeep(state)
		}

		case CLEAR_PREVIOUS_RESULTS:
			return []
		default:
			return state
	}
}
