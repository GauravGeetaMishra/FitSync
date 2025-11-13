import { getConnectionObject } from "../Config/dbConfig.js";

export async function getWorkouts(req,res){
    try {
        const connection = getConnectionObject()
        const qry = `SELECT * FROM workout`;
        const [rows] = await connection.query(qry);
        res.status(200).send(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Something went wrong"});
    }
}

export async function getWorkoutById(req,res){
    try {
        const connection = getConnectionObject()
        const id = req.params.workout_id;
        const qry = `SELECT * FROM workout where workout_id = ${id}`;
        const [rows] = await connection.query(qry);
        res.status(200).send(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Something went wrong"});
    }
}
 

export async function setWorkout(req,res){
    try {
        const connection = getConnectionObject();
        const {name, category, description, duration_min, calories_burn} = req.body;
        const qry = `INSERT INTO workout(name, category, description, duration_min, calories_burn) VALUES('${name}', '${category}', '${description}', ${duration_min}, ${calories_burn});`;
        const [result] = await connection.query(qry);
        if(result.affectedRows === 0){
            res.status(400).send({message:"Wrong input"});
        }else{
            res.status(200).send({messge:"Workout added successfully"});
        }
    } catch (error) {
        console.log(error);
        if (error.errno === 1062) {
            res.status(400).send({ message: 'Workout with this id already exists' });
        }
        else {
            res.status(500).send({ message: 'Something went wrong' });
        }
    }
}

export async function deleteWorkout(req,res){
    try {
        const connection = getConnectionObject();
        const id = req.params.workout_id;
        const qry = `delete from workout where workout_id = ${id};`;
        const [result] = await connection.query(qry);
        if(result.affectedRows === 1){
            res.status(200).send({message:" 1 row deleted successfuly"});
        }else{
            res.status(400).send({message:"already deleted or not exists"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong' });
    }
}


