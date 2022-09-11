import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import Api from "../../../Api"

function EditProduct() {
    const data = JSON.parse(localStorage.getItem("data login"))
    let params = useParams()
    let array = []
    let soanhco
    let soanhxoa = 0
    let soanhthem
    const [product, setProduct] = useState('')
    const [dataCategory, setDataCategory] = useState()
    const [dataBrand, setDataBrand] = useState()
    const [avatar, setAvatar] = useState()
    const [input, setInput] = useState("")
    const [sale, setSale] = useState()
    const [errors, setErrors] = useState({})
    //Token
    let accessToken = data.success.token
    // config để gửi token API 
    
    let config = useMemo(() => {
        let x = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        }
        return x
    }, [accessToken])
    useEffect(() => {
        Api.get('user/product/' + params.id, config)
            .then(res => {
                setProduct(res.data.data)
            })
    }, [params.id, config])
    useEffect(() => {
        Api.get('/category-brand')
            .then(res => {
                setDataCategory(res.data.category)
                setDataBrand(res.data.brand)
            })
            .catch(error => console.log(error))
    }, [])
    function hanldeCategory() {
        if (dataCategory) {
            return dataCategory.map((value, key) => {
                if (product) {
                    if (product.id_category === value.id) {
                        return (
                            <option key={key} value={value.id} selected name={value.category}>{value.category}</option>
                        )
                    } else {
                        return (
                            <option key={key} value={value.id} name={value.category}>{value.category}</option>
                        )
                    }
                }
                return null
            })
        }
    }
    function hanldeBrand() {
        if (dataBrand) {
            return dataBrand.map((value, key) => {
                if (product) {
                    if (product.id_brand === value.id) {
                        return (
                            <option key={key} value={value.id} selected name={value.brand}>{value.brand}</option>
                        )
                    } else {
                        return (
                            <option key={key} value={value.id} name={value.brand}>{value.brand}</option>
                        )
                    }
                }
                return null
            })
        }
    }
    function hanldeInput(e) {
        let nameInput = e.target.name
        let value = e.target.value
        setInput(state => ({ ...state, [nameInput]: value }))
    }
    function hanldeUserInputFile(e) {
        const files = e.target.files
        setAvatar(files)
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
    function handleCheckBox(e) {
        let check = e.target.checked
        let value = e.target.value
        if (check) {
            array.push(value)
        } else {
            array.splice(array.indexOf(value), 1);
        }
        soanhxoa = array.length
    }
    function renderImg() {
        if (product) {
            let img = product.image
            soanhco = img.length
            return img.map((value, key) => {
                return (
                    <div key = {key} className="" style={{ position: 'relative', display: 'inline-block' }}>
                        <img className="imageProduct" style={{ width: '80px', height: '80px', margin: '10px' }} src={"http://localhost/laravel/laravel/public/upload/user/product/" + data.Auth.id + '/' + value} alt="" />
                        <input type="checkbox" name="image_delete[]" style={{ position: 'absolute', top: '13px', right: '13px', width: '15px', height: '15px' }} value={value} onChange={e => handleCheckBox(e)} />
                    </div>
                )
            })
        }
    }
    function hanldeSubmit(e) {
        e.preventDefault()
        let errorSubmit = {}
        let flag = true
        if (avatar === undefined) {
            flag = false
            errorSubmit.file = 'vui lòng nhập file này'
        } else {
            soanhthem = avatar.length
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

                if (soanhco - soanhxoa + soanhthem > 3) {
                    flag = false
                    errorSubmit.checkslfile = 'số lượng ảnh lớn hơn 3'
                }
                return null
            })
        }
        if (!flag) {
            setErrors(errorSubmit)
        } else {
            let formData = new FormData()
            formData.append('name', input.name ? input.name : product.name)
            formData.append('category', input.category ? input.category : product.id_category)
            formData.append('brand', input.brand ? input.brand : product.id_brand)
            formData.append('price', input.price ? input.price : product.price)
            formData.append('status', input.status ? input.status : product.status)
            if (input.status === 0) {
                formData.append('sale', sale ? sale : product.sale)
            }
            formData.append('detail', input.detail ? input.detail : product.detail)
            formData.append('company', input.company ? input.company : product.company_profile)
            if (avatar) {
                Object.keys(avatar).map((item, i) => {
                    formData.append('file[]', avatar[item])
                    return null
                })
            }
            if (array) {
                array.map((i, item) => {
                    formData.append('avatarCheckBox[]', array[item])
                    return null
                })
            }
            Api.post("user/edit-product/" + product.id, formData, config)
                .then()
        }
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
                <h2>Update User Product</h2>
                {renderError()}
                <form action="#" encType="multipart/form-data">
                    <input type="text" name="name" placeholder={product.name} onChange={e => hanldeInput(e)} />
                    <input type="number" name="price" placeholder={product.price} onChange={e => hanldeInput(e)} />
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
                    <input type="text" name="company" placeholder={product.company_profile} onChange={e => hanldeInput(e)} />
                    <input type="file" name="avatar" multiple onChange={e => hanldeUserInputFile(e)} />
                    <div className="view-product">
                        <h4>Choose image you want to delete</h4>
                        {renderImg()}
                    </div>
                    <textarea type="text" name="detail" placeholder={product.detail} onChange={e => hanldeInput(e)} />
                    <button type="submit" className="btn btn-default" onClick={e => { hanldeSubmit(e) }}>Change</button>
                </form>

            </div>
        </div>
    )
}
export default EditProduct