//Archivo en el que cargare los datos a la base de datos

//Me importo la conexion y los drivers para encriptar datos
import { conectar, conectarse } from "./conexion.js";
import bcrypt from "bcrypt";

//Me exporto la funcion de cargar datos
export async function cargarDatos() {
    try {
        //Sacamos la conexion a la db usando await ya que es una funcion asincrona
        //El await este lo que indice es que esperara a que en el metodo conectarse se conecta a la bd de mongodb
        const conexion = await conectarse();

        //me conecto a la coleccio/tabla que voy a usar, en este caso usuario
        const coleccion = conexion.collection("usuario");

        //Verifico si hay datos en la coleccion, si no hay datos cargare los datos a la db
        const cantidad = await coleccion.countDocuments();
        if (cantidad > 0) {
            console.error("La coleccion usuario ya tiene datos, asi que no se cargaran de nuevo");
            return false; //Salgo de la funcion
        }
        else {
            const usuariosCargar = [
                {nombre: "Carlos", email : "carlosprueba@gmail.com", password: "123A"},
                {nombre: "Pilar", email: "pilarprueba@gmail.com", password: "987Z"},
                {nombre: "Anne", email: "anneprueba@gmail.com", password: "abc2"},
                {nombre: "Ivan", email: "ivanprueba@gmail.com", password: "987Z"}
            ]

            //Me hasheo las contraseñas recorriendo el array de objetos y cambiando su contraseña por esta hasheada
            for (let usuario of usuariosCargar){
                //La hasheo 10 veces
                usuario.password = await bcrypt.hash(usuario.password, 10);
            }

            //Me cargo los datos 
            const carga = await coleccion.insertMany(usuariosCargar);
            //Muestro cuantos inserts se hicieron
            console.log("Numero de inserciones: " + carga.insertedCount())

            return true;
        }
    } catch (error){
        console.error ("Error al cargar los datos\n" +  error );
        return false;
    }
}