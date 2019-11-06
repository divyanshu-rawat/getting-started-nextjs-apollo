import gql from 'graphql-tag';

/*
     A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
     https://github.com/apollographql/graphql-tag
*/
const JOBS_QUERY = gql`
    query Jobs {
       jobs {
           id
           title
       }
    } 
`;


export default JOBS_QUERY;

