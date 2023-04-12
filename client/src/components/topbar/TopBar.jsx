import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
	const { user, dispatch } = useContext(Context);
	const publicFolder = "http://localhost:5000/images/"

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	}

	return (
		<div className="top">
			<div className="topLeft">
				<Link className="link topIcon fab fa-facebook-square" to="https://facebook.com"></Link>
				<Link className="link topIcon fab fa-twitter-square" to="https://twitter.com"></Link>
				<Link className="link topIcon fab fa-pinterest-square" to="https://pinterest.com"></Link>
				<Link className="link topIcon fab fa-instagram-square" to="https://instagram.com"></Link>
			</div>
			<div className="topCenter">
				<ul className="topList">
					<li className="topListItem">
						<Link className="link" to="/">HOME</Link>
					</li>

					<li className="topListItem">
						<Link className="link" to="/about">ABOUT</Link>
					</li>

					{/* <li className="topListItem">
						<Link className="link" to="/">CONTACT</Link>
					</li> */}

					<li className="topListItem">
						<Link className="link" to="/write">WRITE</Link>
					</li>

					<li className="topListItem" onClick={handleLogout}>
						<Link className="link" to="/login">
							{user && "LOGOUT"}
						</Link>
					</li>
				</ul>
			</div>
			<div className="topRight">
				{
					user ? (
						<Link to={"/settings"}>
							<img
								className="topImg"
								src={publicFolder + user.profilePicture}
								alt="PP"
							/>
						</Link>
					) : (
						<ul className="topList">
							<li className="topListItem">
								<Link className="link" to="/login">LOGIN</Link>
							</li>

							<li className="topListItem">
								<Link className="link" to="/register">REGISTER</Link>
							</li>
						</ul>
					)
				}

				<i className="topSearchIcon fas fa-search"></i>
			</div>
		</div>
	)
}
