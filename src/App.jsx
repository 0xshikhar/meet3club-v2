import './App.css';
import Home from './home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Match from './match'
import Meeting from './meeting'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import SocialLogin from "@biconomy/web3-auth";
import { ethers } from 'ethers';
import "@biconomy/web3-auth/dist/src/style.css";

// eslint-disable-next-line
const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})


function App() {
  // eslint-disable-next-line
  const handleLogin = async () => {
    try {
      // init wallet
      const socialLoginSDK = new SocialLogin();
      await socialLoginSDK.init('0x8001');    // Enter the network id in init() parameter

      // socialLoginSDK.showConnectModal();

      // show connect modal
      socialLoginSDK.showWallet();

      if (!socialLoginSDK?.web3auth?.provider) return;
      const provder = new ethers.providers.Web3Provider(
        socialLoginSDK.web3auth.provider,
      );
      const accounts = await provder.listAccounts();
      console.log("EOA address", accounts)

    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    // <footer className="flex h-25 p-5 w-full items-center justify-center bg-black text-white">
    //   <a
    //     className="flex items-center justify-center gap-2"
    //     href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //     target="_blank"
    //     rel="noopener noreferrer"

    //   >
    //     Powered by <b>Meet3Club</b>

    //   </a>
    // </footer>
    <Router>
      <Routes>
          <Route index element={<Home />} />
          <Route index exact path="/meeting"  element={<Meeting />} />
          <Route index exact path="/match" element={<Match />} />
      </Routes>
    </Router>
  );
}

export default App;
