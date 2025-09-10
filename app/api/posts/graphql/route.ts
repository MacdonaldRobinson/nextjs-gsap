import { ApolloClient } from "@apollo/client";
import { HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { ApolloCache, gql } from "@apollo/client";
import { NextRequest, NextResponse } from "next/server";
import { basename } from "path";

export const GET = async (request: NextRequest)=>{
    const GET_POSTS = gql`
        query {
        userById(id: 1) {
            id
            name
            email
            phone
        }
    }
    `;
    
    const client = new ApolloClient({
        link: new HttpLink({
            uri: "https://graphqlplaceholder.vercel.app/graphql"
        }),
        cache: new InMemoryCache()
    });

    const {data}  = await client.query({
        query: GET_POSTS
    })

    return NextResponse.json(data)

}