import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { StrictMode } from "react"
import { render } from "react-dom"
import { RecoilRoot } from "recoil"
import App from "./App"

const theme = extendTheme({
  colors: {
    brand: {
      red: "#EE748F",
      blue: "#2C54EA",
      darkBlue: "#272D45",
      lightGray: "#DBE1E6",
      mediumGray: "#8C9DB5",
      darkGray: "#202437",
    },
  },
})

render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root")
)
