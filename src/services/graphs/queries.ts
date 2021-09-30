import gql from 'graphql-tag';

export const summonersQuery = gql`
    query getSummoners($first: Int! = 1000, $owner: String!) {
        summoners(first: $first, where: { owner: $owner }) {
            id
        }
    }
`;