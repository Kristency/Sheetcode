import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import questionReducer from './questionReducer'
import userReducer from './userReducer'
import filterOrSearchResultsReducer from './filterOrSearchResultsReducer'

export default combineReducers({
	questions: questionReducer,
	filterOrSearchResults: filterOrSearchResultsReducer,
	users: userReducer,
	form: formReducer
})
