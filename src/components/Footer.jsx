import { CopyrightRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import Heart_Icon from "../assets/icons/heart-icon.png";
import Logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#fff3f4" sx={{ MozBoxShadow: "0 0 20px #ddd", WebkitBoxShadow: "0 0 20px #ddd", boxShadow: "0 0 20px #ddd" }}>
      <Stack
        gap="40px"
        sx={{
          WebkitBoxAlign: "center",
          WebkitAlignItems: "center",
          MozBoxAlign: "center",
          msFlexAlign: "center",
          alignItems: "center",
          px: "40px",
          pt: "20px"
        }}
      >
        <img src={Logo} alt="Logo" width="200px" heigh="40px" />
        <Typography variant="h5" pb="40px" mt="20px" textAlign="center">
          Made with <img src={Heart_Icon} style={{ width: "30px", marginBottom: "-8px" }} alt="Love" /> by Abolfazl Taghadosi <CopyrightRounded style={{ marginBottom: "-5px" }} /> {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer