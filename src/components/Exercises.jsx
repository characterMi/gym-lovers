import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "../hooks/useSearchParams";
import { useDataStore } from "../providers/DataStoreContext";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import { Error, ExerciseCard, Loader } from "./";

const EXERCISES_PER_PAGE = 9;

const Results = ({ loading, exercises }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { param: page, handleChangeSearchParam } = useSearchParams(
    "page",
    (newValue) => setCurrentPage(Number(newValue) || 1)
  );
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);

  const paginate = (_, value) => {
    const exercisesEl = document.getElementById("exercises");
    handleChangeSearchParam(value);

    const scrollTo = (offset) =>
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });

    setCurrentPage(value);
    if (exercisesEl) scrollTo(exercisesEl.offsetTop);
    else scrollTo(1800);
  };

  if (loading) return <Loader />;

  if (exercises.length <= 0) return <Error message="Nothing Found !" />;

  const indexOfLastExercise = currentPage * EXERCISES_PER_PAGE;
  const indexOfFirstExercise = indexOfLastExercise - EXERCISES_PER_PAGE;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  return (
    <>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Stack>

      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="error"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / EXERCISES_PER_PAGE)}
            page={currentPage}
            onChange={paginate}
            size={isMobile ? "medium" : "large"}
          />
        )}
      </Stack>
    </>
  );
};

const Exercises = ({
  setExercises,
  exercises,
  bodyPart,
  loading,
  setLoading,
}) => {
  const { getDataByUrl, setNewData } = useDataStore();

  useEffect(() => {
    const allBodyPartsUrl =
      "https://exercisedb.p.rapidapi.com/exercises?offset=0&limit=3000";
    const specificBodyPartUrl = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?offset=0&limit=3000`;

    const fetchExercisesData = async () => {
      const getData = async (url) => {
        const cachedData = getDataByUrl(url);

        if (cachedData) return cachedData;

        setLoading(true);
        const data = await fetchData(url, exerciseOptions);

        data && setNewData(url, data);
        setLoading(false);

        return data || [];
      };

      const exercisesData = await getData(
        bodyPart === "all" ? allBodyPartsUrl : specificBodyPartUrl
      );

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography
        sx={{ fontSize: { xs: "24px", sm: "34px", md: "36px" } }}
        mb="46px"
      >
        Showing Results
      </Typography>

      <Results exercises={exercises} loading={loading} />
    </Box>
  );
};

export default Exercises;
