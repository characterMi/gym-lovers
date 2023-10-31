import {Box, Typography, Button} from "@mui/material";
import BannerImg from "../assets/images/banner.jpeg"


const Banner = () => {
  return (
    <Box sx={{mt: {md: "212px", xs: "70px"}, ml: {sm: "50px"}}} position="relative" p="20px">
        <Typography color="#ff2625" fontWeight="600" fontSize="26px">
            Fitness Club
        </Typography>
        <Typography fontWeight="700" sx={{fontSize: {lg: "44px", xs: "40px"}}}>
            Sweat, Smile <br /> and Repeat
        </Typography>
        <Typography fontSize="22px" lineHeight="35px" mb={4}>
            Check out the most effective Exercises
        </Typography>
        <Button sx={{background: "#ff2625", padding: "10px"}} href="#exercises" variant="contained" color="error">Explore Exercises</Button>
        <Typography fontWeight={600} color="#ff2625" sx={{opacity: 0.1, fontSize:{lg: "200px", xs: "50px", sm: "100px"}}} mb="23px" mt="100px">Exercise</Typography>
        <img src={BannerImg} alt="Banner" className="banner-img" loading="lazy" />
    </Box>
  )
}

export default Banner