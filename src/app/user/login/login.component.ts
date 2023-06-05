import { Component, OnInit } from '@angular/core';
import { UserservicesService } from 'src/app/services/userservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = ""; //? Variable para almacenar el correo electrónico ingresado
  password: string = ""; //? Variable para almacenar la contraseña ingresada
  isOpened: boolean = false; //? Variable para controlar si el modal está abierto o no

  constructor(private userService: UserservicesService) {}

  ngOnInit() {
    //? Obtener referencias a los elementos del DOM
    const body = document.querySelector("body") as HTMLElement;
    const modal = document.querySelector(".modal") as HTMLElement;
    const modalButton = document.querySelector(".modal-button") as HTMLElement;
    const closeButton = document.querySelector(".close-button") as HTMLElement;
    const scrollDown = document.querySelector(".scroll-down") as HTMLElement;

    const openModal = () => {
      //? Abrir el modal
      modal.classList.add("is-open"); //? Agregar la clase "is-open" al modal para mostrarlo
      body.style.overflow = "hidden"; //? Desactivar el desplazamiento de la página
    };

    const closeModal = () => {
      //? Cerrar el modal
      modal.classList.remove("is-open"); //? Quitar la clase "is-open" del modal para ocultarlo
      body.style.overflow = "initial"; //? Restaurar el desplazamiento de la página
    };

    window.addEventListener("scroll", () => {
      //? Controlar el evento de desplazamiento de la ventana
      if (window.scrollY > window.innerHeight / 3 && !this.isOpened) {
        //? Si se ha desplazado más de un tercio de la altura de la ventana y el modal no está abierto
        this.isOpened = true; //? Actualizar la bandera de modal abierto
        scrollDown.style.display = "none"; //? Ocultar el indicador de desplazamiento hacia abajo
        openModal(); //? Abrir el modal
      }
    });

    modalButton.addEventListener("click", openModal); //? Escuchar el evento de clic en el botón del modal para abrirlo
    closeButton.addEventListener("click", closeModal); //? Escuchar el evento de clic en el botón de cierre para cerrar el modal

    document.onkeydown = evt => {
      //? Escuchar el evento de pulsación de tecla en todo el documento
      evt = evt || window.event;
      evt.keyCode === 27 ? closeModal() : false; //? Si se presiona la tecla Esc (código 27), cerrar el modal
    };
  }

  login() {
    this.userService.login(this.email, this.password); //? Llamar al método de inicio de sesión del servicio y pasar los valores del correo electrónico y la contraseña
    console.log("email: ", this.email); //? Imprimir el valor del correo electrónico en la consola
    console.log("password: ", this.password); //? Imprimir el valor de la contraseña en la consola
  }
}