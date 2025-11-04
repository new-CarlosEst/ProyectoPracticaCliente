//Archivo en la que me creare las funciones de sacar e insertar datos a la db

//Me importo todo lo necesario
import { conectarse } from "./conexion";
import bcrypt from "bcrypt";

//Me conecto a la db y a la coleccion usuario
const conexion = await conectarse();
const coleccion = conexion.collection("usuario");

//funcion que recibe un email y una contraseña y los un objeto con los datos
export async function sacarDatos (email , password) {
    try {
        //Busco a un usuario por email
        const usuario = await coleccion.findOne({email: email});

        //Si el usuario con ese email no existe devuelvo falso
        if (!usuario){
            return false;
        }
        //si existe
        else {
            //Compruebo la contraseña, y uso bycrypt ya que la de la db esta hasheada
            const comprobarContra = await bcrypt.compare(password, usuario.password);
            
            //Si la contraseña no coincide
            if (!comprobarContra){
                return false;
            }
            else {
                return usuario;
            }
        }
    } catch (error){
        console.error ("Error al consultar datos\n" + error);
        return false;
    }
}

//funcion que recibe un email, contraseña e usuario y la mete en la db
export async function insertarDatos (email, user, password){
    try {
            //Hago el insert
            const insertar = await coleccion.insertOne({
                nombre: user,
                email: email,
                password : await bcrypt.hash(password, 10)
            });

            //si fue exitoso devuelve acknowledge que sera true
            return insertar.acknowledged;
    } catch (error){
        console.error("Error al insersertar en la base de datos\n" + error);
        return false;
    }
}