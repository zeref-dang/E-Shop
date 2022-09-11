import { useContext, useEffect, useState } from "react";
import Api from "../../Api";
import { UserContext } from "../../UserContext"

function Cart() {
    let data = JSON.parse(localStorage.getItem("thongtin"))
    let Obj = {}
    let sum = 0
    let tax = 2
    let ship = 0
    
    const datas = useContext(UserContext)
    const [product, setProduct] = useState([])
    let dem = datas.count || JSON.parse(localStorage.getItem('count')) || 0
    if (data) {
        Object.keys(data).map((key, value) => {
            Obj[data[key]['id']] = data[key]['qty']
            return null
        })
    }
    useEffect(() => {
        Api.post("/product/cart", Obj)
            .then(res => {
                setProduct(res.data.data)
            })
    }, [])
    function handlePlus(e) {
        e.preventDefault()
        let id = e.target.id
        let xx = [...product];
        xx.map((value, key) => {
            if (value.id === id) {
                value.qty += 1
            }
            return null
        })
        setProduct(xx)
        let ObjCon = {
            id: id,
            qty: 1
        }
        ObjCon['qty'] = data[id]["qty"] + 1
        data[id] = ObjCon
        localStorage.setItem("thongtin", JSON.stringify(data))
        let yy = dem + 1
        datas.countCart(yy)
        localStorage.setItem("count", JSON.stringify(yy))
    }
    function handleMinus(e) {
        e.preventDefault()
        let id = e.target.id
        let title = e.target.title
        let xx = [...product];
        let ObjCon = {
            id: id,
            qty: 1
        }
        let yy
        if (title > 1) {
            xx.map((value, key) => {
                if (value.id === id) {
                    value.qty -= 1
                }
                return null
            })
            setProduct(xx)
            ObjCon['qty'] = data[id]["qty"] - 1
            data[id] = ObjCon
            localStorage.setItem("thongtin", JSON.stringify(data))
            yy = dem - 1
            datas.countCart(yy)
            localStorage.setItem("count", JSON.stringify(yy))
        } else {
            let yy
            xx.map((value, key) => {
                if (value.id === id) {
                    xx.splice(xx.indexOf(value), 1)
                }
                return null
            })
            setProduct(xx)
            delete data[id]
            localStorage.setItem("thongtin", JSON.stringify(data))
            yy = dem - 1
            datas.countCart(yy)
            localStorage.setItem("count", JSON.stringify(yy))
        }

    }
    function handleDelete(e) {
        e.preventDefault()
        let id = e.target.id
        let qty = e.target.title
        let yy = [...product];
        let zz
        yy.map((value, key) => {
            if (value.id === id) {
                yy.splice(yy.indexOf(value), 1)
            }
            return null
        })
        setProduct(yy)
        delete data[id]
        localStorage.setItem("thongtin", JSON.stringify(data))
        zz = dem - qty
        datas.countCart(zz)
        localStorage.setItem("count", JSON.stringify(yy))
    }
    function renderCart() {
        return product.map((value, key) => {
            let image = JSON.parse(value.image)
            sum += value.qty * value.price
            return (
                <tr key ={key}>
                    <td className="cart_product">
                        <a href="/#"><img src={'http://localhost/laravel/laravel/public/upload/user/product/' + value.id_user + '/' + image[0]} alt="" /></a>
                    </td>
                    <td className="cart_description">
                        <h4><a href="/#">{value.name}</a></h4>
                        <p>Web ID: 1089772</p>
                    </td>
                    <td className="cart_price">
                        <p>{value.price}</p>
                    </td>
                    <td className="cart_quantity">
                        <div className="cart_quantity_button">
                            <a className="cart_quantity_up" href="/#" id={value.id} title={value.qty} onClick={e => handlePlus(e)}> + </a>
                            <input className="cart_quantity_input" type="text" name="quantity" defaultValue={value.qty} autoomplete="off" size="2" />
                            <a className="cart_quantity_down" href="/#" id={value.id} title={value.qty} onClick={e => handleMinus(e)}> - </a>
                        </div>
                    </td>
                    <td className="cart_total">
                        <p className="cart_total_price">{value.qty * value.price}</p>
                    </td>
                    <td className="cart_delete">
                        <a href="/#" className="cart_quantity_delete" id={value.id} title={value.qty} onClick={e => handleDelete(e)}>delete</a>
                    </td>
                </tr>
            )
        })
    }
    function renderSum() {
        return (
            <div className="total_area">
                <ul>
                    <li>Cart Sub Total <span>{sum}</span></li>
                    <li>Eco Tax <span>{'$' + tax}</span></li>
                    <li>Shipping Cost <span>{ship ? ship : 'Free'}</span></li>
                    <li>Total <span>{sum + tax + ship}</span></li>
                </ul>
                <a className="btn btn-default update" href="/#">Update</a>
                <a className="btn btn-default check_out" href="/#">Check Out</a>
            </div>
        )
    }
    if (data) {
        return (
            <div className="col-sm-9 padding-right">
                <section id="cart_items">
                    <div className="">
                        <div className="breadcrumbs">
                            <ol className="breadcrumb">
                                <li><a href="/#">Home</a></li>
                                <li className="active">Shopping Cart</li>
                            </ol>
                        </div>
                        <div className="table-responsive cart_info">
                            <table className="table table-condensed">
                                <thead>
                                    <tr className="cart_menu">
                                        <td className="image">Item</td>
                                        <td className="description"></td>
                                        <td className="price">Price</td>
                                        <td className="quantity">Quantity</td>
                                        <td className="total">Total</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderCart()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <section id="do_action">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox" defaultValue=' '/>
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" defaultValue=' '/>
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" defaultValue=' '/>
                                        <label>Estimate Shipping &amp; Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" defaultValue=' '/>
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href="/#">Get Quotes</a>
                                <a className="btn btn-default check_out" href="/#">Continue</a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            {renderSum()}
                        </div>
                    </div>
                </section>
            </div>
        )
    } else {
        return (
            <div className="col-sm-9 padding-right">
                <section id="cart_items">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><a href="/#">Home</a></li>
                            <li className="active">Check out</li>
                        </ol>
                    </div>
                    <h3>You don't have any product in your cart.</h3>
                </section>
            </div>
        )
    }
}
export default Cart