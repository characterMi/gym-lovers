import { useEffect, useState } from 'react';
import Pagination from "@mui/material/Pagination";
import { Box, Typography, Stack, useMediaQuery } from "@mui/material";
import { exerciseOptions, fetchData } from '../utils/fetchData';
import { ExerciseCard, Loader, Error } from './';

const Exercises = ({ setExercises, exercises, bodyPart, loading, setLoading }) => {

  const isMobile = useMediaQuery('(max-width:600px)')

  const [currentPage, setCurrentPage] = useState(1)
  const exercisesPerPage = 9;

  const paginate = (e, value) => {
    setCurrentPage(value)
    window.scrollTo({
      top: 1800, behavior: "smooth"
    })
  };

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercise = exercises.length > 0 ? exercises.slice(indexOfFirstExercise, indexOfLastExercise) : exercises

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];
      if (bodyPart === "all") {
        setLoading(true)
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?offset=0&limit=3000', exerciseOptions)
        setLoading(false)
      } else {
        setLoading(true)
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?offset=0&limit=3000`, exerciseOptions)
        setLoading(false)
      }

      if (exercisesData) {
        setExercises(exercisesData)
      } else {
        setExercises([])
      }
    }

    fetchExercisesData()
  }, [bodyPart])

  return (
    <Box id="exercises"
      sx={{ mt: { lg: "110px" } }}
      mt="50px"
      p="20px"
    >
      <Typography sx={{ fontSize: { xs: "24px", sm: "34px", md: "36px" } }} mb="46px">
        Showing Results
      </Typography>
      {loading ? <Loader /> :
        <Box>
          {currentExercise.length > 0 ?
            <Stack direction="row" sx={{ gap: { lg: "110px", xs: "50px" } }}
              flexWrap="wrap" justifyContent="center"
            >
              {currentExercise.map((exercise, index) => (
                <ExerciseCard key={index} exercise={exercise} />
              ))}
            </Stack> :
            <Error message="Nothing Found !" />
          }
          <Stack mt="100px" alignItems="center">
            {exercises.length > 9 && (
              <Pagination
                color="error"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(exercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={paginate}
                size={isMobile ? 'medium' : 'large'}
              />
            )}
          </Stack>
        </Box>
      }
    </Box>
  )
}

export default Exercises