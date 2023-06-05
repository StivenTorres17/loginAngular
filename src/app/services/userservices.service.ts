import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserservicesService {
  //? Define la URL de la API para el endpoint de inicio de sesión
  private ApiUrl = "http://localhost:3000/users/login";

  constructor(private http:HttpClient) { }

    //? Función para realizar el inicio de sesión del usuario
    login(email:string, password:string):void {
      //? Crea un objeto `formData` con el correo electrónico y la contraseña
      const formData = {
        email: email,
        password: password
      };
  
      //? Envía una solicitud POST al endpoint de inicio de sesión con los datos del formulario
      this.http.post(this.ApiUrl, formData)
      .subscribe(
        (response) => {
          console.log("Respuesta: ", response);
        },
        (error) => {
          //? Verifica si el error es una instancia de `HttpErrorResponse`
          if(error instanceof HttpErrorResponse){
            //? Verifica si el error es un error de red
            if(error.error instanceof ErrorEvent){
              console.log("Error: ", error.error.message);
            }
            else {
              //? Registra el código de error HTTP y el mensaje de error
              console.error(`Código de error ${error.status} - Mensaje: ${error.error}`);
            }
          }
        }
      );
    }
  }

/*
  * El decorador @Injectable marca la clase como un servicio inyectable.
  * Se importa HttpClient para realizar solicitudes HTTP.
  * El servicio se proporciona a nivel de raíz.
  * La variable ApiUrl almacena la URL para el endpoint de inicio de sesión.
  * La función login se encarga de realizar el inicio de sesión del usuario.
  * Toma el correo electrónico y la contraseña como parámetros.
  * Crea un objeto formData con el correo electrónico y la contraseña.
  * Envía una solicitud POST al endpoint de inicio de sesión utilizando el método post de HttpClient.
  * Se suscribe a las devoluciones de llamada de respuesta y error para manejar la respuesta del servidor.
  * En la devolución de llamada de respuesta, los datos de respuesta se registran en la consola.
  * En la devolución de llamada de error, verifica si el error es una instancia de HttpErrorResponse.
  * Si lo es, verifica si es un error de red o un error HTTP.
  * En el caso de un error de red, se registra el mensaje de error en la consola.
  * En el caso de un error HTTP, se registran el código de estado del error y el mensaje en la consola.
  
*/