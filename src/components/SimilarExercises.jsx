import { Box, Stack, Typography } from "@mui/material";
import {HorizontalScrollbar, Loader, Error} from "./"


const SimilarExercises = ({ equipmentMuscleExercises, targetMuscleExercises, loading }) => {
  return (
    <Box p="20px" sx={{ mt: { lg: "100px", xs: "0" } }}>
      <Typography mb={1} sx={{ fontSize: { xs: "24px", sm: "34px", md: "36px" } }}>
        Exercises that target the same muscle group
      </Typography>
      {loading ? <Loader /> :
        <Stack sx={{ p: "2", position: "relative" }}>
          {targetMuscleExercises.length > 0 ? <HorizontalScrollbar data={targetMuscleExercises} /> : <Error message="Something went wrong ! Please check your connection" />}
        </Stack>
      }
      <Typography mb={1} mt={5} sx={{ fontSize: { xs: "24px", sm: "34px", md: "36px" } }}>
        Exercises that use the same equipment
      </Typography>
      {loading ? <Loader /> :
        <Stack sx={{ p: "2", position: "relative" }}>
          {equipmentMuscleExercises.length > 0 ? <HorizontalScrollbar data={equipmentMuscleExercises} /> : <Error message="Something went wrong ! Please check your connection" />}
        </Stack>
      }
    </Box>
  )
}

export default SimilarExercises