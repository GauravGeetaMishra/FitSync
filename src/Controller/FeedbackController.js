import { compareSync } from "bcrypt";
import { getConnectionObject } from '../Config/dbConfig.js';


export async function setFeedback(req, res) {
  try {
    const connection = getConnectionObject();
    const { email, password, feedback } = req.body;

    const [userRows] = await connection.query(`SELECT * FROM user WHERE email = '${email}'`);

    if (userRows.length === 0) {
      return res.status(400).send({ message: "Email doesn't exist" });
    }

    const user = userRows[0];
    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({ message: "Password is invalid" });
    }

    const [feedbackResult] = await connection.query(`INSERT INTO feedback_form (user_id, name, email, feedback) VALUES (${user.id}, '${user.name}', '${user.email}', '${feedback}')`);

    if (feedbackResult.affectedRows === 0) {
      return res.status(400).send({ message: "Feedback not saved" });
    }

    res.status(200).send({message: "Feedback submitted successfully!"});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
}


export async function showFeedbacks(req,res){
    try {
        const connection = getConnectionObject();
        const qry = "SELECT * FROM feedback_form";
        const [rows] = await connection.query(qry);
        res.status(200).send(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Something went wrong"});
    }
}