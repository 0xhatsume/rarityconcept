import { useEffect, useState, useRef } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
//import { simpleRpcProvider } from 'utils/providers'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { NetworkContextName } from '../constants/networking'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {

  const context = useWeb3ReactCore<Web3Provider>()
  const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
  return context.active ? context : contextNetwork

}

export default useActiveWeb3React
