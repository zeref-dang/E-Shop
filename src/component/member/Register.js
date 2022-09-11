import { useState } from "react"
import Api from "../../Api"

function Regiester() {
    const [inputs, setInputs] = useState('')
    const [errors, setErrors] = useState({})
    const [avatar, setAvatar] = useState('')
    const [files, setFiles] = useState('')
    const [succ, setSucc] = useState()
    const hanldeInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    function hanldeUserInputFile(e) {
        const file = e.target.files
        //Gửi file cho API
        let render = new FileReader()
        render.onload = (e) => {
            setAvatar(e.target.result)
            setFiles(file[0])
        }
        render.readAsDataURL(file[0])
    }
    const hanldeSubmit = (e) => {
        e.preventDefault()
        let errorSubmit = {}
        let flag = true
        const data = {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
            phone: inputs.number,
            address: inputs.address,
            level: 0,
            avatar: avatar
        }
        if (inputs.name === undefined) {
            flag = false
            errorSubmit.name = 'vui lòng điền Name'
        }
        const regex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
        if (!regex.test(inputs.email)) {
            flag = false
            errorSubmit.email = 'vui lòng điền Email'
        }
        if (inputs.password === undefined) {
            flag = false
            errorSubmit.password = 'vui lòng điền Password'
        }
        if (inputs.number === undefined) {
            flag = false
            errorSubmit.number = 'vui lòng điền Number'
        }
        if (inputs.address === undefined) {
            flag = false
            errorSubmit.address = 'vui lòng điền Address'
        }
        if (files === "") {
            flag = false
            errorSubmit.file = 'vui lòng nhập file này'
        } else {
            const fileExtention = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
            let str = files['type']
            let duoiSize = files['size']
            let test = str.split('/')
            let valueDuoiFile = test[1]
            for (var i = 0; i < fileExtention.length; ++i) {
                if (valueDuoiFile === fileExtention[i]) {
                    break
                } else {
                    flag = false
                    errorSubmit.checkfile = 'file này không phải ảnh'
                }
            }
            if (duoiSize > 1024 * 1024) {
                flag = false
                errorSubmit.checksizefile = 'file này > 1mb'
            }
        }
        if (!flag) {
            setErrors(errorSubmit)
        }
        Api.post("/register", data)
            .then(
                (res) => {
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        const succ = {
                            succ: res.data.message,
                            name: 'name: ' + res.data[0].name,
                            email: 'email: ' + res.data[0].email,
                            phone: 'phone: ' + res.data[0].phone
                        }
                        setSucc(succ)
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
    function renderSucc() {
        if (succ) {
            return (
                <div className="alert alert-success">
                    <ul>
                        {Object.keys(succ).map((key) => {
                            return (
                                <li key={key}>{succ[key]}</li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
    }
    return (
        <div className="col-sm-4">
            <div className="signup-form">
                <h2>New User Signup!</h2>
                {renderError()}
                {renderSucc()}
                <form action="#" encType="multipart/form-data" onSubmit={hanldeSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={hanldeInput} />
                    <input type="email" name="email" placeholder="Email Address" onChange={hanldeInput} />
                    <input type="password" name="password" placeholder="Password" onChange={hanldeInput} />
                    <input type="number" name="number" placeholder="Phone Number" onChange={hanldeInput} />
                    <input type="text" name="address" placeholder="Address" onChange={hanldeInput} />
                    <input type="file" name="avatar" placeholder="Avatar" onChange={hanldeUserInputFile} />
                    <input type="number" name="level" defaultValue='0' placeholder="Level" />
                    <button type="submit" className="btn btn-default" >Signup</button>
                </form>

            </div>
        </div>
    )
}
export default Regiester