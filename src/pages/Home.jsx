import { Box } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Banner, Exercises, SearchExercises } from '../components';


const Home = ({ loading, setLoading }) => {
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const bodyPartFromQueryParams = searchParams.get("bodyPart");
  const page = searchParams.get("page");

  useEffect(() => {
    if (!bodyPartFromQueryParams) {
      setSearchParams({ bodyPart: "all", page })
    }

    setBodyPart(bodyPartFromQueryParams)
  }, [bodyPartFromQueryParams, searchParams]);

  return (
    <Box>
      <Banner />
      <SearchExercises loading={loading} setLoading={setLoading} setExercises={setExercises} setBodyPart={setBodyPart} bodyPart={bodyPart} />
      <Exercises loading={loading} setLoading={setLoading} setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
    </Box>
  )
}

export default Home;