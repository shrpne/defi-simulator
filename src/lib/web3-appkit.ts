import { createAppKit } from '@reown/appkit/vue';
import { mainnet, type AppKitNetwork } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// 1. Get projectId from https://cloud.reown.com
const projectId = 'bdb15eecf479b6ec35df9c357c99f5a6';

// 2. Create a metadata object
const metadata = {
    name: 'AppKit',
    description: 'AppKit Example',
    url: 'https://example.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// 3. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    // ssr: true,
    networks,
    projectId,
});

// 5. Create the modal
const appKit = createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    // metadata,
    features: {
        email: false,
        socials: false,
        analytics: true, // Optional - defaults to your Cloud configuration
    },
});

export default appKit;
