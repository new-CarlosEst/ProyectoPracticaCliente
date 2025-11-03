//Archivo con la conexion a la base de datos

//Importo el drive oficinal de mongodb
import { MongoClient } from "mongodb";
//Importo el driver para manejar .env
import dotenv from "dotenv";

//Cargo las variables de entorno de .env
dotenv.config();

//Uri con la direcccion de conexion
const uri = "mongodb://localhost:27017";
//Me conecto con la funcion mongo client
const client = new MongoClient(uri);

//creo la funcion y pongo que se exporte para que en otro archivo pueda hacer un import de esta funcion 
export async function conectarse() {
    try {
    await client.connect();  // Conecta al servidor MongoDB

    const db = client.db(process.env.DATABASE);  // Nos conectamos a la base de datos que hay en la variable de entorno
    return db;  //Devolvemos la base de datos

    } catch (error) {
        console.error(" Error al conectar a la base de datos\n", error);
    }
}