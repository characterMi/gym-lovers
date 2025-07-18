import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import BodyPartImage from "../assets/icons/body-part.png";
import EquipmentImage from "../assets/icons/equipment.png";
import TargetImage from "../assets/icons/target.png";
import { Error, Loader } from "./";

const Detail = ({ exerciseDetail, loading }) => {
  if (loading) return <Loader />;

  if (!exerciseDetail)
    return (
      <Error message="Something went wrong ! Please check your connection" />
    );

  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
      detail: "Body part",
    },
    {
      icon: TargetImage,
      name: target,
      detail: "Target",
    },
    {
      icon: EquipmentImage,
      name: equipment,
      detail: "Equipment",
    },
  ];

  return (
    <Stack
      mt="80px"
      gap="60px"
      sx={{
        WebkitBoxOrient: { md: "horizontal" },
        WebkitBoxDirection: { md: "normal" },
        WebkitFlexDirection: { md: "row" },
        MozBoxOrient: { md: "horizontal" },
        MozBoxDirection: { md: "normal" },
        msFlexDirection: { md: "row" },
        flexDirection: { md: "row" },
        p: "20px",
        alignItems: "center",
      }}
    >
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />

      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography sx={{ fontSize: { xs: "30px", sm: "44px" } }}>
          {name}
        </Typography>

        <Typography variant="h6">
          Exercises keep you strong.{" "}
          <mark
            style={{
              background: "none",
              textDecoration: "underline",
              textDecorationColor: "#ff2625",
              MozTextDecorationColor: "#ff2625",
              WebkitTextDecorationColor: "#ff2625",
            }}
          >
            {name}
          </mark>{" "}
          is one of the best exercises to target your {target}. It will help you
          improve your mood and gain energy.
        </Typography>

        {extraDetail.map((item, index) => (
          <Stack key={index} direction="row" gap="24px" alignItems="center">
            <Tooltip title={item.detail} arrow>
              <Button
                sx={{
                  background: "#fff2db",
                  borderRadius: "50%",
                  MozBorderRadius: "50%",
                  WebkitBorderRadius: "50%",
                  width: { xs: "75px", sm: "100px" },
                  height: { xs: "75px", sm: "100px" },
                }}
              >
                <Box
                  component="img"
                  src={item.icon}
                  alt={bodyPart}
                  sx={{ height: { xs: "35px", sm: "50px" } }}
                />
              </Button>
            </Tooltip>
            <Typography
              textTransform="capitalize"
              sx={{ fontSize: { xs: "18px", sm: "24px" } }}
            >
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;
