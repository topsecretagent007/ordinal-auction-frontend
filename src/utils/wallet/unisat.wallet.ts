import { NETWORK_TYPE } from "@/config/TextData";
import {
  isInstalled,
  getAddresses,
  signPsbt
} from "@ordzaar/ordit-sdk/unisat";

import * as Bitcoin from "bitcoinjs-lib";

export const connectToUnisatWallet = async (): Promise<Array<any>> => {
  let addresses: any = ""
  if (!isInstalled()) {
    location.href = 'https://unisat.io/download';
  } else {
    addresses = await getAddresses(NETWORK_TYPE as any); // mainnet or testnet
  }
  return addresses;
}

export const unisatWalletSignPsbt = async (psbt: string) => {
  try {

    let unsignedPsbt: Bitcoin.Psbt = Bitcoin.Psbt.fromHex(psbt, {
      network:
        NETWORK_TYPE == "testnet"
          ? Bitcoin.networks.testnet
          : Bitcoin.networks.bitcoin,
    })
    let response = await signPsbt(unsignedPsbt)
    
    return response.hex;

  } catch (error) {
    console.log(error)
    
    return "";
  }
}