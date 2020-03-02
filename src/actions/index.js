import { FETCH_USERS, FETCH_QUESTIONS, ADD_QUESTION, ADD_SOLUTION } from './types'

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
