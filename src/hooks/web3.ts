import {useEffect, useState } from 'react';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { injected } from '../connectors';
import { isMobile } from 'react-device-detect';

// Used to connect back to network if user previously used website before.
export function useEagerConnect() {

    // get network connection handle
    // uniswap method
    const { activate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
    const [tried, setTried] = useState(false) // uniswap uses this to track max tries of connection

    // pcs method
    //const { login } = useAuth()

    // activate if 
    useEffect(() => {
        injected.isAuthorized().then((isAuthorized) => {
            if (isAuthorized) {
            activate(injected, undefined, true).catch(() => {
                setTried(true)
            })
            } else {
            if (isMobile && window.ethereum) {
                activate(injected, undefined, true).catch(() => {
                setTried(true)
                })
            } else {
                setTried(true)
            }
            }
        })
    }, [activate]) // uniswap's intention to only run on mount


    useEffect(() => {
        if (active) {
            setTried(true)
        }
    }, [active])
    
    return tried
}

// add listener to window
export function useInactiveListener(suppress = false) {
    const { active, error, activate } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does

    useEffect(() => {
        const { ethereum } = window

        // if not suppress then handle the changes
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleChainChanged = () => {
                // eat errors
                activate(injected, undefined, true).catch((error) => {
                console.error('Failed to activate after chain changed', error)
                })
            }

            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length > 0) {
                // eat errors
                activate(injected, undefined, true).catch((error) => {
                    console.error('Failed to activate after accounts changed', error)
                })
            }
            }

            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('chainChanged', handleChainChanged)
                    ethereum.removeListener('accountsChanged', handleAccountsChanged)
                }
            }
        }
        return undefined
    }, [active, error, suppress, activate])
}
