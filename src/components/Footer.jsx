import { Box, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box marginTop={5}>
      <Grid
        xs={12}
        style={{
          backgroundColor: "#3f3f3f",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontSize={30}>Copyright &copy; 2023 Neon Blogs</Typography>
      </Grid>
    </Box>
  );
};

export default Footer;
