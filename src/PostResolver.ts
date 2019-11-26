import { Resolver, Query, Mutation, Field, Arg, InputType } from "type-graphql";
import { Post } from "./entity/Post";
import { MinLength } from "class-validator";
var ObjectID = require('mongodb').ObjectID


@InputType()
class PostInput {
    @Field()
    @MinLength(10)
    title: string

    @Field()
    body: string
}

@InputType()
class updatePostInput {
    @Field({ nullable: true })
    title?: string

    @Field({ nullable: true })
    body?: string
}

@Resolver()
export class PostResolver {
    @Mutation(() => String)
    async createPost(
        @Arg('post', () => PostInput) post: PostInput
    ) {
        try {
            Post.insert(post)
        } catch (err) {
            console.log(err)
            return 'Post has not been created'
        }
        return 'Post has been created'
    }

    @Query(() => [Post])
    async posts(
    ) {
        return Post.find()
    }

    @Query(() => Post)
    async post(
        @Arg('id') id: string
    ) {
        try {
            const post = await Post.find({ where: { _id: new ObjectID(id) } })
            return post[0]
        } catch (err) {
            console.log(err)
            return false
        }
    }

    @Mutation(() => String)
    async updatePost(
        @Arg('id') id: string,
        @Arg('updatePost', () => updatePostInput) updatePost: updatePostInput,
    ) {


        try {
            await Post.update({ id: new ObjectID(id) }, updatePost)
        } catch (err) {
            return 'Post has not been update'
        }
        return 'Post has been update'
    }

    @Mutation(() => String)
    async deletePost(
        @Arg('id') id: string
    ) {
        try {
            await Post.delete({ id: new ObjectID(id) })
        } catch (err) {
            console.log(err)
            return 'Post has been not deleted'
        }
        return 'Post has been delete'
    }
}