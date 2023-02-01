import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/context";

const UserDashboard = () => {
  const [post, setPost] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user } = useContext(DataContext);
  const fetchPosts = async () => {
    try {
      await axios
        .get(
          `https://server-blog-production.up.railway.app/posts/submitted/user/${user.displayName}`
        )
        .then((res) => {
          setPost(res.data);
        });
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [user]);
  return (
    <Box margin={10}>
      <Typography>User Dashboard</Typography>
      <Divider />
      <Typography fontSize={40}>
        Welcome, {user ? user.displayName : ""}
      </Typography>
      {post && post.length > 0 ? (
        post.map((posts, index) => {
          const addEllipsis = (str, limit) => {
            return str.length > limit ? str.substring(0, limit) + "...." : str;
          };
          let date = new Date(posts.CreatedAt).toDateString();
          let displayMonth = date.substring(4, 10);
          let displayYear = date.substring(10);
          let displayDate = `${displayMonth},${displayYear}`;
          const deletePost = async () => {
            await axios
              .delete(
                `https://server-blog-production.up.railway.app/post/${posts._id}`
              )
              .then(() => {
                alert("post deleted successfully");
              });
            setRefresh(!refresh);
          };
          return (
            <Grid xs={12} padding={2} sm={2} item lg={3} key={index}>
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
                  <Typography fontSize={18} color="text.primary">
                    {posts.author}
                  </Typography>
                </CardActionArea>
                <Typography>
                  Status :
                  {posts.approved === false
                    ? " Waiting for Approval"
                    : " Approved and Published"}
                </Typography>
              </Card>
              {posts.approved === false ? (
                <Button
                  onClick={() => deletePost()}
                  color="warning"
                  variant="contained"
                >
                  Delete
                </Button>
              ) : (
                <></>
              )}
            </Grid>
          );
        })
      ) : (
        <Box style={{ margin: 20 }}>
          {!post ? (
            <Typography>No submiited posts yet!</Typography>
          ) : (
            <CircularProgress />
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserDashboard;
