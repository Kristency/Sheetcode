import React, { Component } from 'react'

class DarkModeButton extends Component {
	componentDidMount() {
		const presentTheme = localStorage.getItem('theme')
		if (presentTheme && presentTheme === 'dark') {
			document.querySelector('.custom-switch input[type="checkbox"]').checked = true
		}
	}

	onThemeChange(event) {
		if (event.target.checked) {
			document.body.classList.add('bootstrap-dark')
			localStorage.setItem('theme', 'dark')
		} else {
			document.body.classList.remove('bootstrap-dark')
			localStorage.setItem('theme', 'normal')
		}
	}

	render() {
		return (
			<div className="custom-control custom-switch ml-3">
				<input type="checkbox" className="custom-control-input" id="customSwitch1" onChange={this.onThemeChange} />
				<label className="custom-control-label" htmlFor="customSwitch1">
					Dark Mode
				</label>
			</div>
		)
	}
}

export default DarkModeButton
