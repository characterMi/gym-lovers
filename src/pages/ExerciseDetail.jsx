import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from "@mui/material"
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import { Detail, ExerciseVideos, SimilarExercises } from '../components';


const ExerciseDetail = ({ loading, setLoading }) => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([])
  const [equipmentMuscleExercises, setEquipmentMuscleExercises] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDBUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = "https://youtube-search-and-download.p.rapidapi.com"
      setLoading(true);
      const exerciseDetailData = await fetchData(`${exerciseDBUrl}/exercises/exercise/${id}`, exerciseOptions)
      setLoading(false)
      if (exerciseDetailData) {
        setExerciseDetail(exerciseDetailData)
      } else {
        setExerciseDetail({})
      }


      if (exerciseDetailData) {
        setLoading(true)
        const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions)
        setLoading(false)
        if (exerciseVideosData) {setExerciseVideos(exerciseVideosData.contents)} else setExerciseVideos([])
        setLoading(true)
        const targetMuscleExercisesData = await fetchData(`${exerciseDBUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
        setLoading(false)
        if (exerciseVideosData) {setTargetMuscleExercises(targetMuscleExercisesData)} else setTargetMuscleExercises([])
        setLoading(true)
        const equipmentMuscleExercisesData = await fetchData(`${exerciseDBUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
        setLoading(false)
        if (exerciseVideosData) {setEquipmentMuscleExercises(equipmentMuscleExercisesData)} else setEquipmentMuscleExercises([])
        
      } else {
        setExerciseVideos([])
        setTargetMuscleExercises([])
        setEquipmentMuscleExercises([])
      }
    }
    fetchExercisesData()
  }, [id])


  return (
    <Box>
      <Detail loading={loading} exerciseDetail={exerciseDetail} />
      <ExerciseVideos loading={loading} exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises loading={loading} targetMuscleExercises={targetMuscleExercises} equipmentMuscleExercises={equipmentMuscleExercises} />
    </Box>
  )
}

export default ExerciseDetail