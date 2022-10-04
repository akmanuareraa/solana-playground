import { useEffect, useState, React } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home.js";

// Solana Imports
import {
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmRawTransaction,
  Keypair,
} from "@solana/web3.js";
import { FC, ReactNode } from "react";

import * as web3 from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

function App() {
  const [appState, setAppState] = useState({
    connection: "Not Connected to any RPC",
    solanaWalletStatus: false,
    providerWho: null,
    providerObject: null,
    walletKey: null,
    walletObject: 0,
    privateKey: null,
  });
  const [balance, setBalance] = useState(0);

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [displayMessage, setDisplayMessage] = useState(
    "Transaction not Commenced"
  );

  const setupConnection = async () => {
    let walletAddress, walletBalance, keypair;
    const connection = new Connection(clusterApiUrl("testnet"));
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
          //keypair = getKeyPairFromSecretKey();
          console.log("WALLET", walletAddress);
          try {
            walletBalance = await connection.getBalance(
              walletAddress.publicKey
            );
          } catch (error) {
            console.log(error);
          }
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
            walletBalance: parseFloat(walletBalance) / LAMPORTS_PER_SOL,
            privateKey: keypair,
          };
        });
      }
    }
  };

  const createAndSendTxn = async () => {
    setDisplayMessage("Transaction commenced...");
    let txn = new Transaction();
    setDisplayMessage("Transaction Object Created...");
    txn.feePayer = window.solana.publicKey;
    setDisplayMessage("Fee Payer Inserted...");
    let bk = await appState.connection.getLatestBlockhash();
    setDisplayMessage("Previous Block Hash - " + bk.blockhash);
    txn.recentBlockhash = bk.blockhash;
    console.log("BlockHash", bk.blockhash);

    let instruction = SystemProgram.transfer({
      fromPubkey: window.solana.publicKey,
      toPubkey: "6fxLHgsFCxfrhixh9ztfcrrt65DFLX8Nzpu9EQSaqcWx",
      lamports: 100,
    });
    setDisplayMessage("Transaction Instruction Created...");
    txn.add(instruction);
    setDisplayMessage("Transaction ready to send...Waiting for Approval");
    let signature = await window.solana.signAndSendTransaction(txn);
    setDisplayMessage(
      "Signature Received - " +
        signature.signature +
        " - Transaction in Progress..."
    );
    console.log("SIG RECV: ", signature.signature);
    setDisplayMessage("Waiting for Confirmation...");
    let txnStatus = await appState.connection.confirmTransaction(
      signature.signature
    );
    console.log("STATUS", txnStatus, signature);
    setDisplayMessage("Confirmation Received - " + signature.signature);
    return signature;
  };

  // useEffect(() => {
  //   setupConnection();
  // }, []);

  useEffect(() => {
    console.log("Called WE", connection, publicKey);
    if (!connection || !publicKey) {
      return;
    }
    connection.getAccountInfo(publicKey).then(async (info) => {
      console.log("SAA", info, info.owner.toBase58());
      setBalance(info.lamports);
      let windowSolana = await window.solana.connect();
      setAppState((prevState) => {
        return {
          ...prevState,
          walletBalance: info.lamports / LAMPORTS_PER_SOL,
          walletKey: windowSolana.publicKey.toString(),
          providerWho: "Phantom",
          connection: connection,
          // walletKey: publicKey,
        };
      });n
    });
  }, [connection, publicKey]);

  return (
    <div className="p-6">
      {/* <Navbar /> */}
      <div>
        <p>{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL} SOL` : ""}</p>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              appState={appState}
              setAppState={setAppState}
              createAndSendTxn={createAndSendTxn}
              displayMessage={displayMessage}
              setDisplayMessage={setDisplayMessage}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
