import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import LogInNavBar from "./LogInNavBar";
import LogOutNavBar from "./LogOutNavBar";

interface NavBarProps {
  LoggedInUser: User | null,
  onSignUpClicked: () => void,
  onLogInClicked: () => void,
  onLogOut: () => void
}

const NavBar = ({ LoggedInUser, onSignUpClicked, onLogInClicked, onLogOut }: NavBarProps) => {
  return (
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/"> 
            Notes App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav>
            <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {LoggedInUser
              ? <LogInNavBar user={LoggedInUser} onLogOut={onLogOut} />
              : <LogOutNavBar onLogIn={onLogInClicked} onSignUp={onSignUpClicked}/>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
 
export default NavBar;