import { getConnectionObject } from "../Config/dbConfig.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

export async function showAdmin(req,res){
    try {
        const connection = getConnectionObject();
        const [result] = await connection.query('SELECT * FROM admin');
        if(result.length === 0){
            res.status(400).send({message: "admin not found"});
        }else{
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send({message:"Something went wrong"});
    }
}


export async function showAdminEmail(req,res){
    try {
        const connection = getConnectionObject();
        const email = req.params.email;
        const [result] = await connection.query(`SELECT * FROM admin where email = '${email}'`);
        if(result.length === 0){
            res.status(400).send({message: "admin not found"});
        }else{
            res.status(200).send(result[0]);
        }
    } catch (error) {
        res.status(500).send({message:"Something went wrong"});
    }
}


export async function registerAdmin(req,res){
    try {
        const connection = getConnectionObject();
        const {name, email, password, gender} = req.body;
        const encryptedPass = hashSync(password,12);
        const [resultSet] = await connection.query(`INSERT INTO admin(name, email, password, gender) VALUES('${name}', '${email}', '${encryptedPass}', '${gender}');`);
        if(resultSet.affectedRows === 1){
            res.status(200).send({ message: 'Admin registered' });
        }else {
            res.status(400).send({ message: 'Admin registration failed' });
        }
    } catch (error) {
        console.log(error);
        if (error.errno === 1062) {
            res.status(400).send({ message: 'Admin with this id already exists' });
        }
        else {
            res.status(500).send({ message: 'Something went wrong' });
        }
    }
}

export async function deleteAdmin(req,res){
    try {
        const connection = getConnectionObject();
        const id = req.params.id;
        const qry = `delete from admin where id = ${id};`;
        const [result] = await connection.query(qry);
        if(result.affectedRows === 1){
            res.status(200).send({message:" deleted successfuly"});
        }else{
            res.status(400).send({message:"already deleted or not exists"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong' });
    }
}

export async function updateAdmin(req,res){
    try {
        const connection = getConnectionObject();
        const id = req.params.id;
        const {name, email, gender} = req.body;
        const qry = `update admin set name='${name}', email='${email}', gender='${gender}' where id = ${id};`;
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


export async function showAdminById(req,res){
    try {
        const connection = getConnectionObject();
        const id = req.params.id
        const qry = `SELECT * FROM admin where id = ${id}`;
        const [rows] = await connection.query(qry);
        res.status(200).send(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Something went wrong"});
    }
}