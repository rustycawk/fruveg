import {PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm'
export class BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt!: Date

    @Column({
        default:false
    })
    deleted!: boolean
}