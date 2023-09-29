import { Button } from "react-bootstrap";

interface LogOutNavBarProps {
  onLogIn: () => void,
  onSignUp: () => void,
}

const LogOutNavBar = ({onLogIn, onSignUp}: LogOutNavBarProps) => {
  return (
    <>
      <Button onClick={onLogIn}>Log In</Button>
      <Button onClick={onSignUp}>Sign Up</Button>
    </>
    );
}
 
export default LogOutNavBar;