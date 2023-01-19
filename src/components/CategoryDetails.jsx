import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const CategoryDetails = () => {
  const [post, setPost] = useState([]);
  const params = useParams();
  const category = params.category;
  const getPosts = async (category) => {
    await axios
      .get(`https://server-blog-production.up.railway.app/posts/${category}`)
      .then((res) => {
        setPost(res.data);
      });
  };
  useEffect(() => {
    getPosts(category);
  }, [category]);

  return (
    <Box sx={{ flexGrow: 1 }} margin={5}>
      <Typography fontSize={50}>{category} blogs</Typography>
      <Grid container spacing={2} marginTop={5}>
        {post.length > 0 ? (
          post.map((posts) => {
            let date = new Date(posts.CreatedAt).toDateString();
            let displayMonth = date.substring(4, 10);
            let displayYear = date.substring(10);
            let displayDate = `${displayMonth},${displayYear}`;
            const addLimits = (str, limit) => {
              return str.length > limit ? str.substring(0, limit) + "..." : str;
            };
            return (
              <Grid xs={12} padding={2} sm={6}>
                <Link
                  to={`details/${posts._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card sx={{ width: "100%", height: "100%" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="170"
                        image={posts.image}
                        alt="post_image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {addLimits(posts.title, 30)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {addLimits(posts.description, 100)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {posts.category}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {displayDate}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            );
          })
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Box>
  );
};

export default CategoryDetails;
