import {
	SIGN_IN,
	SIGN_OUT,
	FETCH_QUESTIONS,
	ADD_QUESTION,
	ADD_SOLUTION,
	FETCH_SEARCH_RESULTS,
	FETCH_FILTER_RESULTS,
	UPDATE_ROW_RANGE,
	FETCH_QUESTION_COUNT,
	CLEAR_PREVIOUS_RESULTS,
	UPDATE_QUESTION_DETAILS,
	ERROR
} from './types'

import sheetcodeApi from '../apis/sheetcode-api'
import history from '../history'

export const SignIn = (email) => {
	return async (dispatch) => {
		try {
			const response = await sheetcodeApi.get(`/user?email=${email}`)
			if (!response.data) {
				dispatch({
					type: ERROR,
					payload: `You don't have write access to this site.`
				})
				history.push('/error')
			} else {
				dispatch({
					type: SIGN_IN,
					payload: response.data
				})
			}
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}
	}
}

export const SignOut = () => {
	return {
		type: SIGN_OUT
	}
}

export const fetchQuestions = () => {
	/* Calling action creator inside another action creator because I want the questionCount before I can
		fetch the questions, so dispatching the fetchQuestionCount() action creator first, then waiting until
		the state gets populated, then dispatching the fetchQuestions() action creator. */
	return async (dispatch, getState) => {
		let response = null,
			init_question_count = false

		try {
			if (!getState().rows.questionCount) {
				init_question_count = true
				response = await sheetcodeApi.get(`/questions?init_question_count=${init_question_count}`)
				dispatch({
					type: FETCH_QUESTION_COUNT,
					payload: response.data.questionCount
				})
			} else {
				const { startRow, endRow } = getState().rows

				response = await sheetcodeApi.get(`/questions?start_row=${startRow}&end_row=${endRow}`)
			}
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}

		dispatch({
			type: FETCH_QUESTIONS,
			payload: init_question_count ? response.data.questions : response.data
		})

		dispatch({
			type: UPDATE_ROW_RANGE
		})
	}
}

export const addQuestion = (formValues) => {
	return async (dispatch, getState) => {
		const { name, _id } = getState().auth
		formValues['user_name'] = name
		formValues['user_column'] = _id
		try {
			const response = await sheetcodeApi.post('/questions', formValues)
			dispatch({
				type: ADD_QUESTION,
				payload: response.data
			})
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}
	}
}

export const addSolution = (formValues) => {
	return async (dispatch, getState) => {
		const { name, _id } = getState().auth
		formValues['user_name'] = name
		formValues['user_column'] = _id
		try {
			await sheetcodeApi.patch('/questions/add_solution', formValues)
			dispatch({
				type: ADD_SOLUTION,
				payload: formValues
			})
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}
	}
}

export const updateQuestionDetails = (formValues) => {
	return async (dispatch) => {
		try {
			await sheetcodeApi.patch('/questions/update_question', formValues)
			dispatch({
				type: UPDATE_QUESTION_DETAILS,
				payload: formValues
			})
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}
	}
}

export const clearPreviousResults = () => {
	return {
		type: CLEAR_PREVIOUS_RESULTS
	}
}

export const fetchSearchResults = (term) => {
	return async (dispatch) => {
		dispatch(clearPreviousResults())
		try {
			const response = await sheetcodeApi.get(`/search?search_query=${term}`)
			dispatch({
				type: FETCH_SEARCH_RESULTS,
				payload: response.data
			})
			history.push('/results')
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}
	}
}

export const fetchFilterResults = (formValues) => {
	let query_category = 'category' in formValues && formValues.category !== 'All' ? `category=${formValues.category}` : ``
	let query_difficulty = 'difficulty' in formValues && formValues.difficulty !== 'All' ? `&difficulty=${formValues.difficulty}` : ``

	return async (dispatch) => {
		/* Actions are dispatched synchronously so Redux guarantees the store has received the next state before 
		accepting the next action. Because clearPreviousResults is synchronous, any action dispatched from asynchronous
		fetchFilterResults is guaranteed to happen after it. */
		dispatch(clearPreviousResults())
		try {
			const response = await sheetcodeApi.get(`/questions?${query_category}${query_difficulty}`)
			dispatch({
				type: FETCH_FILTER_RESULTS,
				payload: response.data
			})
			history.push('/results')
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}
	}
}
