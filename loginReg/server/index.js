//Me importo todos mis archivos .js
import { sacarDatos, insertarDatos } from "./funciones";
import { cargarDatos } from "./cargarDatos";

//Me importo los drivers de corps y express
import express from "express";
import cors from "cors";

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

//* Peticion de registro
//Me hago una peticion con /register sobre el localhost:3000 que recibe una peticion y una respuesta
//La peticion son los datos que recibo y la respuesta lo que devuelvo
app.post("/register", async (peticion, respuesta) =>{
    try {
        //Me saco los datos del cuerpo de la peticion suponiendo que son usuario, email y contraseña y lo meto en tres variables
        const {user, email, password} = peticion.body;

        //Compruebo si el usuario y contraseña estan en la db
        const estanRegistrados = sacarDatos(email, password);
        //si devuelve falso, es que no estan registrados asi que continuo
        if (!estanRegistrados){

        }
        //Si no es que si estan registrados asi que paro la ejecucion
        else {
            //TODO Mirar pq creo que la respuesta no deberia ser asi y terminar la peticion de registro
            //Devuelvo un objeto diciendo que no se ha registrado y pq 
            //respuesta.json({ ok: true, mensaje: "Usuario registrado correctamente" });
        }
    } catch (error){

    }

});

//Pongo el servidor express en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});