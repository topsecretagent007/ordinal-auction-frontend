import { NETWORK_TYPE } from "@/config/TextData";
import {
  isInstalled,
  getAddresses,
  signPsbt
} from "@ordzaar/ordit-sdk/xverse";

import * as Bitcoin from "bitcoinjs-lib";

export const connectToXverseWallet = async (): Promise<Array<any>> => {

  let addresses: any = ""
  if (!isInstalled()) {
    location.href = "https://www.xverse.app/download"
  } else {
    addresses = await getAddresses(NETWORK_TYPE as any); // mainnet or testnet
  }
  return addresses;
}


export const xverseWalletSignPsbt = async (psbt: string, signingIndexes: any, walletData: any) => {
  try {

    let unsignedPsbt: Bitcoin.Psbt = Bitcoin.Psbt.fromHex(psbt, {
      network:
        NETWORK_TYPE == "testnet"
          ? Bitcoin.networks.testnet
          : Bitcoin.networks.bitcoin,
    })

    let response = await signPsbt(unsignedPsbt, {
      extractTx: true,
      finalize: true,
      network: NETWORK_TYPE as any,
      inputsToSign: [
        {
          address: walletData.paymentAddress,
          signingIndexes: signingIndexes
        }
      ]
    })
    console.log(response)

    return response.hex;

  } catch (error) {
    console.log(error)

    return "";
  }
}