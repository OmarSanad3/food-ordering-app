
import styles from './Error.module.css';
export default function Error() {
  return (
     <div className={styles.errorContainer}>
     <div className={styles.errorMessage}>
       Error: Something went wrong!
     </div>
   </div>
  )
}
