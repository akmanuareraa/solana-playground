import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import * as web3 from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const root = ReactDOM.createRoot(document.getElementById("root"));

const endpoint = web3.clusterApiUrl("testnet");
const wallet = new PhantomWalletAdapter();

root.render(
  <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={[wallet]}>
      <WalletModalProvider>
        <Router>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Router>
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);
