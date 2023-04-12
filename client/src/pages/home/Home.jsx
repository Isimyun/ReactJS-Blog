//Imports
import { useEffect, useState } from "react"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import axios from "axios";
import { useLocation } from "react-router-dom"

export default function Home() {
	const [posts, setPosts] = useState([]); //State for the list of post
	const { search } = useLocation();

	useEffect(() => {
		const fetchPosts = async () => { //Fetching the post from the server and setting the state with the result.
			const response = await axios.get("/posts" + search);
			setPosts(response.data); //Sets the state with the response data.
		}
		fetchPosts(); //Call the function.
	}, [search]);
	return (
		<>
			<Header /> {/*This will render the header part of the page.*/}
			<div className="home">
				<Posts posts = {posts}/>
				<Sidebar />
			</div>
		</>

	)
}
