"use client";
import React, { useEffect, useState } from 'react';
import UserContext, { NftAuctionItem } from '../contexts/usercontext';
import Header from '../components/Header/index'
import NavBar from '../components/NavBar/index'
import Footer from '../components/Footer/index'
import WalletModal from '@/components/others/WalletModal';
import Loading from '@/components/others/Loading';
import BidListModal from '@/components/others/BidListModal';
import { toast, ToastContainer } from 'react-toastify';
import { getNftAuctionData } from '@/utils/api/getNftData';
import { auctionPeriod } from '@/config';
import { getCurrentBtcPrice } from '@/utils/api/getBtcPrice';



export default function Home() {
  const [currentNftPrice, setCurrentNftPrice] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [bidListModal, setBidListModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [address, setAddress] = useState<string>("");
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);
  const [currentNft, setCurrentNft] = useState<number>(0);
  const [currentNftData, setCurrentNftData] = useState<any>();
  const [inputErrorText, setInputErrorText] = useState<boolean>(false);
  const [updataBidList, setUpdataBidList] = useState<boolean>(false);
  const [currentBtcPrice, setCurrentBtcPrice] = useState<number>(0);

  const getData = async (selectedTime: number) => {
    setLoading(true)
    try {
      const currentNftTimestamp = (selectedTime - (+auctionPeriod) * currentNft);
      console.log("current nft time :", currentNftTimestamp)
      const nftData = await getNftAuctionData(currentNftTimestamp)
      console.log("nftData :", nftData.data)
      setCurrentNftData(nftData.data)
      const BtcPriceData = await getCurrentBtcPrice()
      setCurrentBtcPrice(BtcPriceData?.price.USD)
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch (error) {
      console.log("error : ", error)
      toast.error(`${(error === null || error === undefined) ? "An error occurred while loading data" : error}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentNftData && currentNftData.endTime) {
      setLoading(true)
      const endTime = currentNftData.endTime; // Assuming `endTime` is a field in the response

      const intervalId = setInterval(() => {
        const now = Date.now();
        const currentNftTimestamp = now - (+auctionPeriod) * currentNft;
        if (currentNftTimestamp >= endTime) {
          setLoading(true)
          getData(now);
        }
      }, 1000); // Check every second (1000ms)

      // Clean up the interval when the component unmounts or when currentNftData changes
      setLoading(false)
      return () => clearInterval(intervalId);
    }
  }, [currentNftData, currentNft]);

  useEffect(() => {
    setLoading(true)
    console.log("current nft : ", currentNft)
    const now = Date.now();  // Current timestamp in milliseconds
    getData(now)
  }, [currentNft, updataBidList])

  useEffect(() => {
    setLoading(true)
    const now = Date.now();  // Current timestamp in milliseconds
    console.log("current nft : ", currentNft)
    console.log("current time :", now)
    getData(now)
  }, [])



  return (
    <main className="App flex min-h-screen flex-col items-center justify-between">
      <UserContext.Provider value={{ currentNftPrice, setCurrentNftPrice, openModal, setOpenModal, loading, setLoading, address, setAddress, bidListModal, setBidListModal, currentTimestamp, setCurrentTimestamp, currentNft, setCurrentNft, currentNftData, setCurrentNftData, inputErrorText, setInputErrorText, updataBidList, setUpdataBidList, currentBtcPrice, setCurrentBtcPrice }}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Header />
        <NavBar />
        <Footer />
        {openModal == true && <WalletModal />}
        {bidListModal == true && <BidListModal />}
        {loading == true && <Loading />}
      </UserContext.Provider>
    </main>
  );
}
