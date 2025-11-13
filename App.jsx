import { useLocation, Routes, Route } from "react-router-dom";
import { RegisterUser } from "./Components/RegisterUser";
import { NavBar } from "./Components/NavBar";
import { Home } from "./Components/Home";
import { UpdateUser } from "./Components/UpdateUser";
import { ToastContainer } from "react-toastify";
import { Workout } from "./Components/Workout";
import { Login } from "./Components/Login";
import {PrivateRoute} from "./Components/PrivateRoute"
import { ROLES } from "./constants/RoleConstant";
import { AboutUs } from "./Components/AboutUs.jsx";
import "./index.css";
import { Gallery } from "./Components/Gallery.jsx";
import { ShowAdmins } from "./Components/ShowAdmins.jsx";
import { RegisterAdmin } from "./Components/RegisterAdmin.jsx";
import { UpdateAdmin } from "./Components/UpdateAdmin.jsx";
import { Do_Workout } from "./Components/Do_Workout.jsx";
import { ShowUserWorkout } from "./Components/ShowUserWorkout.jsx";
import { Footer } from "./Components/Footer.jsx";
import { FeedBack } from "./Components/FeedBack.jsx";
import { ShowUserDetails } from "./Components/ShowUserDetails.jsx";



function App() {

  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" ? <NavBar /> : null}
      
      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/gallery" element={<Gallery/>}/>
        </Route>
           <Route element={<PrivateRoute allowedRoles={[ROLES.USER]} />}>
         
          <Route path="/workout" element={<Workout />} />
          <Route path="/showUserWorkout" element={<ShowUserWorkout />} />
          <Route path="/workout/:user_id/:workout_id" element={<Do_Workout/>} />
          <Route path="/feedback" element={<FeedBack/>} />
        </Route>

        <Route element={<PrivateRoute  allowedRoles={[ROLES.ADMIN]}/>} >  
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/showUserDetails" element={<ShowUserDetails/>} />
          <Route path="/showAdmin" element={<ShowAdmins/>}/>
          <Route path="/admin-register" element={<RegisterAdmin/>} />
          <Route path="/edit-user/:id" element={<UpdateUser />} />
          <Route path="/edit-admin/:id" element={<UpdateAdmin />} />
        </Route>
      </Routes>
      {location.pathname !== "/" ? <Footer /> : null}
      <ToastContainer />
    </div>
  );
}

export default App;
