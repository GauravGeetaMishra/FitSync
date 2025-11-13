import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../Services/TokenService";
import { getRole, removeRole } from "../Services/RoleService";
import { ROLES } from "../constants/RoleConstant";
import { removeEmail } from "../Services/EmailService";
import { removeId } from "../Services/IdService";
import "../Styles/Styles/NavigationBar.css";

export function NavBar() {
  const role = getRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeRole();
    removeId();
    removeEmail();
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="custom-navbar shadow-lg" fixed="top">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        >
          <h2 className="navbar-brand-text">FitSync</h2>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto custom-nav-links">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Dashboard
            </NavLink>

            {role === ROLES.ADMIN ? (
              <>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Register User
                </NavLink>

                <NavLink
                  to="/showUserDetails"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Users List
                </NavLink>

                <NavLink
                  to="/showAdmin"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Show Admin
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/workout"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Workout
                </NavLink>

                  <NavLink
                  to="/feedback"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Feedback
                </NavLink>

              </>
            )}

            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Gallery
            </NavLink>

            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About Us
            </NavLink>
          </Nav>
        </Navbar.Collapse>

        <Button
          variant="success"
          onClick={handleLogout}
          style={{
            backgroundColor: "#00b4d8",
            border: "none",
            borderRadius: "25px",
            padding: "10px 28px",
            fontSize: "1rem",
          }}
        >
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}
