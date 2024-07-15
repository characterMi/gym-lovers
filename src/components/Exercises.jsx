import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { exerciseOptions, fetchData } from '../utils/fetchData';
import { Error, ExerciseCard, Loader } from './';

const EXERCISES_PER_PAGE = 9;

const Exercises = ({ setExercises, exercises, bodyPart, loading, setLoading }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  const bodyPartFromQueryParams = searchParams.get("bodyPart");
  const search = searchParams.get("search");

  const paginate = (_, value) => {
    setSearchParams({ bodyPart: bodyPartFromQueryParams, page: value, search })
    setCurrentPage(page)
    window.scrollTo({
      top: 1800, behavior: "smooth"
    })
  };

  const indexOfLastExercise = currentPage * EXERCISES_PER_PAGE;
  const indexOfFirstExercise = indexOfLastExercise - EXERCISES_PER_PAGE;
  const currentExercise = exercises.length > 0 ? exercises.slice(indexOfFirstExercise, indexOfLastExercise) : exercises

  useEffect(() => {
    if (!page || page < 0) {
      search
        ? setSearchParams({ bodyPart: bodyPartFromQueryParams, page: "1", search })
        : setSearchParams({ bodyPart: bodyPartFromQueryParams, page: "1" })
    }

    setCurrentPage(page)
  }, [page]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      setLoading(true)
      if (bodyPart === "all") {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?offset=0&limit=3000', exerciseOptions)
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?offset=0&limit=3000`, exerciseOptions)
      }
      setLoading(false)

      if (exercisesData) {
        setExercises(exercisesData)
      } else {
        setExercises([])
      }
    }

    fetchExercisesData()
  }, [bodyPart])

  return (
    <Box
      id="exercises"
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
            {exercises?.length > 9 && (
              <Pagination
                color="error"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(exercises.length / EXERCISES_PER_PAGE)}
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