import "../styles/globals.css"
import { ChatDappProvider } from "@/context/ChatDappContext"
import { NavBar } from "@/components/index.js"

const MyApp = ({Component, pageProps}) => {
  return (
    <div>
    <ChatDappProvider >
    <NavBar />
        <Component {...pageProps} />
        </ChatDappProvider>
    </div>
  )
}

export default MyApp