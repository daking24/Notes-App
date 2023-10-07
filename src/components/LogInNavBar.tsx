import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as Api from "../network/api";

interface LogInNavBarProps {
  user: User,
  onLogOut: () => void
}

const LogInNavBar = ({ user, onLogOut }: LogInNavBarProps) => {

  async function logout() {
    try {
      await Api.logout();
      onLogOut();
    } catch (error) {
      console.error(error);
      alert(error);

    }
  }
  return (
    <>
      <Navbar.Text className="me-2">
        Signed in as: {user.username}
      </Navbar.Text>
      <Button onClick={logout}>Log Out</Button>
    </>
  );
}

export default LogInNavBar;