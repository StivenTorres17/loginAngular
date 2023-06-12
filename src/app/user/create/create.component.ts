import { Component, OnInit } from '@angular/core';
import { UserservicesService } from 'src/app/services/userservices.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  isOpened = false; //? Bandera para controlar si el modal está abierto o no
  username!:string;
  email!:string; //? Variable para almacenar el valor del campo de correo electrónico
  password!:string; //? Variable para almacenar el valor del campo de contraseña

  constructor(private userService: UserservicesService) {}

  createUser():void{
    this.userService['create'](this.username,this.email,this.password)
      console.log("user created");
  }

  ngOnInit() {
    const body = document.querySelector("body") as HTMLElement; //? Referencia al elemento <body> del DOM
    const modal = document.querySelector(".modal") as HTMLElement; //? Referencia al elemento del modal en el DOM
    const modalButton = document.querySelector(".modal-button") as HTMLElement; //? Referencia al botón para abrir el modal en el DOM
    const closeButton = document.querySelector(".close-button") as HTMLElement; //? Referencia al botón para cerrar el modal en el DOM
    const scrollDown = document.querySelector(".scroll-down") as HTMLElement; //? Referencia al elemento de indicador de desplazamiento hacia abajo en el DOM

    const openModal = () => {
      modal.classList.add("is-open"); //? Agregar la clase "is-open" al modal para mostrarlo
      body.style.overflow = "hidden"; //? Desactivar el desplazamiento de la página
    };

    const closeModal = () => {
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
}