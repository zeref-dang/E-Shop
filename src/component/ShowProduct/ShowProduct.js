import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Api from "../../Api"
import { UserContext } from "../../UserContext"

function ShowProduct(props) {
    let ObjCha = JSON.parse(localStorage.getItem("thongtin")) || {}
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    const data = useContext(UserContext)
    const [product, setProduct] = useState()
    useEffect(() => {
        Api.get('/product')
            .then(res => {
                setProduct(res.data.data)
            })
    }, [])
    function handleAddToCart(e) {
        let count = 0
        let id = e.target.id
        let ObjCon = {
            id: id,
            qty: 1
        }
        if (ObjCha[id]) {
            if (ObjCha[id]['id'] === ObjCon['id']) {
                ObjCon['qty'] = ObjCha[id]['qty'] + 1
            }
        }
        ObjCha[id] = ObjCon
        Object.keys(ObjCha).map((key, value) => (
            count += ObjCha[key]['qty']
        ))
        data.countCart(count)
        localStorage.setItem("thongtin", JSON.stringify(ObjCha))
    }
    function AddWishList(e) {
        let dem = data.dem || JSON.parse(localStorage.getItem('dem')) || 0
        let id = e.target.id
        if(wishlist) {
            if (!wishlist.includes(id)) {
                wishlist.push(id)
                dem += 1
            }
        }
        data.countWish(dem)
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
    function RenderProduct() {
        if (product) {
            return product.map((value, key) => {
                let str = value['image']
                let img = JSON.parse(str)
                return (
                    <div className="col-sm-4" key = {key}>
                        <div className="product-image-wrapper" id={"Product" + value.id}>
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={'http://localhost/laravel/laravel/public/upload/user/product/' + value.id_user + '/' + img[0]} alt="" />
                                    <h2>{value.price}</h2>
                                    <p>{value.name}</p>
                                    <a href="/#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <h2>{value.price}</h2>
                                        <p>{value.name}</p>
                                        <a href="/#" id={value.id} className="btn btn-default add-to-cart add" data-toggle="modal" data-target="#myModal" onClick={e => handleAddToCart(e)}><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <li><Link to={"/Product/ProductDetail/" + value.id}><i className="fa fa-plus-square"></i>More</Link></li>
                                    <li><a href="/#" id={value.id} onClick={e => AddWishList(e)}><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div className="col-sm-9 padding-right">
            <div className="features_items">
                <h2 className="title text-center">Features Items</h2>
                {RenderProduct()}
            </div>
        </div>
    )
}
export default ShowProduct