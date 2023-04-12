import { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";
import { Context } from "../../context/Context";
import axios from "axios";


export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const { user, dispatch } = useContext(Context);
    const publicFolder = "http://localhost:5000/images/"

    const handleSubmit = async (event) => {
        event.preventDefault(); 		//stop the browser from loading the default action of the form.
        dispatch({type: "UPDATE_START"});     

        const updatedUser = {
            userId: user._id, //the _id of the user that is updating the task.
            username, //the username that is updating the task.
            email, //the email that is updating the task
            password ////the password that is updating the task
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name; //assigns a unique name to the file so it doesn't overwrite each other.
            data.append("name", filename); //assigns the name of the file to the name property of the data object.
            data.append("file", file); //assigns the file to the file property of the data object.
            updatedUser.profilePicture = filename; //sets the name of the file to the name of the file.

            try {
                await axios.post("/upload", data); //post the data to the server.
            } catch (error) {
                
            }
        }
        
        try {
            const res = await axios.put("/users/" + user._id, updatedUser); //put the data to the server.
            setSuccess(true); //sets the success state to true.
            dispatch({type: "UPDATE_SUCCESSFUL", payload: res.data}); //dispatches successful state.
        } catch (error) {
            dispatch({type: "UPDATE_FAILED"}); //dispatches error state.
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`/users/${user._id}`, {
                data: { userId: user._id }
            });
            window.location.replace("/login");
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update your account</span>
                    <span className="settingsDeleteTitle" onClick={handleDelete}>Delete your account</span>
                </div>

                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsProfilePicture">
                        <img src={file ? URL.createObjectURL(file) : publicFolder + user.profilePicture} alt="PP" />

                        <label htmlFor="fileInput">
                            <i className="settingsProfilePictureIcon far fa-user-circle"></i>
                        </label>

                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={event => setFile(event.target.files[0])}
                        />
                    </div>

                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={event => setUsername(event.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <label>Password</label>
                    <input type="password" onChange={event => setPassword(event.target.value)} />

                    <button className="settingsSubmit" type="submit">Update</button>
                    {success && <span className="updateSuccessMessage">Account updated successfully!</span>}
                </form>
            </div>

            <Sidebar />

        </div>
    )
}
