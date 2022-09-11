import { useEffect, useState } from 'react'
import Api from '../../Api'
import {
    Link
} from "react-router-dom";

function Blog(props) {
    const [item, setItem] = useState([])
    useEffect(() => {
        Api.get('/blog')
            .then(res => {
                setItem(res.data.blog.data)
            })
            .catch(error => console.log(error))
    }, [])
    function renderData() {
        return item.map((value, key) => {
            const test = value.updated_at.split(' ')
            const ngay = test[0]
            const tg = test[1]
            return (
                <div className="single-blog-post" key={key}>
                    <h3>{value.title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user"></i> Mac Doe</li>
                            <li><i className="fa fa-clock-o"></i> {tg}</li>
                            <li><i className="fa fa-calendar"></i> {ngay} </li>
                        </ul>
                        <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                        </span>
                    </div>
                    <a href="/#">
                        <img src={'http://localhost/laravel/laravel/public/upload/Blog/image/' + value.image} alt="" />
                    </a>
                    <p>{value.content}</p>
                    <Link className="btn btn-primary" to={'/Blog/Detail/' + value.id}>Read More</Link>
                </div>
            )
        })
    }
    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {renderData()}
            </div>
        </div>
    )
}
export default Blog