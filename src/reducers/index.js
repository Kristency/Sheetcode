import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import questionReducer from './questionReducer'
import userReducer from './userReducer'

export default combineReducers({
	questions: questionReducer,
	users: userReducer,
	form: formReducer
})
