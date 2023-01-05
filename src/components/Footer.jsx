import { Box, Grid } from "@mui/material";

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
        <h1>Copyright neon inc</h1>
        <h1>Copyright neon inc</h1>
        <h1>Copyright neon inc</h1>
      </Grid>
    </Box>
  );
};

export default Footer;
