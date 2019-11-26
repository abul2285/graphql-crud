import { Column } from "typeorm";

export class Profile {

    @Column()
    about: string;

    @Column()
    education: string;

    @Column()
    career: string;

}