import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner/banner';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Nextflix</h1>
      <Banner title="Pulp Fiction"
              subTitle="test test subtitles"
              imgUrl="/static/clifford.webp"
      />
    </div>
  )
}
