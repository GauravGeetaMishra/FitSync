import express from 'express';
import { connectDB } from './src/Config/dbConfig.js';
import {deleteAdmin, registerAdmin, showAdmin, showAdminById, showAdminEmail, updateAdmin} from './src/Controller/AdminController.js'
import { deleteUser, registerUsers, showUsers, showUsersById, updateUser} from './src/Controller/UserController.js';
import { deleteWorkout, getWorkoutById, getWorkouts, setWorkout } from './src/Controller/WorkoutController.js';
import cors from 'cors'; 
import { authorize, verifyToken } from './src/MiddleWare/VerifyToken/verifyToken.js';
import { login } from './src/Controller/LoginController.js';
import { ROLES } from './src/Constants/RoleConstants.js';
import { getAllUserWorkout, getUserWorkout, setUserWorkout } from './src/Controller/UserWorkoutController.js';
import { setFeedback, showFeedbacks } from './src/Controller/FeedbackController.js';

const app = express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send({message:"Hello"});
})

//Admin
app.get("/admin", verifyToken, authorize([ROLES.ADMIN]), showAdmin);
app.get("/admin/:email", verifyToken, authorize([ROLES.ADMIN]), showAdminEmail);
app.delete("/admin/:id", verifyToken, authorize([ROLES.ADMIN]), deleteAdmin)
app.post("/admin", verifyToken, authorize([ROLES.ADMIN]), registerAdmin);
app.put("/admin/:id", verifyToken, authorize([ROLES.ADMIN]), updateAdmin);
app.get("/admin-id/:id", verifyToken, authorize([ROLES.ADMIN]), showAdminById);


//User
app.get("/user", verifyToken, authorize([ROLES.ADMIN]), showUsers);

app.get("/user/:id", verifyToken, authorize([ROLES.ADMIN]), showUsersById);

app.post("/user", verifyToken, authorize([ROLES.ADMIN]), registerUsers);

app.delete("/user/:id", verifyToken, authorize([ROLES.ADMIN]), deleteUser);

app.put("/user/:id", verifyToken, authorize([ROLES.ADMIN]), updateUser)


//Workout
app.get("/workout", verifyToken, authorize([ROLES.USER]), getWorkouts);

app.get("/workout/:workout_id", verifyToken, authorize([ROLES.USER]), getWorkoutById);

app.post("/workout", verifyToken, authorize([ROLES.USER]), setWorkout);

app.delete("/workout/:workout_id", verifyToken, authorize([ROLES.USER]), deleteWorkout);


//Feedback_form
app.post("/feedback", verifyToken, authorize([ROLES.USER]), setFeedback);
app.get("/feedback", verifyToken, authorize([ROLES.ADMIN]), showFeedbacks);

 
//user_workout
app.post("/user-workout/:user_id/:workout_id", verifyToken, authorize([ROLES.USER]), setUserWorkout)

app.get("/user-workout/:user_id", verifyToken, authorize([ROLES.ADMIN, ROLES.USER]),getUserWorkout)
app.get("/user-workout", verifyToken, authorize([ROLES.ADMIN, ROLES.USER]),getAllUserWorkout)

//Login
app.post("/login",login); 


app.listen(3700,()=>{
    connectDB();
});