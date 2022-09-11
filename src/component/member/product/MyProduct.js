import { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import Api from "../../../Api"

function MyProduct() {
    const data = JSON.parse(localStorage.getItem("data login"))
    const [product, setProduct] = useState()
    const [error, setError] = useState()
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
        Api.get('user/my-product', config)
            .then(res => {
                setProduct(res.data.data)
            })
            .catch(error => {
                setError(error)
            })
    }, [config])
    function handleDelete(e) {
        e.preventDefault()
        let id = e.target.id
        Api.get('user/delete-product/' + id, config)
            .then(res => {
                setProduct(res.data.data)
            })
            .catch(error => {
                setError(error)
            })
    }
    function renderMyProduct() {
        if (product) {
            return Object.keys(product).map((value, key) => {
                let str = product[value]['image']
                let img = JSON.parse(str)
                return (
                    <tr key = {key}>
                        <td>{product[value]['id']}</td>
                        <td>{product[value]['name']}</td>
                        <td><img style={{ width: '30px', height: '30px' }} src={'http://localhost/laravel/laravel/public/upload/user/product/' + data.Auth.id + '/' + img[0]} alt =""/></td>
                        <td>{product[value]['price']}</td>
                        <td><Link style={{ cursor: 'pointer', }} to={'/Account/EditProduct/' + product[value]['id']}>Edit</Link></td>
                        <td><a href="/#" id={product[value]['id']} style={{ cursor: 'pointer', }} onClick={e => handleDelete(e)}>Delete</a></td>
                    </tr>
                )
            })
        }
    }
    return (
        <div className="col-sm-9">
            <table className="table text-center">
                <thead style={{ backgroundColor: '#FE980F', fontWeight: "bold" }}>
                    <tr>
                        <td>id</td>
                        <td>Name</td>
                        <td>Image</td>
                        <td>Price</td>
                        <td colSpan="2">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {error}
                    {renderMyProduct()}
                </tbody>
            </table>
            <Link type="submit" style={{
                background: '#FE980F',
                border: 'medium none',
                borderRadius: '0',
                color: '#FFFFFF',
                display: 'block',
                fontFamily: 'Roboto',
                float: 'right',
                padding: '6px 25px',
            }} className="btn btn-default" to='/Account/AddProduct'>Add Product</Link>
        </div>
    )
}
export default MyProduct