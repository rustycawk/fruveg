import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class ResetPasswordRequest extends BaseEntity {
    @Column()
    key!: string
    @Column()
    email!: string
    @Column({
        default: false
    })
    completed!: boolean
}