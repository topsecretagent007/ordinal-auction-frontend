import { createContext } from 'react'

export type NftAuctionItem = {
  name: string;
  txId: string;
  initialPrice: number;
  currentPrice: number;
  endTime: number;
  auctionStatus: boolean;
  metaData: {
    background: string;
    accessory: string;
    body: string;
    glasses: string;
    head: string;
  };
  users: {
    userAddress: any;
    userAdress: string;
    price: number;
    time: number;
    txid: string;
  }[];
};

const UserContext = createContext<{
  currentNftPrice: number;
  setCurrentNftPrice: (value: number) => void;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  bidListModal: boolean;
  setBidListModal: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  address: string;
  setAddress: (value: string) => void;
  currentTimestamp: number;
  setCurrentTimestamp: (value: number) => void;
  currentNft: number;
  setCurrentNft: (value: number) => void;
  currentNftData: NftAuctionItem;
  setCurrentNftData: (value: NftAuctionItem) => void;
  inputErrorText: boolean;
  setInputErrorText: (value: boolean) => void;
  updataBidList: boolean;
  setUpdataBidList: (value: boolean) => void;
  currentBtcPrice: number;
  setCurrentBtcPrice: (value: number) => void;
}>({
  currentNftPrice: 0,
  setCurrentNftPrice: () => { },
  openModal: false,
  setOpenModal: () => { },
  bidListModal: false,
  setBidListModal: () => { },
  loading: false,
  setLoading: () => { },
  address: "",
  setAddress: () => { },
  currentTimestamp: 0,
  setCurrentTimestamp: () => { },
  currentNft: 0,
  setCurrentNft: () => { },
  currentNftData: {
    name: '',
    txId: '',
    initialPrice: 0,
    currentPrice: 0,
    endTime: 0,
    auctionStatus: false,
    metaData: {
      background: '',
      accessory: '',
      body: '',
      glasses: '',
      head: ''
    },
    users: []
  }, // Initialize as an empty array of type NftAuctionItem[]
  setCurrentNftData: () => { },
  inputErrorText: false,
  setInputErrorText: () => { },
  updataBidList: false,
  setUpdataBidList: () => { },
  currentBtcPrice: 0,
  setCurrentBtcPrice: () => { },
});

export default UserContext