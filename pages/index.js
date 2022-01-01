import Head from "next/head"
import styles from "../styles/Home.module.css"
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar username="kenery"/>
      <Banner title="Pulp Fiction"
              subTitle="test test subtitles"
              imgUrl="/static/clifford.webp"
      />
    </div>
  )
}
