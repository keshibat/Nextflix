import Head from "next/head"
import styles from "../styles/Home.module.css"
import Banner from "../components/banner/banner"
import NavBar from "../components/nav/navbar"
import SectionCards from "../components/card/section-cards"

import { getVideos, getPopularVideos, getWatchItAgainVideos } from "../lib/videos"


export async function getServerSideProps() {
  const userId = "";
  const token = "";
  const wathItAgainVideos = await getWatchItAgainVideos;
  const disneyVideos = await getVideos("disney%20trailer");
  const productivityVideos = await getVideos("Productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();
  // const popularVideos = await getVideos("disney trailer");
  return {
     props: { disneyVideos,  productivityVideos, travelVideos, popularVideos, wathItAgainVideos }
  }
}

export default function Home({disneyVideos, productivityVideos, travelVideos, popularVideos, wathItAgainVideos}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar username="kenery"/>
        <Banner
                videoId="CaimKeDcudo"
                title="Pulp Fiction"
                subTitle="test test subtitles"
                imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Watch it again" videos={wathItAgainVideos} size="small" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  )
}
