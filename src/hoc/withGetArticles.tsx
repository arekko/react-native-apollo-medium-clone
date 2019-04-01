
// // @ts-ignore
// import * as React from "react";
// import gql from "graphql-tag";
// import { graphql } from "react-apollo";
// import { GetArticlesQuery_getArticles , GetArticlesQuery, GetArticlesQueryVariables} from '../schemaTypes';


// const getArticles = gql`
//   query GetArticlesQuery($limit: Float!, $offset: Float!) {
//     getArticles(limit: $limit, offset: $offset) {
//       id
//       text
//       title
//       creation_date
//       picture_url
//       owner {
//         username
//         email
//         fullname
//         register_date
//       }
//     }
//   }
// `;

// export interface WithFindListings {
//   listings: GetArticlesQuery_getArticles[];
//   loading: boolean;
// }

// export const withFindListings = graphql<
//   any,
//   GetArticlesQuery,
//   GetArticlesQueryVariables,
//   WithFindListings
// >(getArticles, {
//   props: ({ data }) => {
//     let listings: FindListingsQuery_findListings[] = [];

//     if (data && !data.loading && data.findListings) {
//       listings = data.findListings;
//     }

//     return { listings, loading: data ? data.loading : false };
//   }
// });