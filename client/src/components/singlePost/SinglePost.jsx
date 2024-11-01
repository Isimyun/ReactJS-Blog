import { Link, useLocation } from "react-router-dom"
import "./singlePost.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const publicFolder = "http://localhost:5000/images/";
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDescription(res.data.description);
        }
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: { username: user.username }
            });
            window.location.replace("/");
        } catch (err) {
            console.log(err)
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username, title, description
            });
            setUpdateMode(false);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img className="singlePostImage" src={publicFolder + post.photo} alt="singlePostImage" />
                )}{
                    updateMode ? <input
                        type="text"
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    /> : (
                        <h1 className="singlePostTitle">
                            {title}
                            {post.username === user?.username && (
                                <div className="singlePostEdit">
                                    <i
                                        className="singlePostIcon far fa-edit"
                                        onClick={() => setUpdateMode(true)}
                                    ></i>
                                    <i
                                        className="singlePostIcon far fa-trash-alt"
                                        onClick={handleDelete}
                                    ></i>
                                </div>
                            )}
                        </h1>
                    )}

                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link className="link" to={`/?username=${post.username}`}>
                            <b>{" " + post.username}</b>
                        </Link>
                    </span>

                    <span className="singlePostDate">
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>

                {updateMode ? (
                    <textarea
                        className="singlePostDescriptionInput"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                ) : (
                    <p className="singlePostDescription">
                        {description}
                    </p>
                )}
                {updateMode && (
                    <button
                        className="singlePostButton"
                        onClick={handleUpdate}
                    >Update</button>
                )}
            </div>
        </div>
    )
}
