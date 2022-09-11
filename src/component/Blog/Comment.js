import { useEffect, useState } from "react"
import Api from "../../Api"

function Comment(props) {
    let dataId = props.dataId
    let dem = props.dem
    const userData = JSON.parse(localStorage.getItem("data login"))
    const [comment, setComment] = useState()
    const [errors, setErrors] = useState("")
    const [dataIds, setDataIds] = useState()
    useEffect(() => {
        setDataIds(dataId)
    }, [dem, dataId])
    function hanldeInput(e) {
        setComment(e.target.value)
    }
    function hanldePost(e) {
        e.preventDefault()
        if (userData) {
            // Đường dẫn API
            let url = "/blog/comment/" + props.idBlog
            let accessToken = userData.success.token
            // config để gửi token API 
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
            if (comment) {
                const formData = new FormData()
                formData.append('id_blog', props.idBlog)
                formData.append('id_user', userData.Auth.id)
                formData.append('id_comment', dataIds ? dataIds : 0)
                formData.append('comment', comment)
                formData.append('image_user', userData.Auth.avatar)
                formData.append('name_user', userData.Auth.name)
                Api.post(url, formData, config)
                    .then(res => {
                        props.getCmt(res.data.data)
                    })
                setDataIds(0)
            } else {
                setErrors("vui lòng nhập CMT")
            }
        }
        else {
            setErrors("Vui lòng đăng nhập trước khi CMT")
        }
    }
    function renderError() {
        if (errors) {
            return (
                <div className="alert alert-danger">
                    <ul>
                        <li>{errors}</li>
                    </ul>
                </div>
            )
        }
    }
    return (
        <>
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Leave a replay</h2>
                        <div className="text-area">
                            <div className="blank-arrow">
                                <label>Your Name</label>
                            </div>
                            <span>*</span>
                            <textarea id='comment' name="message" rows="11" onChange={(e) => { hanldeInput(e) }}></textarea>
                            {renderError()}
                            <a href="/#"className="btn btn-primary" onClick={(e) => { hanldePost(e) }}>post comment</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Comment