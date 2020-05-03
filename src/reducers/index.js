import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import questionReducer from './questionReducer'
import authReducer from './authReducer'
import rowReducer from './rowReducer'
import filterOrSearchResultsReducer from './filterOrSearchResultsReducer'
import errorReducer from './errorReducer'

export default combineReducers({
	auth: authReducer,
	questions: questionReducer,
	rows: rowReducer,
	filterOrSearchResults: filterOrSearchResultsReducer,
	form: formReducer,
	error: errorReducer
})
