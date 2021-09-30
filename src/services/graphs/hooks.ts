import { useQuery } from 'react-query';
import { GraphQLClient, request } from 'graphql-request';
import { summonerSubgraphEndpoint } from '../../constants/graphs';
import { summonersQuery } from './queries';

export const useSummonerIDsFromGraph = (owner:string, config={}) => {

    const fetchData = async () => await request(summonerSubgraphEndpoint, 
                                                summonersQuery, 
                                                {owner}
                                                );

    return useQuery('summoners', fetchData, config);
}