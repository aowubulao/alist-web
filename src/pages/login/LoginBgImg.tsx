import { Box, useColorModeValue } from "@hope-ui/solid"
import CornerBottom from "./CornerBottom"
import CornerTop from "./CornerTop"

const LoginBgImg = () => {
  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      overflow="hidden"
      zIndex="-1"
      w="100vw"
      h="100vh"
    >
      <Box
        pos="absolute"
        css={{
          background: "url(https://img.neoniou.com/pixiv/82542737_p0.jpg)",
        }}
      ></Box>
    </Box>
  )
}

export default LoginBgImg
