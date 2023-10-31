import { Typography, Stack, Button, Box, Tooltip } from "@mui/material"
import BodyPartImage from "../assets/icons/body-part.png"
import TargetImage from "../assets/icons/target.png"
import EquipmentImage from "../assets/icons/equipment.png"
import { Helmet } from 'react-helmet-async';
import { Loader, Error } from './';

const Detail = ({ exerciseDetail, loading }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;
  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
      detail: "Body part"
    },
    {
      icon: TargetImage,
      name: target,
      detail: "Target"
    },
    {
      icon: EquipmentImage,
      name: equipment,
      detail: "Equipment"
    },
  ]
  return (
    <>
      <Helmet>
        {exerciseDetail.name ?
          <title>
            Gym Lovers | Exercise {name}
          </title> :
          <title>
            Gym Lovers | Exercise
          </title>
        }
      </Helmet>
      {loading ? <Loader /> :
        <Box mt="80px">
          {exerciseDetail.name ?
            <Stack gap="60px" sx={{ flexDirection: { md: "row", }, p: "20px", alignItems: "center" }}>
              <img src={gifUrl} alt={name} loading='lazy' className='detail-image' />
              <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
                <Typography sx={{ fontSize: { xs: "30px", sm: "44px" } }}>
                  {name}
                </Typography>
                <Typography variant="h6">
                  Exercises keep you strong. <mark style={{ background: "none", textDecoration: "underline", textDecorationColor: "#ff2625" }}>{name}</mark> is one of the best exercises to target your {target}. It will help you improve your mood and gain energy.
                </Typography>
                {extraDetail.map((item, index) => (
                  <Stack key={index} direction="row" gap="24px" alignItems="center">
                    <Tooltip title={item.detail} arrow>
                      <Button sx={{ background: "#fff2db", borderRadius: "50%", width: {xs: "75px", sm: "100px"}, height: {xs: "75px", sm: "100px"} }}>
                        <Box component="img" src={item.icon} alt={bodyPart} sx={{ height: {xs: "35px", sm: "50px"} }} />
                      </Button>
                    </Tooltip>
                    <Typography textTransform="capitalize" sx={{ fontSize: {xs: "18px", sm: "24px"} }}>
                      {item.name}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack> :
            <Error message="Something went wrong ! Please check your connection" />
          }
        </Box>
      }
    </>
  )
}

export default Detail;