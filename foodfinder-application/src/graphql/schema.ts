import gql from "graphql-tag";
import custom from "./locations/custom.gql";
import queries from "./locations/queries.gql";
import mutations from "./locations/mutations.gql";

export const typeDefs = gql`
  ${custom}
  type Query {
    ${queries}
  }
  type Mutation {
    ${mutations}
  }
`;
