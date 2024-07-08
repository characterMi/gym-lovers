import { Typography } from '@mui/material'

const Error = ({ message }) => (
    <Typography
        textAlign="center"
        mt="40px"
        sx={{
            fontSize: { xs: "22px", lg: "30px" },
            textDecoration: "underline",
            textDecorationColor: "#ff2625",
            MozTextDecorationColor: "#ff2625",
            WebkitTextDecorationColor: "#ff2625"
        }}
    >
        {message}
    </Typography>
)

export default Error