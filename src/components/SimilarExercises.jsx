import { Box, Stack, Typography } from "@mui/material";
import { Error, HorizontalScrollbar, Loader } from "./";

const Details = ({ loading, exercises }) => {
  if (loading) return <Loader />;

  if (!exercises) {
    return (
      <Error message="Something went wrong ! Please check your connection" />
    );
  }

  if (exercises.length <= 0) return <Error message="No exercise found!" />;

  return <HorizontalScrollbar data={exercises || []} />;
};

const ExercisesList = ({ loading, exercises }) => (
  <Stack sx={{ p: "2", position: "relative" }}>
    <Details loading={loading} exercises={exercises} />
  </Stack>
);

const SimilarExercises = ({
  equipmentMuscleExercises,
  targetMuscleExercises,
  loading,
}) => (
  <Box p="20px" sx={{ mt: { lg: "100px", xs: "0" } }}>
    <Typography
      mb={1}
      sx={{ fontSize: { xs: "24px", sm: "34px", md: "36px" } }}
    >
      Exercises that target the same muscle group
    </Typography>

    <ExercisesList exercises={targetMuscleExercises} loading={loading} />
    <Typography
      mb={1}
      mt={5}
      sx={{ fontSize: { xs: "24px", sm: "34px", md: "36px" } }}
    >
      Exercises that use the same equipment
    </Typography>

    <ExercisesList exercises={equipmentMuscleExercises} loading={loading} />
  </Box>
);

export default SimilarExercises;
