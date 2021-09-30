import React from 'react';
import styled from 'styled-components/macro';
import Header from '../components/Header';
import {Toaster} from 'react-hot-toast';
import Web3ReactManager from '../components/Web3ReactManager';

//import { useSummonerIDsFromGraph } from '../services/graphs/hooks'
//import Loader from '../components/Loader';


const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 6rem 16px 16px 16px;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

function App() {
  // const { data, isLoading, error } = useSummonerIDsFromGraph("0xCb703E4246716242526ca15D807324f3fD645d61")
  // //console.log(data["summoners"])
  // console.log(data?.summoners
  //               .map((v)=> parseInt(v?.id) )
  //               .sort((a,b)=>a-b))

  
  return (
    <>
      <Header />
      <Toaster/>
      
        <Web3ReactManager>
            <div>
              hi frens
            </div>
        </Web3ReactManager>
    </>
  );
}

export default App;
