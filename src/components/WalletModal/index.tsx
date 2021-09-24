import { useState } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';

import styled from 'styled-components/macro';
import { ReactComponent as Close } from '../../assets/ui/images/x.svg';
import MetamaskIcon from '../../assets/ui/images/metamask.png';
import Modal from '../Modal';

import { injected } from '../../connectors';

const CloseIcon = styled.div`
    position: absolute;
    right: 1rem;
    top: 14px;
    &:hover {
        cursor: pointer;
        opacity: 0.6;
    }
`

const CloseColor = styled(Close)`
    path {
        stroke: ${({ theme }) => theme.text4};
    }
`

const Wrapper = styled.div`
    ${({ theme }) => theme.flexColumnNoWrap}
    margin: 0;
    padding: 0;
    width: 100%;
`

// used to hold support close icon
const HeaderRow = styled.div`
    ${({ theme }) => theme.flexRowNoWrap};
    padding: 1rem 1rem;
    font-weight: 500;
    color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
    ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
    `};
`

const UpperSection = styled.div`
    position: relative;

    h5 {
        margin: 0;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        font-weight: 400;
    }

    h5:last-child {
        margin-bottom: 0px;
    }

    h4 {
        margin-top: 0;
        font-weight: 500;
    }
`

const ContentWrapper = styled.div`
    background-color: ${({ theme }) => theme.bg0};
    padding: 0 1rem 1rem 1rem;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0 1rem 1rem 1rem`};
`

const OptionGrid = styled.div`
    display: grid;
    grid-gap: 10px;
    ${({ theme }) => theme.mediaWidth.upToMedium`
        grid-template-columns: 1fr;
        grid-gap: 10px;
    `};
`

const InfoCard = styled.button<{ active?: boolean }>`
    background-color: ${({ theme, active }) => (active ? theme.bg3 : theme.bg2)};
    padding: 1rem;
    outline: none;
    border: 1px solid;
    border-radius: 12px;
    width: 100% !important;
    &:focus {
        box-shadow: 0 0 0 1px ${({ theme }) => theme.primary1};
    }
    border-color: ${({ theme, active }) => (active ? 'transparent' : theme.bg3)};
`

const OptionCard = styled(InfoCard as any)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
    padding: 1rem;
`

const OptionCardLeft = styled.div`
    ${({ theme }) => theme.flexColumnNoWrap};
    justify-content: center;
    height: 100%;
`

const OptionCardClickable = styled(OptionCard as any)<{ clickable?: boolean }>`
    margin-top: 0;
    &:hover {
        cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
        border: ${({ clickable, theme }) => (clickable ? `1px solid ${theme.primary1}` : ``)};
    }
    opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`


const GreenCircle = styled.div`
    ${({ theme }) => theme.flexRowNoWrap}
    justify-content: center;
    align-items: center;

    &:first-child {
        height: 8px;
        width: 8px;
        margin-right: 8px;
        background-color: ${({ theme }) => theme.green1};
        border-radius: 50%;
  }
`

const CircleWrapper = styled.div`
    color: ${({ theme }) => theme.green1};
    display: flex;
    justify-content: center;
    align-items: center;
`

const HeaderText = styled.div`
    ${({ theme }) => theme.flexRowNoWrap};
    color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : ({ theme }) => theme.text1)};
    font-size: 1rem;
    font-weight: 500;
`

const IconWrapper = styled.div<{ size?: number | null }>`
    ${({ theme }) => theme.flexColumnNoWrap};
    align-items: center;
    justify-content: center;
    & > img,
    span {
        height: ${({ size }) => (size ? size + 'px' : '24px')};
        width: ${({ size }) => (size ? size + 'px' : '24px')};
    }
    ${({ theme }) => theme.mediaWidth.upToMedium`
        align-items: flex-end;
    `};
`


export default function WalletModal({showDialog, setShowDialog}
    // {
    // pendingTransactions,
    // confirmedTransactions,
    // ENSName,
    // }: {
    //     pendingTransactions: string[] // hashes of pending
    //     confirmedTransactions: string[] // hashes of confirmed
    //     ENSName?: string
    // }
    ) {

        // important that these are destructed from the account-specific web3-react context
        const { active, account, connector, activate, error } = useWeb3React()

        //const [showDialog, setShowDialog] = useState(true);
        const open = () => setShowDialog(true);
        const close = () => setShowDialog(false);

        const tryActivation = async (connector: AbstractConnector | undefined) => {
            activate(connector as AbstractConnector, undefined, true)
            .catch((error) => {
                if (error instanceof UnsupportedChainIdError) {
                    activate(connector as AbstractConnector)
                } else {
                    console.log(`Error when activating metamask: ${error}`)
                }
            })
            close();
        }

        return (
            <Modal isOpen={showDialog} onDismiss={close} minHeight={false} maxHeight={90}>
                <Wrapper>
                    <UpperSection>
                        <CloseIcon onClick={close}>
                            <CloseColor />
                        </CloseIcon>
                        <HeaderRow>Connect to Wallet</HeaderRow>

                        <ContentWrapper>

                            <OptionGrid>
                                <OptionCardClickable clickable={true} onClick={
                                    () => {
                                        tryActivation(injected);
                                    }}>
                                    <OptionCardLeft>
                                        <HeaderText>
                                        {active ? (
                                            <CircleWrapper>
                                                <GreenCircle>
                                                    <div />
                                                </GreenCircle>
                                            </CircleWrapper>
                                        ) : ('')} MetaMask </HeaderText>
                                    </OptionCardLeft>
                                    <IconWrapper>
                                        <img src={MetamaskIcon} alt={'Icon'} />
                                    </IconWrapper>
                                </OptionCardClickable>
                            </OptionGrid>

                            </ContentWrapper>
                        </UpperSection>
                </Wrapper>
            </Modal>
        )
    }