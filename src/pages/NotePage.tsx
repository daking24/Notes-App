import { Container } from "react-bootstrap";
import styles from "../styles/NotesPage.module.css";
import LogInNotePage from "../components/LogInNotePage";
import LogOutNotePage from "../components/LogOutNotePage";
import { User } from "../models/user";


interface NotePageProps{
  authUser: User|null,
}
const NotePage = ({authUser}:NotePageProps) => {
  return ( 
    <Container className={styles.notesPage}>
      <>
        {authUser
          ? <LogInNotePage />
          : <LogOutNotePage />
        }
      </>
    </Container>
   );
}
 
export default NotePage;