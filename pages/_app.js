import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { magic } from "../lib/magic-client";
import "../styles/globals.css"

import Loading from "../components/loading/loading"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
    }
    router.events.on('routerChangeComplete', handleComplete);
    router.events.on('routerChangeError', handleComplete);

    return () => {
      router.events.off("routerChangeComplete", handleComplete);
      router.events.off("routerChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp
