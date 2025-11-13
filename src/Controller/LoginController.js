import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { getConnectionObject } from "../Config/dbConfig.js";
import { ROLES } from "../Constants/RoleConstants.js";

export async function login(request, response) {
  try {
    const connection = getConnectionObject();
    const { email, password, role } = request.body;
    const tableName = role === ROLES.ADMIN ? "admin" : "user";
    const qry = `SELECT * FROM ${tableName} WHERE email='${email}'`;
    const [rows] = await connection.query(qry);
    if (rows.length === 0) {
      response
        .status(400)
        .send({ message: "Login failed, email doesn't exist" });
    } else {
      const id = rows[0].id;
      if (compareSync(password, rows[0].password)) {
        const token = jwt.sign(
          {
            email: rows[0].email,
            id,
            role,
          },
          "helloFITSYNC1234"
        );
        response.status(200).send({ token, id, message: "Login successful" });
      } else {
        response
          .status(400)
          .send({ message: "Login failed, password is invalid" });
      }
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}
