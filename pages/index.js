import Head from "next/head"
import styles from "../styles/Home.module.css"
import Banner from "../components/banner/banner"
import NavBar from "../components/nav/navbar"
import SectionCards from "../components/card/section-cards"

import { getVideos } from "../lib/videos"

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney%20trailer");
  const productivityVideos = await getVideos("Productivity");
  const travelVideos = await getVideos("travel");
  // const popularVideos = await getVideos("disney trailer");
  return {
     props: { disneyVideos,  productivityVideos, travelVideos}
  }
}

export default function Home({disneyVideos, productivityVideos, travelVideos}) {
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
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Travel" videos={travelVideos} size="small" />
        <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
        <SectionCards title="Popular" videos={[]} size="small" />
      </div>

    </div>
  )
}
