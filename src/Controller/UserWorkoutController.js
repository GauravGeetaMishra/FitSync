import { getConnectionObject } from "../Config/dbConfig.js";

export async function setUserWorkout(req,res){
    try {
        const connection = getConnectionObject();
        const user_id = req.params.user_id; 
        const workout_id = req.params.workout_id;
        const {duration_min, calories_burn} = req.body;
        const qry = `INSERT INTO user_workout(user_id, workout_id, duration_min, calories_burn) VALUES(${user_id}, ${workout_id}, ${duration_min}, ${calories_burn});`;
        const [result] = await connection.query(qry);
        if(result.affectedRows === 0){
            res.status(400).send({message:"Unable to start workout"});
        }else{
            res.status(200).send({messge:"Workout started successfully"});
        }
    } catch (error) {
         res.status(500).send({ message: 'Something went wrong' });
    }
}

export async function getUserWorkout(req,res){
    try {
        const connection = getConnectionObject();
        const user_id = req.params.user_id;
        // const today = new Date().toISOString().split('T')[0];
        const qry = `Select name, age, gender, sum(duration_min) as total_workout, sum(calories_burn) as total_calories_burn from user_workout w join user u on u.id = w.user_id  where user_id = ${user_id} group by u.id`;
        const [row] = await connection.query(qry);
        if(row[0].total_workout === null){
            res.status(400).send({message:"Not doing workout"});
        }else{
            console.log(row[0])
             res.status(200).send({row, messge:"Workout completed successfully"});
        }
    } catch (error) {
        console.log(error)
         res.status(500).send({ message: 'Something went wrong' });
    }
}


export async function getAllUserWorkout(req,res){
    try {
        const connection = getConnectionObject();
        const qry = `Select name, age, gender, sum(duration_min) as total_duration, sum(calories_burn) as total_calories_burn from user_workout w join user u on u.id = w.user_id group by u.id;`;
        const [row] = await connection.query(qry);
        if(row[0].total_workout === null){
            console.log(row.total_workout)
            res.status(400).send({message:"Not doing workout"});
        }else{
            console.log(row[0])
             res.status(200).send({row, messge:"Workout completed successfully"});
        }
    } catch (error) {
        console.log(error)
         res.status(500).send({ message: 'Something went wrong' });
    }
}