import { Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Icon from "../assets/icons/gym.png";


const BodyPart = ({ item, bodyPart, setBodyPart, image }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const bodyPartFromQueryParams = searchParams.get("bodyPart");

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
                    MozBorderRadius: "0 40px 0 40px",
                    WebkitBorderRadius: "0 40px 0 40px",
                    borderRadius: "0 40px 0 40px",
                    width: { xs: "200px", sm: "270px" },
                    height: { xs: "210px", sm: "280px" },
                    cursor: "pointer",
                    gap: "47px",
                    MozBoxShadow: "0 0 10px #ddd",
                    WebkitBoxShadow: "0 0 10px #ddd",
                    boxShadow: "0 0 10px #ddd",
                    position: "relative"
                }}
                onClick={() => {
                    setSearchParams({ bodyPart: item, page: "1" })
                    setBodyPart(bodyPartFromQueryParams);
                    window.scrollTo({ top: 1800, left: 100, behavior: "smooth" })
                }}
            >
                <img style={{ opacity: bodyPart === item ? .6 : .3 }} className="bg-image" src={image} alt={item} />
                <img src={Icon} alt="dumbbell" style={{ width: "40px", height: "40px" }} />
                <Typography fontSize="24px" fontWeight="bold" color="#3a1212" textTransform="capitalize">
                    {item}
                </Typography>
            </Stack>
        </>
    )
}

export default BodyPart