import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";
import { Photo } from "./Photo";
import { Profile } from "./Profile";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column(() => Profile)
    profile: Profile;

    @Column(() => Photo)
    photos: Photo[];

}