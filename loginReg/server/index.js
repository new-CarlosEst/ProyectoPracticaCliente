//Me importo todos mis archivos .js
import { sacarDatos, insertarDatos } from "./funciones.js";
import { cargarDatos } from "./cargarDatos.js";

//Me importo los drivers de corps y express
import express from "express";
import cors from "cors";
import { cerrarConexion } from "./conexion.js";

//crea una instacia express para crear un servidor donde se van a recibir las peticiones (tipo apache para php)
const app = express();
//Esto hace que se puede recibir peticiones desde otros servidores diferentes al que tenga el servidor express, asi no lo bloquee
app.use(cors());
//Esto hace que los datos que se me envian desde cliente al servidor vengan en formato json para manejarlo mejor
app.use(express.json());

//Me cargo los datos 
(async () => {
    try{
        //LLamo a la funcion con await
        await cargarDatos();
        console.log("Exito al invocar la funcion cargarDatos");
    } catch (error) {
        console.error("Error al invocar la funcion cargarDatos\n" + error);
    }
})(); //Los parentesis vacios estos ultimos es para llamar a la funcion anonima que he creado para cargar datos

//* Peticion de inicio de sesion
///Hago un post de cuando llamo a login con una peticion y lo que va a devolver (Respuesta)
app.post("/login", async (peticion, respuesta) =>{
    try {
        //me saco los datos del cuerpo de la peticion
        const {email, password} = peticion.body;

        //llamo a sacar datos
        const usuario = await sacarDatos(email, password);

        //Si devuelve false es que no se ha podido encontrar usuario
        if (!usuario){
            respuesta.json({ok: false, mensaje: "El correo y la contraseña no coinciden"});
        } 
        else {
            respuesta.json({ok: true, mensaje: "Datos consultaso correctamente", user: usuario});
        } 

    } catch (error){
        respuesta.json({ok: false, mensaje: "Error interno del servidor" })
    }
});

//* Peticion de registro
//Me hago una peticion con /register sobre el localhost:3000 que recibe una peticion y una respuesta
//La peticion son los datos que recibo y la respuesta lo que devuelvo
app.post("/register", async (peticion, respuesta) =>{
    try {
        //Me saco los datos del cuerpo de la peticion suponiendo que son usuario, email y contraseña y lo meto en tres variables
        const {user, email, password} = peticion.body;

        //Compruebo si el usuario y contraseña estan en la db
        const estanRegistrados = await sacarDatos(email, password);
        //si devuelve falso, es que no estan registrados asi que continuo
        if (!estanRegistrados){
            //Llamo a insertar datos 
            const insercion = await insertarDatos(email, user, password);

            //si insercion devuelve true es que se han insertado los datos
            if (insercion){
                respuesta.json({ ok: true, mensaje: "Usuario registrado"});
            }
            else {
                respuesta.json({ ok: false, mensaje: "Usuario no se pudo registrar"});
            }
        }
        //Si no es que si estan registrados asi que paro la ejecucion
        else {
            //Devuelvo un objeto diciendo que no se ha registrado y pq 
            respuesta.json({ ok: false, mensaje: "Usuario ya esta registrado" });
        }
    } catch (error){
        respuesta.json({ ok: false, mensaje: "Error del servidor"});
    }

});

//Pongo el servidor express en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});