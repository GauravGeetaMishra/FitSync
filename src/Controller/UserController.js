import { hashSync, compareSync } from "bcrypt";
import { getConnectionObject } from "../Config/dbConfig.js"
import jwt from "jsonwebtoken";

export async function showUsers(req,res){
    try {
        const connection = getConnectionObject();
        const qry = "SELECT * FROM user";
        const [rows] = await connection.query(qry);
        res.status(200).send(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Something went wrong"});
    }
}

export async function showUsersById(req,res){
    try {
        const connection = getConnectionObject();
        const id = req.params.id
        const qry = `SELECT * FROM user where id = ${id}`;
        const [rows] = await connection.query(qry);
        res.status(200).send(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Something went wrong"});
    }
}

export async function registerUsers(req,res){
    try {
        const connection = getConnectionObject();
        const {name, email, password, age, gender, height_cm, weight_kg} = req.body;
        const encryptedPass = hashSync(password,12);
        const qry = `INSERT INTO user(name, email, password, age, gender, height_cm, weight_kg) VALUES('${name}', '${email}', '${encryptedPass}', ${age}, '${gender}', ${height_cm}, ${weight_kg});`;
        const [result] = await connection.query(qry);
        if(result.affectedRows === 0){
            res.status(400).send({message:"Wrong input"});
        }else{
            res.status(200).send({messge:"Registered successfully"});
        }
    } catch (error) {
        console.log(error);
        if (error.errno === 1062) {
            res.status(400).send({ message: 'User with this id already exists' });
        }
        else {
            res.status(500).send({ message: 'Something went wrong' });
        }
    }
}

export async function deleteUser(req,res){
    try {
        const connection = getConnectionObject();
        const id = req.params.id;
        const qry = `delete from user where id = ${id};`;
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

export async function updateUser(req,res){
    try {
        const connection = getConnectionObject();
        const id = req.params.id;
        const {name, email, age, gender, height_cm, weight_kg} = req.body;
        const qry = `update user set name='${name}', email='${email}', age=${age}, gender='${gender}', height_cm=${height_cm}, weight_kg=${weight_kg} where id = ${id};`;
        const [result] = await connection.query(qry);
        if(result.affectedRows === 1){
            res.status(200).send({message:" User updated successfuly"});
        }else{
            res.status(400).send({message:"User not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong' });
    }
}

