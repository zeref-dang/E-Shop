import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Api from "../../Api"
import Comment from "./Comment"
import ListComment from "./ListComment"
import Rate from "./Rate"

function Detail(props) {
	let params = useParams()
	let listComment = []
	let ngay = ""
	let tg = ""
	const idBlog = params.id
	const [data, setData] = useState('')
	const [dataComment, setDataComment] = useState([])
	const [dataId, setDataId] = useState()
	const [dem, setDem] = useState(0)
	useEffect(() => {
		Api.get('/blog/detail/' + params.id)
			.then(res => {
				setData(res.data.data)
				setDataComment(res.data.data.comment.slice().reverse())
			})
			.catch(error => console.log(error))
	}, [params.id])
	function getCmt(x) {
		listComment = dataComment.concat(x)
		setDataComment(listComment)
	}
	function replayCmt(x) {
		setDataId(x)
		setDem(dem + 1)
	}
	function renderData() {
		if (!typeof data.updated_at === 'undefined') {
			const test = data.updated_at.split(' ')
			ngay = test[0]
			tg = test[1]
		}
		return (
			<div className="single-blog-post">
				<h3>{data.title}</h3>
				<div className="post-meta">
					<ul>
						<li><i className="fa fa-user"></i> Mac Doe</li>
						<li><i className="fa fa-clock-o"></i>{tg}</li>
						<li><i className="fa fa-calendar"></i>{ngay}</li>
					</ul>
				</div>
				<a href="/#">
					<img src={'http://localhost/laravel/laravel/public/upload/Blog/image/' + data.image} alt="" />
				</a>
				<p>
					{data.content}
				</p>
				<div className="pager-area">
					<ul className="pager pull-right">
						<li><a href="/#">Pre</a></li>
						<li><a href="/#">Next</a></li>
					</ul>
				</div>
			</div>
		)
	}
	return (
		<div className="col-sm-9">
			<div className="blog-post-area">
				<h2 className="title text-center">Latest From our Blog</h2>
				{renderData()}
			</div>
			<Rate idBlog={idBlog} />
			<div className="socials-share">
				<a href="/#"><img src="images/blog/socials.png" alt="" /></a>
			</div>
			<ListComment dataComment={dataComment} replayCmt={replayCmt} />
			<Comment idBlog={idBlog} getCmt={getCmt} dataId={dataId} dem={dem} />
		</div>
	)
}
export default Detail