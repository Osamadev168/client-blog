import React, { useContext, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import { Box } from "@mui/system";
import { AddCircle as Add } from "@mui/icons-material";
import Icon from "../assets/photo.png";
import { DataContext } from "../Context/context";
const postInitialValues = {
  image: "",
  title: "",
  body: "",
  category: "",
  CreatedAt: new Date(),
  description: "",
  comments: [],
  author: "",
  approved: false,
};
const CreateBlog = () => {
  const [file, setFile] = useState("");
  const [post, setPost] = useState(postInitialValues);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(false);
  const { user } = useContext(DataContext);
  const submitPost = async () => {
    try {
      await axios
        .post("https://server-blog-production.up.railway.app/create", post)
        .then(() => {
          setOpen(true);
          sessionStorage.setItem("image", "");
        })
        .then(() => {
          setPost(postInitialValues);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "kalo7xt1");
    await axios
      .post("https://api.cloudinary.com/v1_1/ddwvsarat/image/upload", data)
      .then((res) => {
        setProgress(true);
        setImage(res.data.url);
        sessionStorage.setItem("image", res.data.url);
      });
    setProgress(false);
  };
  useEffect(() => {
    setImage(sessionStorage.getItem("image"));
    if (file) {
      uploadImage();
    }
  }, [file]);

  const url = image ? image : Icon;
  const approvalStatus =
    user !== null && user.email === "osamatwenty@gmail.com" ? true : false;

  return (
    <>
      {user ? (
        <>
          <div style={{ margin: 50 }}>
            <Box sx={{ width: "100%" }}>
              <img src={url} style={{ width: "100%", height: 400 }} />
              <label htmlFor="fileInput">
                <Add fontSize="large" color="success"></Add>
              </label>
            </Box>

            {progress ? (
              <Box sx={{ width: "100%" }}>
                <Typography>
                  Please wait blog picture is being uploaded....!
                </Typography>
                <LinearProgress color="success" />
              </Box>
            ) : (
              <></>
            )}
            <input
              type="file"
              id="fileInput"
              name="image"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setProgress(true);
              }}
            />

            <Grid xs={12}>
              <Typography style={{ fontSize: 30, color: "lightblue" }}>
                Write a title
              </Typography>
              <TextField
                value={post.title}
                style={{ width: "100%" }}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </Grid>
            <Grid xs={12}>
              <Typography style={{ fontSize: 30, color: "lightblue" }}>
                Write a description (minimum 15 words)
              </Typography>
              <TextField
                style={{ width: "100%" }}
                onChange={(e) =>
                  setPost({ ...post, description: e.target.value })
                }
                value={post.description}
                data={post.description}
              />
            </Grid>
            <Grid xs={8} style={{ marginTop: 10 }}>
              <Typography style={{ fontSize: 30, color: "lightblue" }}>
                Create body
              </Typography>
            </Grid>

            <Grid xs={12} style={{ marginTop: 20 }}>
              <CKEditor
                editor={ClassicEditor}
                data={post.body}
                onChange={(event, editor) => {
                  setPost({
                    ...post,
                    body: editor.getData(),
                    image: image,
                    CreatedAt: new Date(),
                    approved: approvalStatus,
                    author: user.displayName,
                  });
                }}
                config={{
                  placeholder: "Start typing your blog post here...",
                  toolbar: [
                    "Heading",
                    "|",
                    "Bold",
                    "Italic",
                    "Link",
                    "NumberedList",
                    "BulletedList",
                    "|",
                    "BlockQuote",
                    "MediaEmbed",
                    "Undo",
                    "Redo",
                  ],
                }}
              />
            </Grid>
            <Grid xs={12}>
              <Box sx={{ minWidth: 120 }} marginTop={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={post.category}
                    label="Category"
                    onChange={(e) =>
                      setPost({ ...post, category: e.target.value })
                    }
                  >
                    <MenuItem value="Sports">Sports</MenuItem>
                    <MenuItem value="Tech">Technology</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Button
              variant="contained"
              disabled={
                post.title === "" ||
                post.body === "" ||
                post.description === "" ||
                post.category === ""
              }
              onClick={() => submitPost()}
              style={{ marginTop: 20, backgroundColor: "green" }}
            >
              Submit post
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={() => setOpen(false)}
              message="Blog Submitted"
            />
          </div>
        </>
      ) : (
        <Typography>You need to be logged in first</Typography>
      )}
    </>
  );
};

export default CreateBlog;
