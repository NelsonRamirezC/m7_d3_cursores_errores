import pkg from "pg";
const { Pool } = pkg;
import Cursor from "pg-cursor";

const config = {
    host: "localhost",
    database: "cursores",
    user: "node",
    password: "123456",
    port: 5432,
};

const pool = new Pool(config);
const client = await pool.connect();

const consultar = async (nombreUsuario) => {
    let query = "SELECT * FROM USUARIOS";
    const cursor = client.query(new Cursor(query));

    let flag = true;
    while (flag) {
        let rows = await cursor.read(2);
        let usuarioBuscado = rows.find(
            (usuario) => usuario.nombre == nombreUsuario
        );
        if (usuarioBuscado) {
            console.log("usuario encontrado:");
            console.log(usuarioBuscado);
            flag = false;
            cursor.close(() => {
                client.release();
            });
        }
        if (rows.length == 0) {
            flag = false;
            cursor.close(() => {
                client.release();
            });
        }
    }
};

consultar("Usuario 7");
