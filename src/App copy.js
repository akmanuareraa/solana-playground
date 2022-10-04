import { useEffect, useState, React } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home.js";

// Solana Imports
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
// import the styles
require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  const [appState, setAppState] = useState({
    connection: "Not Connected to any RPC",
    solanaWalletStatus: false,
    providerWho: null,
    providerObject: null,
    walletKey: null,
  });

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const setupConnection = async () => {
    let walletAddress;
    const connection = new Connection(clusterApiUrl("devnet"));
    setAppState((prevState) => {
      return {
        ...prevState,
        connection: connection,
      };
    });
    console.log("Connection Object", connection);

    if (window.solana) {
      let provider = window.solana;
      if (provider.isPhantom) {
        try {
          walletAddress = await window.solana.connect();
        } catch (error) {
          console.log(error);
        }

        setAppState((prevState) => {
          return {
            ...prevState,
            solanaWalletStatus: true,
            providerWho: "Phantom",
            providerObject: provider,
            walletKey: walletAddress.publicKey.toString(),
          };
        });
      }
    }
  };

  const fetchBalance = () => {};

  useEffect(() => {
    setupConnection();
  }, []);

  return (
    <div className="p-6">
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={<Home appState={appState} setAppState={setAppState} />}
        />
      </Routes>
    </div>
  );
}

export default App;
