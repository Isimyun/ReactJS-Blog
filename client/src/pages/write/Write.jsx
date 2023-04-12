import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (event) => {
        event.preventDefault(); 		//stop the browser from loading the default action of the form.

        const newPost = {
            username: user.username, 	//assigns a value to username from the context.
            title, //sets the title of the post to the text box value.
            description, //sets the description of the post to the text box value.
            file 	//sets the file to the value of the file input.
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name; //assigns a unique name to the file so it doesn't overwrite each other.
            data.append("name", filename); //assigns the name of the file to the name property of the data object.
            data.append("file", file); //assigns the file to the file property of the data object.
            newPost.photo = filename; //sets the file to the name property of the data object.

            try {
                await axios.post("/upload", data); //post the data to the server.
            } catch (error) {

            }
        }

        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (error) {

        }
    }

    return (
        <div className="write">
            {file &&
                <img
                    className="writeImage"
                    src={URL.createObjectURL(file)}
                    alt="writeImage"
                />
            }
            <form action="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{
                            display: "none"
                        }}
                        onChange={event => setFile(event.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>

                <div className="writeFormGroup">
                    <textarea
                        className="writeInput writeText"
                        placeholder="Tell your story..."
                        type="text"
                        onChange={event => setDescription(event.target.value)}
                    ></textarea>
                </div>

                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}
