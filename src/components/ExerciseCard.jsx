import { Link } from 'react-router-dom'
import { Button, Stack, Typography, Box } from "@mui/material"

const ExerciseCard = ({ exercise }) => {
    return (
        <>
            <Box mt={3}>
                <Link onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })} style={{boxShadow: "0 0 10px #ddd"}} className="exercise-card" to={`/exercise/${exercise.id}`}>
                    <img src={exercise.gifUrl} alt={exercise.name} />
                    <Stack direction="row">
                        <Button sx={{ ml: '21px', color: "#fff", background: "#ff2625", fontSize: '14px', borderRadius: "20px", textTransform: "capitalize" }}>
                            {exercise.bodyPart}
                        </Button>
                        <Button sx={{ ml: '10px', color: "#fff", background: "#fcc757", fontSize: '14px', borderRadius: "20px", textTransform: "capitalize" }}>
                            {exercise.target}
                        </Button>
                    </Stack>
                    <Typography ml="21px" color="#000" fontWeight="bold" mt="11px" pb="10px" textTransform="capitalize" fontSize="22px">
                        {exercise.name}
                    </Typography>
                </Link>
            </Box>
        </>
    )
}

export default ExerciseCard