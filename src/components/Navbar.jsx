import { Link } from 'react-router-dom';
import { Box, Button, Stack } from "@mui/material";

import Logo from "../assets/images/logo.png";

const Navbar = () => {
  return (
    <Stack direction="row" alignItems="center" sx={{ gap: { sm: "122px", xs: "10px" }, justifyContent: { xs: "space-between", md: "flex-start" }, p: { xs: "20px 5px", sm: "20px" }, boxShadow: "0 0 10px #ddd" }}>
      <Link to="/">
        <Box component="img" src={Logo} alt="Logo" sx={{ height: { xs: "56px", sm: "68px" }, m: { xs: "0", sm: "0 20px" } }} />
      </Link>
      <Stack direction="row" gap="40px" sx={{ fontSize: { sm: "24px", xs: "20px" } }} alignItems="flex-end">
        <Link to="/" style={{ textDecoration: "none", color: "#3a1212", borderBottom: "3px solid #ff2625" }}>Home</Link>
        <Button variant='text' color='error' sx={{ color: "#3a1212", fontWeight: "bold", mb: "-10px" }} onClick={() => window.scrollTo({ top: window.innerHeight * 2 - 100, behavior: "smooth" })}>Exercises</Button>
      </Stack>
    </Stack>
  )
}

export default Navbar;