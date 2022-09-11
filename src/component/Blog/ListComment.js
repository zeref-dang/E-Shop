function ListComment(props) {
    let data = props.dataComment
    function hanldeComment() {
        return data.map((value, key) => {
            if (value.id_comment === 0) {
                let day = ""
                let time = ""
                if (value.updated_at) {
                    const test = value.updated_at.split(" ")
                    day = test[0]
                    time = test[1]
                }
                return (
                    <ul className="media-list" key ={key}>
                        <li className="media">
                            <a className="pull-left" href="/#">
                                <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                            </a>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>{value.name_user}</li>
                                    <li><i className="fa fa-clock-o"></i> {time}</li>
                                    <li><i className="fa fa-calendar"></i> {day}</li>
                                </ul>
                                <p>{value.comment}</p>
                                <a className="btn btn-primary" id = {value.id} onClick = {e => hanldeReplay(e)} href="#comment"><i className="fa fa-reply"></i>Replay</a>
                            </div>
                        </li>
                        {data.map((values) => {
                            if (values.id_comment === value.id) {
                                let day = ""
                                let time = ""
                                if (values.updated_at) {
                                    const test = values.updated_at.split(" ")
                                    day = test[0]
                                    time = test[1]
                                }
                                return (
                                    <li key={values.id} className="media second-media">
                                        <a className="pull-left" href="/#">
                                            <img className="media-object" src="images/blog/man-three.jpg" alt=""/>
                                        </a>
                                        <div className="media-body">
                                            <ul className="sinlge-post-meta">
                                                <li><i className="fa fa-user"></i>{values.name_user}</li>
                                                <li><i className="fa fa-clock-o"></i> {time}</li>
                                                <li><i className="fa fa-calendar"></i> {day}</li>
                                            </ul>
                                            <p>{values.comment}</p>
                                            <a className="btn btn-primary" id = {values.id} onClick = {e => hanldeReplay(e)} href="#comment"><i className="fa fa-reply"></i>Replay</a>
                                        </div>
                                    </li>
                                )
                            }
                            return null
                        })}
                    </ul>
                )
            }
            return null
        })
    }
    function hanldeReplay(e) {
        props.replayCmt(e.target.id)
    }
    return (
        <div className="response-area">
            <h2>RESPONSES</h2>
                {hanldeComment()}
        </div>
    )
}
export default ListComment