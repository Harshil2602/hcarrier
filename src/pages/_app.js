import "@/styles/globals.css";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";

import { Poppins } from "next/font/google";
import { UserInfoContextProvider } from "@/Context/userInfo/UserInfoContext";

// If loading a variable font, you don't need to specify the font weight

const roboto = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main>
        <UserInfoContextProvider>
          <Component {...pageProps} />
        </UserInfoContextProvider>
        <Footer />
      </main>
    </>
  );
}
