import { init } from '@web3-onboard/vue';
import injectedModule from '@web3-onboard/injected-wallets';

const injected = injectedModule();

const web3Onboard = init({
    connect: {
        showSidebar: false,
        autoConnectLastWallet: true,
    },
    wallets: [injected],
    chains: [
        {
            id: '0x1',
            token: 'ETH',
            label: 'Ethereum Mainnet',
            rpcUrl: 'https://eth.llamarpc.com',
        },
        /*
        {
          id: 42161,
          token: 'ARB-ETH',
          label: 'Arbitrum One',
          rpcUrl: 'https://rpc.ankr.com/arbitrum',
        },
        {
          id: '0xa4ba',
          token: 'ARB',
          label: 'Arbitrum Nova',
          rpcUrl: 'https://nova.arbitrum.io/rpc',
        },
        {
          id: '0x2105',
          token: 'ETH',
          label: 'Base',
          rpcUrl: 'https://mainnet.base.org',
        },
        */
    ],
});

export default web3Onboard;
