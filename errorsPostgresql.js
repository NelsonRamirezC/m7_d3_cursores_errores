const returnError = (error) => {
    let errores = {
        "42P01": "Tabla seleccionada no existe.",
        42601: "Error de sintaxis en la consulta.",
        42703: "Se está consulta una columna que no existe.",
        "3D000": "Error de catalogo (base de datos no existe)",
        "28P01": "Credenciales de acceso a la BD incorrectas.",
        "ECONNREFUSED": "Error de conexión, revise la configuración de su conexión.",
        "ENOTFOUND": "Ha fallado la conexión al host."
    };

    let objError = {
        code: error.code,
        error: errores[error.code],
        message: error.message,
    };

    return objError;
};

export default returnError;
