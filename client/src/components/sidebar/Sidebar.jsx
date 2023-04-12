import { useEffect, useState } from "react"
import "./sidebar.css"
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get("/categories");
            setCategories(res.data);
        }
        getCategories();
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://coinnounce.com/content/images/wp-content/uploads/2019/10/pewdiepie-face.jpg" alt="pewdiepie" />
                <p className="aboutMe">I'm just your average college student, juggling assignments and a caffeine addiction. I'm a master procrastinator but still strive for good grades. When I'm not studying, you can find me binging Netflix or attempting not to burn down the kitchen.</p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {categories.map((category) => (
                        <Link className="link" to={`/?category=${category.name}`}>
                            <li className="sidebarListItem">{category.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                <Link className="link topIcon fab fa-facebook-square" to="https://facebook.com"></Link>
				<Link className="link topIcon fab fa-twitter-square" to="https://twitter.com"></Link>
				<Link className="link topIcon fab fa-pinterest-square" to="https://pinterest.com"></Link>
				<Link className="link topIcon fab fa-instagram-square" to="https://instagram.com"></Link>
                </div>
            </div>
        </div>

    )
}
