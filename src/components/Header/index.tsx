import { useState } from 'react';
import styled from "styled-components";
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from "../../utils";
import WalletModal from "../WalletModal";

export const TopPanel = styled.header`
    background-color: transparent;
    min-height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

export const Button = styled.button`
    background-color: #C97A40;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    margin: 0px 20px;
    padding: 12px 24px;

    ${props => props.hidden && "hidden"} :focus {
        border: none;
        outline: none;
    }
`;

export default () => {
    const { account, active, error, deactivate } = useWeb3React()
    const [showDialog, setShowDialog] = useState(false);
    return (
        <TopPanel>
            <Button onClick={()=>{ 
                if(!active){
                    setShowDialog(true);
                } else {
                    deactivate();
                }
                    }
                }>
                { account ? shortenAddress(account) : 
                    'Connect Wallet'
                }
            </Button>
            <WalletModal showDialog={showDialog} setShowDialog={setShowDialog} />
        </TopPanel>
    )
};

