'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultConfig,
  Chain,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


import {
  telosTestnet,
  arbitrumSepolia,
} from 'wagmi/chains';

const EduTestnet = {
    id: 656476,
    name: 'EduTestnet',
    iconUrl: 'https://assets.hackquest.io/faucets/656476/71d06d79-4402-4224-985c-ed8368f8f061.png',
    iconBackground: '#fff',
    nativeCurrency: { name: 'EduTestnet', symbol: 'EDU', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://open-campus-codex-sepolia.drpc.org'] },
    },
    blockExplorers: {
      default: { name: 'opencampus', url: 'https://opencampus-codex.blockscout.com' },
    },
  } as const satisfies Chain;

  const avalanche = {
    id: 43_114,
    name: 'Avalanche',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
    iconBackground: '#fff',
    nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 11_907_934,
      },
    },
  } as const satisfies Chain;

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [
      EduTestnet,
      telosTestnet,
      arbitrumSepolia,
      avalanche,
    ],
  });


const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Providers;