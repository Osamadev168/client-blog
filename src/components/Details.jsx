import {
  Box,
  Button,
  Divider,
  Grid,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Kittens from "../assets/Kittens.jpg";
import { DataContext } from "../Context/context";
const commentdefaultvalues = {
  username: "",
  comment: "",
  date: new Date(),
};
const Details = () => {
  const [post, setPost] = useState({});
  const params = useParams();
  const [comment, setComment] = useState(commentdefaultvalues);
  const [refresh, setRefresh] = useState(false);
  const postId = params.id;
  const { user } = useContext(DataContext);
  const FetchData = async (postId) => {
    await axios
      .get(`https://server-blog-production.up.railway.app/post/${postId}`)
      .then((res) => {
        setPost(res.data);
      });
  };
  const submitComment = async () => {
    await axios.post(
      `https://server-blog-production.up.railway.app/post/${postId}/new/comment`,
      comment
    );
    setComment(commentdefaultvalues);
    setRefresh(!refresh);
  };

  useEffect(() => {
    FetchData(postId);
  }, [refresh]);
  const date = new Date(post.CreatedAt).toDateString();
  const month = date.substring(3, 10);
  const year = date.substring(10);
  const blogdate = `${month},${year}`;
  const url = post.image ? post.image : Kittens;
  return (
    <Grid xs={12} md={12} margin={2}>
      <Grid xs={12}>
        <Typography fontSize={25}>{post.title}</Typography>
        <Typography fontSize={15}>{post.author}</Typography>
        <Typography fontSize={11} textAlign="left">
          {blogdate}
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <img
          src={url}
          style={{ width: "100%", height: 400, borderRadius: 10 }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: post.body }}
          style={{ fontWeight: "bold", fontFamily: "sans-serif" }}
        ></div>
      </Grid>
      {user !== null && post.approved !== false ? (
        <>
          <TextareaAutosize
            minRows={5}
            value={comment.comment}
            placeholder="got any thots ..... ??"
            onChange={(e) => {
              setComment({
                ...comment,
                username: user.displayName,
                comment: e.target.value,
              });
            }}
          />
          <Button onClick={() => submitComment()}>Submit</Button>
          <Divider />
        </>
      ) : post.approved === false ? (
        <></>
      ) : (
        <Typography>You must be logged in to comment</Typography>
      )}

      {post.comments && post.comments.length > 0 ? (
        post.comments.map((comment) => {
          const date = new Date(comment.date).toDateString();
          return (
            <Box
              style={{
                display: "flex",
                backgroundColor: "greenyellow",
                margin: 10,
                padding: 10,
              }}
            >
              <Typography>{comment.username} on </Typography>
              <Typography> {date}</Typography>

              <Typography>said {comment.comment}</Typography>
            </Box>
          );
        })
      ) : (
        <Typography>no comments yet</Typography>
      )}
    </Grid>
  );
};

export default Details;
