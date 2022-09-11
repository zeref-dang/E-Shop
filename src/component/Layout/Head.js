import {
	Link, useNavigate
} from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useContext } from 'react'
function Head() {
	let data = localStorage.getItem('data login')
	const navigate = useNavigate()
	const count = useContext(UserContext)
	let dem = count.dem
	let counts = count.count
	let countlc = JSON.parse(localStorage.getItem('count'))
	let demlc = JSON.parse(localStorage.getItem('dem'))
	if (data) {
		data = JSON.parse(data)
	}
	function hanldeLogout() {
		localStorage.removeItem('data login')
		navigate('/login')
	}
	if (counts || counts === 0) {
		localStorage.setItem("count", JSON.stringify(counts))
	}
	if (dem || dem === 0) {
		localStorage.setItem("dem", JSON.stringify(dem))
	}
	function hanldeNav() {
		if (data) {
			return (
				<>
					<li><Link to="/Wishlist"><i className="fa fa-star"></i>{dem ? dem : demlc} Wishlist</Link></li>
					<li><Link to="/Cart"><i className="fa fa-shopping-cart"></i>{counts ? counts : countlc} Cart</Link></li>
					<li className="nav-item dropdown">
						<img src={"http://localhost/laravel/laravel/public/upload/user/avatar/" + data.Auth.avatar} alt="user" className="rounded-circle"
							style={{ width: '20px', height: '20px' }} />
						<a style={{ display: 'inline-block' }} id="navbarDropdown" className="nav-link dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre="">
							{data.Auth.name} <span className="caret"></span>
						</a>
						<div style={{ padding: '10px' }} className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
							<p><a className="dropdown-item" onClick={hanldeLogout} href="/#">
								Logout
							</a></p>
							<p><Link to='/Account' className="dropdown-item">
								Profile
							</Link></p>
						</div>
					</li>
				</>
			)
		} else {
			return (
				<>
					<li><Link to="/Cart"><i className="fa fa-shopping-cart"></i>{counts ? counts : countlc} Cart</Link></li>
					<li><Link to="/Login"><i className="fa fa-lock"></i> Login</Link></li>
					<li><Link to="/Regiester"><i className="fa fa-lock"></i> Regiester</Link></li>
				</>
			)
		}
	}
	return (
		<header id="header">
			<div className="header_top">
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className="contactinfo">
								<ul className="nav nav-pills">
									<li><a href="/#"><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>
									<li><a href="/#"><i className="fa fa-envelope"></i> info@domain.com</a></li>
								</ul>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="social-icons pull-right">
								<ul className="nav navbar-nav">
									<li><a href="/#"><i className="fa fa-facebook"></i></a></li>
									<li><a href="/#"><i className="fa fa-twitter"></i></a></li>
									<li><a href="/#"><i className="fa fa-linkedin"></i></a></li>
									<li><a href="/#"><i className="fa fa-dribbble"></i></a></li>
									<li><a href="/#"><i className="fa fa-google-plus"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="header-middle">
				<div className="container">
					<div className="row">
						<div className="col-md-4 clearfix">
							<div className="logo pull-left">
								<Link to="/"><img src="http://localhost/laravel/laravel/public/frontend/images/home/logo.png" alt="" /></Link>
							</div>
							<div className="btn-group pull-right clearfix">
								<div className="btn-group">
									<button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
										USA
										<span className="caret"></span>
									</button>
									<ul className="dropdown-menu">
										<li><a href="/#">Canada</a></li>
										<li><a href="/#">UK</a></li>
									</ul>
								</div>
								<div className="btn-group">
									<button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
										DOLLAR
										<span className="caret"></span>
									</button>
									<ul className="dropdown-menu">
										<li><a href="/#">Canadian Dollar</a></li>
										<li><a href="/#">Pound</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-8 clearfix">
							<div className="shop-menu clearfix pull-right">
								<ul className="nav navbar-nav">
									{hanldeNav()}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="header-bottom">
				<div className="container">
					<div className="row">
						<div className="col-sm-9">
							<div className="navbar-header">
								<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
							</div>
							<div className="mainmenu pull-left">
								<ul className="nav navbar-nav collapse navbar-collapse">
									<li><Link to="/">Home</Link></li>
									<li className="dropdown"><a href="/#">Shop<i className="fa fa-angle-down"></i></a>
									</li>
									<li className="dropdown"><Link to="/Blog/List" className="active">Blog<i className="fa fa-angle-down"></i></Link>
									</li>
									<li><Link to="/ContactUs">Contact</Link></li>
								</ul>
							</div>
						</div>
						<div className="col-sm-3">
							<div className="search_box pull-right">
								<input type="text" placeholder="Search" defaultValue='Search'/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
export default Head