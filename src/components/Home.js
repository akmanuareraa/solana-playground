import React from "react";

import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

function Home(props) {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-row space-x-4">
        <div className="bg-slate-500 p-3 rounded-xl">
          <p className="text-xl font-bold text-white">Solana RPC</p>
          <div className="bg-slate-700 p-2 rounded-xl mt-4">
            <p className="text-md text-white">
              {props.appState.connection._rpcEndpoint}
            </p>
          </div>
        </div>
        <div className="bg-slate-500 p-3 rounded-xl">
          <p className="text-xl font-bold text-white">Solana Provider</p>
          <div className="bg-slate-700 p-2 rounded-xl mt-4">
            <p className="text-md text-white">{props.appState.providerWho}</p>
          </div>
        </div>
        <div className="bg-slate-500 p-3 rounded-xl">
          <p className="text-xl font-bold text-white">Wallet Key</p>
          <div className="bg-slate-700 p-2 rounded-xl mt-4">
            <p className="text-md text-white">{props.appState.walletKey}</p>
          </div>
        </div>
        <div className="bg-slate-500 p-3 rounded-xl">
          <p className="text-xl font-bold text-white">Wallet Balance</p>
          <div className="bg-slate-700 p-2 rounded-xl mt-4">
            <p className="text-md text-white">
              {props.appState.walletBalance}&nbsp;SOL
            </p>
          </div>
        </div>
      </div>
      <div className="bg-slate-500 p-3 rounded-xl w-full">
        <p className="text-xl font-bold text-white">Send SOL</p>
        <input
          className="input mt-6 w-full"
          placeholder="Enter Address"
        ></input>
        <div className="bg-slate-700 p-2 rounded-xl mt-4">
          <button
            className="btn w-full"
            onClick={() => props.createAndSendTxn()}
          >
            Send
          </button>
        </div>
        <p className="text-xl font-bold text-white mt-3">Transaction Status</p>
        <div className="bg-slate-700 p-2 rounded-xl mt-2">
          <p className="">{props.displayMessage}</p>
        </div>
      </div>
      <div className="bg-slate-500 p-3 rounded-xl">
        <p className="text-xl font-bold text-white">Wallet Balance</p>
        <div className="bg-slate-700 p-2 rounded-xl mt-4">
          <WalletMultiButton />
        </div>
      </div>
    </div>
  );
}

export default Home;
