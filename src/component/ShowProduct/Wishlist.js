import { useContext, useState } from "react"
import { useEffect } from "react"
import Api from "../../Api"
import { UserContext } from "../../UserContext"

function Wishlist() {
    const [data, setData] = useState()
    let count = 0
    let wishlist = JSON.parse(localStorage.getItem("wishlist"))
    const datas = useContext(UserContext)
    useEffect(() => {
        Api.get('product/wishlist')
            .then(res => {
                setData(res.data.data)
            })
    }, [])
    count = wishlist.length
    datas.countWish(count)
    function handleDelete(e) {
        e.preventDefault()
        let newData = [...data]
        let id = e.target.id
        wishlist.splice(wishlist.indexOf(id), 1)
        newData.map((value) => {
            if (value.id === id) {
                newData.splice(newData.indexOf(value), 1)
            }
            return null
        })
        setData(newData)
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
    function renderWishlist() {
        if (data) {
            return data.map((value, key) => {
                let str = value['image']
                let img = JSON.parse(str)
                let stringnum = value.id.toString()
                if (wishlist) {
                    if (wishlist.includes(stringnum)) {
                        return (
                            <div key={key} className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src={'http://localhost/laravel/laravel/public/upload/user/product/' + value.id_user + '/' + img[0]} alt="" />
                                            <h2>{value.price + "  VNĐ"}</h2>
                                            <p>{value.name}</p>
                                            <a href="/#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                        </div>
                                        <div className="product-overlay">
                                            <div className="overlay-content">
                                                <h2>{value.price + "  VNĐ"}</h2>
                                                <p>{value.name}</p>
                                                <a href="/#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="choose">
                                        <ul className="nav nav-pills nav-justified">
                                            <li><a href="/#" id={value.id} onClick={e => handleDelete(e)}><i className="fa fa-plus-square"></i>Remove to wishlist</a></li>
                                            <li><a href="/#"><i className="fa fa-plus-square"></i>More</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
                return null
            })
        }
    }
    return (
        <div className="col-sm-9 padding-right">
            <div className="features_items">
                <h2 className="title text-center">Wish List</h2>
                {renderWishlist()}
            </div>
        </div>
    )
}
export default Wishlist