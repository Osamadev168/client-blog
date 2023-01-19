import {
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Popular = () => {
  const [post, setPost] = useState([]);
  const fetchPosts = async () => {
    await axios
      .get("https://server-blog-production.up.railway.app/popular")
      .then((res) => {
        setPost(res.data);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Box margin={2}>
      <Typography fontSize={30}>Popular</Typography>

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
            const addView = async () => {
              await axios.post(
                `https://server-blog-production.up.railway.app/post/${posts._id}`
              );
            };
            return (
              <Grid padding={2} xs={12} sm={6} lg={4} key={index}>
                <Link
                  to={`details/${posts._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card sx={{ height: "100%", width: "100%" }}>
                    <CardActionArea onClick={() => addView()}>
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
                          {posts.category}
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
                </Link>
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
};

export default Popular;
