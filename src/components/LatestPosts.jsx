import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Kittens from "../assets/Kittens.jpg";
import { Card, CircularProgress } from "@mui/material";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "../Context/context.jsx";

export default function LatestPosts() {
  const { setPosts } = useContext(DataContext);

  const [post, setPost] = useState([]);
  const fetchPosts = async () => {
    try {
      await axios
        .get("https://server-blog-production.up.railway.app/posts")
        .then((res) => {
          setPost(res.data);
          setPosts(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} margin={2}>
      <Typography fontSize={30}>Latest Posts</Typography>
      <Divider variant="fullWidth" />
      <Grid container spacing={2} marginTop={5}>
        {post.length > 0 ? (
          post.map((posts, index) => {
            const addEllipsis = (str, limit) => {
              return str.length > limit
                ? str.substring(0, limit) + "...."
                : str;
            };
            let date = new Date(posts.CreatedAt).toDateString();
            let displayMonth = date.substring(4, 10);
            let displayYear = date.substring(10);
            let displayDate = `${displayMonth},${displayYear}`;
            const url = posts.image ? posts.image : Kittens;
            const addView = async () => {
              await axios.post(
                `https://server-blog-production.up.railway.app/post/${posts._id}`
              );
            };
            return (
              <Grid padding={2} xs={12} sm={6} lg={4} key={index} item="true">
                <Card sx={{ height: "100%", width: "100%" }}>
                  <CardActionArea
                    href={`details/${posts._id}`}
                    onClick={() => addView()}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={url}
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
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Box
            item
            margin={2}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </Box>
  );
}
