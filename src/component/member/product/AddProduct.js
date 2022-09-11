import { useEffect, useState } from "react"
import Api from "../../../Api"

function AddProduct() {
    const data = JSON.parse(localStorage.getItem("data login"))
    const [dataCategory, setDataCategory] = useState()
    const [dataBrand, setDataBrand] = useState()
    const [input, setInput] = useState("")
    const [avatar, setAvatar] = useState()
    const [errors, setErrors] = useState({})
    const [sale ,setSale] = useState()
    useEffect(() => {
        Api.get('/category-brand')
            .then(res => {
                setDataCategory(res.data.category)
                setDataBrand(res.data.brand)
            })
            .catch(error => console.log(error))
    }, [])
    function hanldeInput(e) {
        let nameInput = e.target.name
        let value = e.target.value
        setInput(state => ({ ...state, [nameInput]: value }))
    }
    function hanldeCategory() {
        if (dataCategory) {
            return dataCategory.map((value, key) => {
                return (
                    <option key={key} value={value.id} name={value.category}>{value.category}</option>
                )
            })
        }
    }
    function hanldeBrand() {
        if (dataBrand) {
            return dataBrand.map((value, key) => {
                return (
                    <option key={key} value={value.id} name={value.brand}>{value.brand}</option>
                )
            })
        }
    }
    function hanldeSale() {
        if (input) {
            if (input.status === 0) {
                return (<input type="number" name="sale" placeholder="0" onChange={e => hanldeInputSale(e)} />)
            }
        }
    }
    function hanldeInputSale(e) {
        setSale(e.target.value)
    }
    function hanldeUserInputFile(e) {
        const files = e.target.files
        setAvatar(files)
    }
    function hanldeSubmit(e) {
        e.preventDefault()
        let errorSubmit = {}
        let flag = true
        if (input.name === undefined) {
            flag = false
            errorSubmit.name = 'vui lòng điền Name'
        }
        if (input.price === undefined) {
            flag = false
            errorSubmit.price = 'vui lòng điền Price'
        }
        if (input.category === undefined) {
            flag = false
            errorSubmit.category = 'vui lòng chọn category'
        }
        if (input.brand === undefined) {
            flag = false
            errorSubmit.brand = 'vui lòng chọn brand'
        }
        if (input.status === undefined) {
            flag = false
            errorSubmit.status = 'vui lòng chọn status'
        } else if (input.status === 0) {
            if (sale === undefined) {
                flag = false
                errorSubmit.sale = 'vui lòng điền sale'
            }
        }
        if (input.company === undefined) {
            flag = false
            errorSubmit.Company = 'vui lòng điền company'
        }
        if (avatar === undefined) {
            flag = false
            errorSubmit.file = 'vui lòng nhập file này'
        } else {
            const fileExtention = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
            Object.keys(avatar).map((value, key) => {
                let str = avatar[value]['type']
                let duoiSize = avatar[value]['size']
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
                return null
            })
        }
        if (input.detail === undefined) {
            flag = false
            errorSubmit.Detail = 'vui lòng điền Detail'
        }
        if (!flag) {
            setErrors(errorSubmit)
        }
        //Token
        let accessToken = data.success.token
        // config để gửi token API 
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        }
        let formData = new FormData()
                formData.append('name', input.name)
                formData.append('category', input.category)
                formData.append('brand', input.brand)
                formData.append('price', input.price)
                formData.append('status', input.status)
                if(input.status === 0) {
                    formData.append('sale', sale)
                }
                formData.append('detail', input.detail)
                formData.append('company', input.company)
                Object.keys(avatar).map((item, i) => {
                    formData.append('file[]', avatar[item])
                    return null
                })
        Api.post("/user/add-product", formData, config)
            .then()
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
            <div className="signup-form">
                <h2>New User Create Product</h2>
                {renderError()}
                <form action="#" encType="multipart/form-data" onSubmit={e => hanldeSubmit(e)}>
                    <input type="text" name="name" placeholder="Name" onChange={e => hanldeInput(e)} />
                    <input type="number" name="price" placeholder="Price" onChange={e => hanldeInput(e)} />
                    <select name="category" id="category" onChange={e => hanldeInput(e)} >
                        <option value="">Please choose category</option>
                        {hanldeCategory()}
                    </select>
                    <select name="brand" id="brand" onChange={e => hanldeInput(e)} >
                        <option value="">Please choose brand</option>
                        {hanldeBrand()}
                    </select>
                    <select name="status" id="status" onChange={e => hanldeInput(e)} >
                        <option value="">Please choose status</option>
                        <option value="1">New</option>
                        <option value="0">Sale</option>
                    </select>
                    {hanldeSale()}
                    <input type="text" name="company" placeholder="Company profile" onChange={e => hanldeInput(e)} />
                    <input type="file" name="avatar" placeholder="Avatar" multiple onChange={e => hanldeUserInputFile(e)} />
                    <textarea type="text" name="detail" placeholder="Detail" onChange={e => hanldeInput(e)}/>
                    <button type="submit" className="btn btn-default" >ADD</button>
                </form>
            </div>
        </div>
    )
}
export default AddProduct