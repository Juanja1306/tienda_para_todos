import { errorAlert } from "../alerts/alerts";

export class UserInvalid extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserInvalid";
    }

    alert() {
        errorAlert(this.message);
    }
}
export class DefaultError extends Error {
    static alert() {
        errorAlert('Ocurrio algo inesperado')
    }
}

export class CreateOrderError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CreateOrderError";
    }

    alert() {
        errorAlert(this.message);
    }
}

export class CreateProductError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CreateProductError";
    }

    alert() {
        errorAlert(this.message);
    }
}