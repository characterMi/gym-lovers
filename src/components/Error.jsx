import { Typography } from '@mui/material'

const Error = ({ message }) => {
    return (
        <Typography textAlign="center" mt="40px" sx={{ fontSize: { xs: "22px", lg: "30px" }, textDecoration: "underline", textDecorationColor: "#ff2625" }}>{message}</Typography>
    )
}

export default Error