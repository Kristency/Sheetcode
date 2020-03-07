import { FETCH_USERS, FETCH_QUESTIONS, ADD_QUESTION, ADD_SOLUTION, FETCH_SEARCH_RESULTS, FETCH_FILTER_RESULTS } from './types'

import sheetcodeApi from '../apis/sheetcode-api'
import history from '../history'

export const fetchUsers = () => {
	return async dispatch => {
		const response = await sheetcodeApi.get('/users')
		dispatch({
			type: FETCH_USERS,
			payload: response.data
		})
	}
}

export const fetchQuestions = () => {
	return async dispatch => {
		const response = await sheetcodeApi.get('/questions')
		dispatch({
			type: FETCH_QUESTIONS,
			payload: response.data
		})
	}
}

export const addQuestion = formValues => {
	return async dispatch => {
		const response = await sheetcodeApi.post('/questions', formValues)
		dispatch({
			type: ADD_QUESTION,
			payload: response.data
		})
	}
}

export const addSolution = formValues => {
	return async dispatch => {
		await sheetcodeApi.patch('/questions', formValues)
		dispatch({
			type: ADD_SOLUTION,
			payload: formValues
		})
	}
}

export const fetchSearchResults = term => {
	return async dispatch => {
		const response = await sheetcodeApi.get(`/search?search_query=${term}`)
		dispatch({
			type: FETCH_SEARCH_RESULTS,
			payload: response.data
		})
		history.push('/results')
	}
}

export const fetchFilterResults = formValues => {
	let query_category = 'category' in formValues ? `category=${formValues.category}` : ``
	let query_difficulty = 'difficulty' in formValues && formValues.difficulty !== 'All' ? `&difficulty=${formValues.difficulty}` : ``

	return async dispatch => {
		const response = await sheetcodeApi.get(`/questions?${query_category}${query_difficulty}`)
		dispatch({
			type: FETCH_FILTER_RESULTS,
			payload: response.data
		})
		history.push('/results')
	}
}
