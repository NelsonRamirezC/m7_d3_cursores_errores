import pkg from "pg";
import returnError from "./errorsPostgresql.js";
const { Pool } = pkg;

const config = {
    host: "localhostt",
    database: "cursores",
    user: "node",
    password: "123456",
    port: 5432,
};
let pool;
let client;
try {
    pool = new Pool(config);
    client = await pool.connect();
} catch (error) {
    if (error.code) {
        let messageError = returnError(error);
        console.log(messageError);
    }
}

const consulta = async (query) => {
    try {
        let result = await client.query(query);
        console.log("Comando: ", result.command);
        console.log("Cantidad registros: ", result.rowCount);
        console.log("Registros:");
        console.table(result.rows);
    } catch (error) {
        if (error.code) {
            let messageError = returnError(error);
            console.log(messageError);
        }
    }
};

let query = {
    text: "SELECT * FROM USUARIOS WHERE edad BETWEEN $1 AND $2",
    values: [20, 30],
};

consulta(query);
