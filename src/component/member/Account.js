import { useState } from "react"
import Api from "../../Api"


function Account(props) {
    const [inputs, setInputs] = useState('')
    const [errors, setErrors] = useState({})
    const [avatar, setAvatar] = useState('')
    const [files, setFiles] = useState('')
    // let navigate = useNavigate()
    let data = localStorage.getItem('data login')
    if (data) {
        data = JSON.parse(data)
    }
    let dataUser = data.Auth
    //Token
    let accessToken = data.success.token
    // config để gửi token API 
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
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
        if (inputs.name === undefined) {
            flag = false
            errorSubmit.name = 'vui lòng điền Name'
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
        const formData = new FormData()
        formData.append('name', inputs.name ? inputs.name : dataUser.name)
        formData.append('email', dataUser.email)
        if (inputs.password) {
            formData.append('password', inputs.password)
        }
        formData.append('phone', inputs.number ? inputs.number : dataUser.phone)
        formData.append('address', inputs.address ? inputs.address : dataUser.address)
        if (avatar) {
            formData.append('avatar', avatar)
        }
        Api.post("/user/update/" + dataUser.id, formData, config)
            .then(
                (res) => {
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        const succ = {
                            succ: res.data.response
                        }
                        setErrors(succ)
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
        <>
            <div className="col-sm-4">
                <div className="signup-form">
                    <h2>User Update!</h2>
                    {renderError()}
                    <form action="#" encType="multipart/form-data" onSubmit={hanldeSubmit} >
                        <input type="text" name="name" onChange={hanldeInput} placeholder={dataUser.name} />
                        <input type="email" name="email" readOnly onChange={hanldeInput} placeholder={dataUser.email} />
                        <input type="password" name="password" onChange={hanldeInput} />
                        <input type="tex" name="number" onChange={hanldeInput} placeholder={dataUser.phone} />
                        <input type="text" name="address" onChange={hanldeInput} placeholder={dataUser.address} />
                        <input type="file" name="avatar" placeholder="Avatar" onChange={hanldeUserInputFile} />
                        <button type="submit" className="btn btn-default" >Change</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Account