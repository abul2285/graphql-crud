import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";



@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field()
    @Column()
    title: string

    @Field()
    @Column()
    body: string
}