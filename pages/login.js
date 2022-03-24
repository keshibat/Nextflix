import { useEffect, useState } from "react"
import Head from "next/head"
import styles from "../styles/Login.module.css"
import Image from "next/image"
import { useRouter } from 'next/router'
import { magic } from "../lib/magic-client"

const Login = () => {
  const [email, setEmail] = useState("")
  const [userMsg, setUserMsg] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)

  const router = useRouter()

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


  const handleOnChangeEmail = (e) => {
    setUserMsg("")
    const email = e.target.value
    setEmail(email)
  }

  const handleLoginWithEmail = async (e) => {
    e.preventDefault()
    if(email) {
      // log in a user by their email
        try {
          setIsLoading(true);

          const didToken = await magic.auth.loginWithMagicLink({ email });
          if(didToken) {
            const response = await fetch("/api/login", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${didToken}`,
                "Content-Type": "application/json",
              },
            });

            const loggedInResponse = await response.json();
            if(loggedInResponse.done) {
              router.push('/')
            } else {
              setIsLoading(false);
              setUserMsg("Something went wrong logging in")
            }
          }
        } catch(error) {
          console.error('something went wrong loggin in', error)
          setIsLoading(false)
          }

      } else {
          setUserMsg("Enter a valid email address")
      }
  }

  return (
  <div className={styles.container}>
    <Head>
      <title>Netflix SignIn</title>
    </Head>

    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <a className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image
              src={"/static/netflix.svg"}
              alt="Netflix logo"
              width="120"
              height="34px"
            />
          </div>
        </a>
      </div>
     </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>{isLoading ? "Loading..." : "Sign In"}</button>
        </div>
      </main>
  </div>
  )
}

export default Login