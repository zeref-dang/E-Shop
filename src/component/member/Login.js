import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../../Api"

function Login() {
	const [inputs, setInputs] = useState('')
	const [errors, setErrors] = useState({})
	const navigate = useNavigate()
	function hanldeInput(e) {
		const nameInput = e.target.name
		const value = e.target.value
		setInputs(state => ({ ...state, [nameInput]: value }))
	}
	function hanldeSubmit(e) {
		e.preventDefault()
		let errorSubmit = {}
		let flag = true
		const data = {
			email: inputs.email,
			password: inputs.password,
			level: 0
		}
		const regex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
		if (!regex.test(inputs.email)) {
			flag = false
			errorSubmit.email = 'vui lòng nhập email'
		}
		if (inputs.password === undefined) {
			flag = false
			errorSubmit.password = 'vui lòng nhập password'
		}
		if (!flag) {
			setErrors(errorSubmit)
		}
		Api.post('/login', data)
			.then(
				(res) => {
					if (res.data.errors) {
						setErrors(res.data.errors)
					}
					else {
						setErrors(res.data.response)
						const data_login = res.data
						localStorage.setItem('data login', JSON.stringify(data_login))
						navigate('/')
					}
				}
			)
	}
	function renderError() {
		if (Object.keys(errors).length > 0) {
			return (
				<div className="alert alert-danger">
					<ul>
						{Object.keys(errors).map((key, index) => {
							return (
								<li key={index}>{errors[key]}</li>
							)
						})}
					</ul>
				</div>
			)
		}
	}
	return (
		<div className="col-sm-4">
			<div className="login-form">
				<h2>Login to your account</h2>
				{renderError()}
				<form action="#" onSubmit={hanldeSubmit}>
					<input type="email" placeholder="Email Address" name="email" onChange={hanldeInput} />
					<input type="Password" placeholder="Password" name="password" onChange={hanldeInput} />
					<input type="number" value='0' placeholder="level" name="level" onChange={hanldeInput} />
					<span>
						<input type="checkbox" className="checkbox" />
						Keep me signed in
					</span>
					<button type="submit" className="btn btn-default">Login</button>
				</form>
			</div>
		</div>
	)
}
export default Login