import { useRouter } from "next/router"
import Modal from 'react-modal';
import styles from "../../styles/Video.module.css"
import clsx from "classnames"
import NavBar from "../../components/nav/navbar"
import { getYoutubeVideoById } from "../../lib/videos"

Modal.setAppElement('#__next');

export async function getStaticProps(context) {
  const videoId = context.params.videoId
  const videoArray = await getYoutubeVideoById(videoId);
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10, // In seconds
  }
}


export async function getStaticPaths() {
  const listOfVideos = ["ppjUUwffYP8", "P_M0zruGWbA", "GNG6ZzDh9C8"]
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }))
  return { paths, fallback: 'blocking' }
}

const Video = ({video}) => {
  const router = useRouter()

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = {viewCount: 0 },
  } = video;
  return (
  <div className={styles.container}>
    <NavBar />
    <Modal
        isOpen={true}
        contentLabel="watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
    >
      <iframe id="player" type="text/html" width="100%" height="360"
              className={styles.videoPlayer}
              src={`http://www.youtube.com/embed/${router.query.videoId}?autoplay=1&enablejsapi=1&origin=http://example.com&controls=0&rel=1`}
              frameBorder="0">
      </iframe>
      <div className={styles.modalBody}>
        <div className={styles.modalBodyContent}>
          <div className={styles.col1}>
            <p className={styles.publishTime}>{publishTime}</p>
            <p className={styles.channelTitle}>{title}</p>
            <p className={styles.channelTitle}>{description}</p>
          </div>
          <div className={styles.col2}>
            <p className={clsx(styles.subText, styles.subTextWrapper)}>
              <span className={styles.infoText}>Cast: </span>
              <span className={styles.channelTitle}>{channelTitle}</span>
            </p>
            <p className={clsx(styles.subText, styles.subTextWrapper)}>
              <span className={styles.infoTextKey}>View Count: </span>
              <span className={styles.channelTitle}>{viewCount}</span>
            </p>
          </div>
        </div>
      </div>
      </Modal>
    </div>
  )
};

export default Video;