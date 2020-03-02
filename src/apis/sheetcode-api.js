import axios from 'axios'

export default axios.create({
	baseURL: 'https://sheetcode-api.herokuapp.com/'
	// baseURL: 'http://localhost:8080/'
})
