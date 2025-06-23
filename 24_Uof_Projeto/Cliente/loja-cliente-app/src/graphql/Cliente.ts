import { ApolloClient, InMemoryCache } from "@apollo/client";

export const Cliente = () => {
 const client = new ApolloClient({         
          uri: 'https://localhost:7278/graphql/',  // Substitua pelo URL do seu servidor GraphQL
          cache: new InMemoryCache(),          
        });
  return  client;
}   

 