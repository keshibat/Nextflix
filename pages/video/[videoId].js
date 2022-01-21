import { useRouter } from "next/router"
import Modal from 'react-modal';
import styles from "../../styles/Video.module.css"

Modal.setAppElement('#__next');

const Video = () => {
  const router = useRouter()
  console.log({router});
  return (
  <div className={styles.container}>
    <Modal
        isOpen={true}
        contentLabel="watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={StyleSheet.overlay}
    >
        <div>Modal Body</div>
      </Modal>
    </div>
  )
};

export default Video;
