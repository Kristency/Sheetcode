import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import questionReducer from './questionReducer'
import userReducer from './userReducer'
import rowReducer from './rowReducer'
import filterOrSearchResultsReducer from './filterOrSearchResultsReducer'

export default combineReducers({
	questions: questionReducer,
	rows: rowReducer,
	filterOrSearchResults: filterOrSearchResultsReducer,
	users: userReducer,
	form: formReducer
})
