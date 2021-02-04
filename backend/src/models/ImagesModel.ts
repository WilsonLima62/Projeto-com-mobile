import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import PontoHistorico from './pontosHistoricosModel'

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    path: string

    @ManyToOne(() => PontoHistorico, pontoHistorico => pontoHistorico.images)
    @JoinColumn({ name: 'pontoHistorico_id' })
    pontoHistorico: PontoHistorico
}