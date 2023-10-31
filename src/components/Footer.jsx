import { Box, Stack, Typography } from "@mui/material"
import Logo from "../assets/images/logo.png";
import { CopyrightRounded } from "@mui/icons-material"
import Heart_Icon from "../assets/icons/heart-icon.png"

const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#fff3f4" sx={{ boxShadow: "0 0 20px #ddd" }}>
      <Stack gap="40px" sx={{ alignItems: "center", px: "40px", pt: "20px" }}>
        <img src={Logo} alt="Logo" width="200px" heigh="40px" />
        <Typography variant="h5" pb="40px" mt="20px" textAlign="center">
          Made with <img src={Heart_Icon} style={{ width: "30px", marginBottom: "-8px" }} alt="Love" /> by Abolfazl Taghadosi <CopyrightRounded sx={{ mb: "-5px" }} /> {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer