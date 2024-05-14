import { IProfileAddress } from "./address/IProfileAddress";
import { IProfilePayment } from "./payment/IProfilePayment";

export interface IProfile {
    name: string;
    surname: string;
    email: string;
    phone: string;
    addresses: IProfileAddress[];
    payments: IProfilePayment[];
}