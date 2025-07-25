import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Detail, ExerciseVideos, SimilarExercises } from "../components";
import { useDataStore } from "../providers/DataStoreContext";
import { exerciseOptions, fetchData, youtubeOptions } from "../utils/fetchData";

const ExerciseDetail = () => {
  const { id } = useParams();

  const { getDataByUrl, setNewData } = useDataStore();

  const [loading, setLoading] = useState(true);
  const [exerciseDetail, setExerciseDetail] = useState(undefined);
  const [exerciseVideos, setExerciseVideos] = useState(undefined);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState(undefined);
  const [equipmentMuscleExercises, setEquipmentMuscleExercises] =
    useState(undefined);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDBUrl = "https://exercisedb.p.rapidapi.com";

      const getData = async (url, isYoutubeReq = false) => {
        const cachedData = getDataByUrl(url);

        if (cachedData) return cachedData;

        setLoading(true);
        const data = await fetchData(
          url,
          isYoutubeReq ? youtubeOptions : exerciseOptions
        );

        setLoading(false);
        data && setNewData(url, data);

        return data;
      };

      const exerciseDetailData = await getData(
        `${exerciseDBUrl}/exercises/exercise/${id}`
      );

      if (!exerciseDetailData) {
        setExerciseDetail(undefined);
        setExerciseVideos(undefined);
        setTargetMuscleExercises(undefined);
        setEquipmentMuscleExercises(undefined);
        return;
      }

      setExerciseDetail(exerciseDetailData);

      const [
        exerciseVideosData,
        targetMuscleExercisesData,
        equipmentMuscleExercisesData,
      ] = await Promise.allSettled([
        getData(
          `https://youtube-search-and-download.p.rapidapi.com/search?query=${exerciseDetailData.name}`,
          true
        ),
        getData(
          `${exerciseDBUrl}/exercises/target/${exerciseDetailData.target}`
        ),
        getData(
          `${exerciseDBUrl}/exercises/equipment/${exerciseDetailData.equipment}`
        ),
      ]);

      setExerciseVideos(exerciseVideosData.contents || []);
      setTargetMuscleExercises(targetMuscleExercisesData);
      setEquipmentMuscleExercises(equipmentMuscleExercisesData);
    };

    fetchExercisesData();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>
          Gym Lovers |{" "}
          {loading
            ? "(loading...)"
            : exerciseDetail?.name
            ? `${exerciseDetail.name} Exercise`
            : "(error...)"}
        </title>
      </Helmet>

      <Detail loading={loading} exerciseDetail={exerciseDetail} />

      <ExerciseVideos
        loading={loading}
        exerciseVideos={exerciseVideos}
        name={exerciseDetail?.name}
      />

      <SimilarExercises
        loading={loading}
        targetMuscleExercises={targetMuscleExercises}
        equipmentMuscleExercises={equipmentMuscleExercises}
      />
    </>
  );
};

export default ExerciseDetail;
