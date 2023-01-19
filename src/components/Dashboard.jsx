import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [post, setPost] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const fetchPosts = async () => {
    await axios
      .get(`https://server-blog-production.up.railway.app/posts/submitted `)
      .then((res) => {
        setPost(res.data);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);
  return (
    <Box width="100%" height={100}>
      <Typography marginTop={10}>Submitted Posts</Typography>
      <Divider />
      {post.length > 0 ? (
        post.map((posts) => {
          const approvePost = async () => {
            await axios
              .post(`http://localhost:5000/post/approve/${posts._id}`)
              .then(() => {
                alert("post approved");
              });
            setRefresh(!refresh);
          };
          const deletePost = async () => {
            await axios
              .delete(`http://localhost:5000/post/${posts._id}`)
              .then(() => {
                alert("post delted");
              });
            setRefresh(!refresh);
          };
          const addEllipsis = (str, limit) => {
            return str.length > limit ? str.substring(0, limit) + "...." : str;
          };
          let date = new Date(posts.CreatedAt).toDateString();
          let displayMonth = date.substring(4, 10);
          let displayYear = date.substring(10);
          let displayDate = `${displayMonth},${displayYear}`;
          return (
            <Grid xs={6} padding={2} sm={2} item lg={3}>
              <Card sx={{ height: "100%", width: "100%" }}>
                <CardActionArea href={`details/${posts._id}`}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={posts.image}
                    alt="post_img"
                  />
                  <Divider variant="middle" />

                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {addEllipsis(posts.title, 22)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {addEllipsis(posts.description, 80)}
                    </Typography>
                    <Typography fontSize={10} color="text.primary">
                      {displayDate}
                    </Typography>
                    <Typography fontSize={10} color="text.primary">
                      comments : {posts.comments.length}
                    </Typography>
                    <Typography fontSize={10} color="text.primary">
                      Views: {posts.views}
                    </Typography>
                  </CardContent>
                  <Typography fontSize={20} color="text.primary">
                    {posts.category}
                  </Typography>
                </CardActionArea>
              </Card>
              <Button onClick={() => approvePost()}>Approve</Button>
              <Button onClick={() => deletePost()} color="warning">
                Delete
              </Button>
            </Grid>
          );
        })
      ) : (
        <h2>no data</h2>
      )}
    </Box>
  );
};

export default Dashboard;
