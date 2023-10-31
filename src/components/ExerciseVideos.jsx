import { Box, Typography } from "@mui/material";
import { Loader, Error } from "./"


const ExerciseVideos = ({ exerciseVideos, name, loading }) => {


  return (
    <Box p="20px" sx={{ marginTop: { lg: "200px", xs: "20px" } }}>
      <Typography sx={{ fontSize: { xs: "24px", sm: "28px", md: "32px", lg: "38px" }, fontWeight: "bold" }} mb="33px">
        Watch <span style={{ color: "#ff2625", textTransform: "capitalized" }}>{name}</span> exercise Videos
      </Typography>
      {loading ? <Loader /> :
        <Box>
          {exerciseVideos.length > 0 ?
            <Box className="exercise-video-container" component="div"
              sx={{
                flexDirection: { sm: "row" },
                gap: { lg: "30px", xs: "10px" }
              }}>
              {exerciseVideos?.slice(0, 6).map((item, index) => (
                <a key={index} className='exercise-video' target='_blank' rel="noreferrer" href={`https://www.youtube.com/watch?v=${item.video.videoId}`}>
                  <img src={item.video.thumbnails[0].url} alt={item.video.title} />
                  <Box>
                    <Typography sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px", lg: "22px" } }} color="#000">
                      {item.video.title.length > 40 ? `${item.video.title.substring(0, 40)}...` : item.video.title}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "22px" } }} color="#000">
                      {item.video.channelName}
                    </Typography>
                  </Box>
                </a>
              ))}
            </Box> :
            <Error message="Something went wrong ! Please check your connection" />
          }
        </Box>
      }
    </Box>
  )
}

export default ExerciseVideos