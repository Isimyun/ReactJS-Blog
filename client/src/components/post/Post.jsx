import "./post.css"
import { Link } from "react-router-dom"

export default function Post({ post }) {
    const publicFolder = "http://localhost:5000/images/"
    return (
        <div className="post">
            {post.photo && (
                <img className="postImage"
                    src={publicFolder + post.photo}
                    alt="postImage"
                />
            )}


            <div className="postInfo">
                <div className="postCategories"> {
                    post.categories.map(category => (
                        <span className="postCategory">{category.name}</span>
                    ))
                }
                </div>

                <Link className="link" to={`/post/${post._id}`}>
                    <span className="postTitle">{post.title}</span>
                </Link>

                <hr />

                <span className="postDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>

            <p className="postDescription">
                {post.description}
            </p>

        </div>
    )
}
