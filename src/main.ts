import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
// init web3Onboard
// import './lib/web3-onboard.ts';
// init reown appkit
import './lib/web3-appkit.ts';
// import PrimeVue from 'primevue/config';
// import CustomAuraTheme from '@/lib/primevue-theme.ts';
// import Aura from '@primevue/themes/aura';

const app = createApp(App);
// app.use(PrimeVue, {
//     theme: {
//         preset: CustomAuraTheme,
//         options: {
//             darkModeSelector: '.dark',
//         },
//     },
// });
app.mount('#app');
