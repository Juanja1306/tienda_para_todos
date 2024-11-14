import Swal from "sweetalert2"

export const errorAlert = (message: string) => {
    Swal.fire({
        title: 'Ups, Ocurrio un Error',
        text: message,
        icon: 'error',
        timer: 7000,
        timerProgressBar: true
    })
} 

export const succesfullAlert = (message: string) => {
    Swal.fire({
        title: 'Proceso Exitoso',
        text: message,
        icon: 'success',
        timer: 7000,
        timerProgressBar: true
    }) 
}