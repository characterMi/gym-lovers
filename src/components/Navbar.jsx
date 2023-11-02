import { Link } from 'react-router-dom';
import { Box, Stack } from "@mui/material";

import Logo from "../assets/images/logo.png";

const Navbar = () => {
  return (
    <Stack direction="row" alignItems="center" sx={{ gap: { sm: "122px", xs: "10px" }, justifyContent: { xs: "space-between", md: "flex-start" }, p: { xs: "20px 5px", sm: "20px" }, boxShadow: "0 0 10px #ddd" }}>
      <Link to="/">
        <Box component="img" src={Logo} alt="Logo" sx={{ height: { xs: "56px", sm: "68px" }, m: { xs: "0", sm: "0 20px" } }} />
      </Link>
      <Stack direction="row" gap="25px" sx={{ fontSize: { sm: "24px", xs: "20px" } }} alignItems="flex-end">
        <Link to="/" style={{ textDecoration: "none", color: "#3a1212", borderBottom: "3px solid #ff2625" }}>Home</Link>
        <button style={{ color: "#3a1212", marginBottom: "-5px", fontSize: "20px", border: "none", outline: "none", background: "none" }} onClick={() => window.scrollTo({ top: window.innerHeight * 2 - 100, behavior: "smooth" })}>Exercises</button>
      </Stack>
    </Stack>
  )
}

export default Navbar;