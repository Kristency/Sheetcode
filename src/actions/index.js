import {
	FETCH_USERS,
	FETCH_QUESTIONS,
	ADD_QUESTION,
	ADD_SOLUTION,
	FETCH_SEARCH_RESULTS,
	FETCH_FILTER_RESULTS,
	UPDATE_ROW_RANGE,
	FETCH_QUESTION_COUNT,
	CLEAR_PREVIOUS_RESULTS,
	UPDATE_QUESTION_DETAILS,
} from './types'

import sheetcodeApi from '../apis/sheetcode-api'
import history from '../history'

export const fetchUsers = () => {
	return async (dispatch) => {
		const response = await sheetcodeApi.get('/users')
		dispatch({
			type: FETCH_USERS,
			payload: response.data,
		})
	}
}

export const fetchQuestions = () => {
	/* Calling action creator inside another action creator because I want the questionCount before I can
		fetch the questions, so dispatching the fetchQuestionCount() action creator first, then waiting until
		the state gets populated, then dispatching the fetchQuestions() action creator. */
	return async (dispatch, getState) => {
		if (!getState().rows.questionCount) {
			await dispatch(fetchQuestionCount())
		}
		const { startRow, endRow } = getState().rows
		const response = await sheetcodeApi.get(`/questions?start_row=${startRow}&end_row=${endRow}`)
		dispatch({
			type: FETCH_QUESTIONS,
			payload: response.data,
		})

		dispatch({
			type: UPDATE_ROW_RANGE,
		})
	}
}

export const fetchQuestionCount = () => {
	return async (dispatch) => {
		const response = await sheetcodeApi.get('/questions/count')
		dispatch({
			type: FETCH_QUESTION_COUNT,
			payload: response.data,
		})
	}
}

export const addQuestion = (formValues) => {
	return async (dispatch) => {
		const response = await sheetcodeApi.post('/questions', formValues)
		dispatch({
			type: ADD_QUESTION,
			payload: response.data,
		})
	}
}

export const addSolution = (formValues) => {
	return async (dispatch) => {
		await sheetcodeApi.patch('/questions/add_solution', formValues)
		dispatch({
			type: ADD_SOLUTION,
			payload: formValues,
		})
	}
}

export const updateQuestionDetails = (formValues) => {
	return async (dispatch) => {
		await sheetcodeApi.patch('/questions/update_question', formValues)
		dispatch({
			type: UPDATE_QUESTION_DETAILS,
			payload: formValues,
		})
	}
}

export const clearPreviousResults = () => {
	return {
		type: CLEAR_PREVIOUS_RESULTS,
	}
}

export const fetchSearchResults = (term) => {
	return async (dispatch) => {
		dispatch(clearPreviousResults())
		const response = await sheetcodeApi.get(`/search?search_query=${term}`)
		dispatch({
			type: FETCH_SEARCH_RESULTS,
			payload: response.data,
		})
		history.push('/results')
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
		const response = await sheetcodeApi.get(`/questions?${query_category}${query_difficulty}`)
		dispatch({
			type: FETCH_FILTER_RESULTS,
			payload: response.data,
		})
		history.push('/results')
	}
}
