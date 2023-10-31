import { Stack, Typography } from "@mui/material";
import Icon from "../assets/icons/gym.png";


const BodyPart = ({ item, bodyPart, setBodyPart, image }) => {
    return (
        <>
            <Stack
                type="button"
                alignItems="center"
                justifyContent="center"
                className="bodyPart-card"
                sx={{
                    borderTop: bodyPart === item ? "4px solid #ff2625" : '',
                    backgroundColor: "#fff",
                    borderRadius: "0 40px 0 40px",
                    width: { xs: "200px", sm: "270px" },
                    height: { xs: "210px", sm: "280px" },
                    cursor: "pointer",
                    gap: "47px",
                    boxShadow: "0 0 10px #ddd",
                    position: "relative"
                }}
                onClick={() => {
                    setBodyPart(item);
                    window.scrollTo({ top: 1800, left: 100, behavior: "smooth" })
                }}
            >
                <img style={{ opacity: bodyPart === item ? .6 : .3 }} className="bg-image" src={image} alt={item} loading="lazy" />
                <img src={Icon} alt="dumbbell" style={{ width: "40px", height: "40px" }} />
                <Typography fontSize="24px" fontWeight="bold" color="#3a1212" textTransform="capitalize">
                    {item}
                </Typography>
            </Stack>
        </>
    )
}

export default BodyPart