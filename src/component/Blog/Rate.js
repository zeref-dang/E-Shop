import StarRatings from 'react-star-ratings';
import { useEffect, useState } from "react";
import Api from '../../Api';

function Rate(props) {
    const userData = JSON.parse(localStorage.getItem("data login"))
    const [rating, setRating] = useState()
    const [rated, setRated] = useState()
    const [number, setNumber] = useState()
    const [error, setError] = useState()
    useEffect(() => {
        let url = "/blog/rate/" + props.idBlog
        Api.get(url)
            .then(res => {
                let x = res.data.data.length
                let y = res.data.data
                let tong = 0
                setNumber (x)
                for (let i = 0; i < y.length; i++) {
                    tong += y[i]['rate']
                }
                let rated = tong / x
                setRated(rated)
            })
            .catch(error => console.log(error))
    }, [props.idBlog])
    useEffect(() => {
        if (userData) {
            // Đường dẫn API
            let url = "/blog/rate/" + props.idBlog
            let accessToken = userData.success.token
            // config để gửi token API 
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
            if (rating) {
                const formData = new FormData()
                formData.append('blog_id', props.idBlog)
                formData.append('user_id', userData.Auth.id)
                formData.append('rate', rating)
                Api.post(url, formData, config)
                    .then(res => {
                        setError(res.data.message)
                    })
            }
        } else {
            setError('Bạn cần đăng nhập để đánh giá bài viết! :v')
        }
    }, [rating, props.idBlog, userData])
    function Foo() {
        function changeRating(newRating) {
            setRating(newRating)
        }
        return (
            <StarRatings
                rating={rating ? rating : rated || 0}
                starRatedColor="orange"
                changeRating={changeRating}
                numberOfStars={5}
                name='rating'
                starDimension="40px"
                starSpacing="15px"
            />
        )
    }
    return (
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li>
                    {Foo()}
                </li>
                <li className="color">({number} votes)</li>
                <li>{error}</li>
            </ul>
            <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href="/#">Pink <span>/</span></a></li>
                <li><a className="color" href="/#">T-Shirt <span>/</span></a></li>
                <li><a className="color" href="/#">Girls</a></li>
            </ul>
        </div>
    )
}
export default Rate