import { Container } from "react-bootstrap";
import LogInNotePage from "../components/LogInNotePage";
import LogOutNotePage from "../components/LogOutNotePage";
import { User } from "../models/user";
import styles from "../styles/NotesPage.module.css";


interface NotePageProps {
  authUser: User | null,
}
const NotePage = ({ authUser }: NotePageProps) => {
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