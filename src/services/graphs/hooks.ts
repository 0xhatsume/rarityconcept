import { useQuery } from 'react-query';
import { GraphQLClient, request } from 'graphql-request';
import { summonerSubgraphEndpoint } from '../../constants/graphs';
import { summonersQuery } from './queries';

export const useSummonerIDsFromGraph = (owner:string) => {
    
    const fetchData = async () => {
        return await request(summonerSubgraphEndpoint, 
                                                summonersQuery, 
                                                {owner}
                                                )
    };

    // only fetch query if there is owner address
    return useQuery('summoners', fetchData, { enabled: !!owner});
}