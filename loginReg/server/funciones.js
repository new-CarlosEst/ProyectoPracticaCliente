//Clase en la que me creare las funciones de sacar e insertar datos a la db

//Me importo todo lo necesario
import { conectarse } from "./conexion";
import bcrypt from "bcrypt";

//funcion que recibe un email y una contraseña y los un objeto con los datos
export async function sacarDatos (email , password) {
    //Me conecto a la db y a la coleccion usuario
    const conexion = await conectarse();
    const coleccion = conexion.collection("usuario");

    
}