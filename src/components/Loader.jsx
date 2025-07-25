import { Stack } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => (
  <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    width="100%"
  >
    <InfinitySpin color="#ff2625" />
  </Stack>
);

export default Loader;
