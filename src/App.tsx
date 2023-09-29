import { useEffect, useState } from 'react';
import LogInModal from './components/LogInModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as Api from './network/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotePage from './pages/NotePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import styles from './styles/App.module.css';

function App() {

  const [logInUser, setLogInUser] = useState<User | null>(null);

  const [signUpModal, setSignUpModal] = useState(false);
  const [logInModal, setLogInModal] = useState(false);

  useEffect(() => {
    async function LoggedInUser() {
      try {
        const user = await Api.fetchUser();
        setLogInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    LoggedInUser();
  }, [])

  return (
    <BrowserRouter>
    <div>
      <NavBar
        LoggedInUser={logInUser}
        onLogInClicked={() => setLogInModal(true)}
        onSignUpClicked={() => setSignUpModal(true)}
        onLogOut={() => setLogInUser(null)} />
      <Container className={styles.appContainer}>
        <Routes>
          <Route
            path='/'
            element={<NotePage authUser={logInUser}/>}
            />
          <Route
            path='/about'
            element={<AboutPage/>}
          />
          <Route
            path='/*'
            element={<NotFoundPage/>}
          />
        </Routes>
      </Container>
      {signUpModal &&
        <SignUpModal
          onDismiss={() => setSignUpModal(false)}
          onSignUp={(user) => {
            setLogInUser(user);
            setSignUpModal(false);
          }} />
      }
      {logInModal &&
        <LogInModal
          onDismiss={() => setLogInModal(false)}
          onLogIn={(user) => {
            setLogInUser(user);
            setLogInModal(false);
           }} />}
    </div>
    </BrowserRouter>
  );
}

export default App;
