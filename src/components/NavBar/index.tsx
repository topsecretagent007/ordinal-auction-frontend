"use client"
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '@/contexts/usercontext';
import Image from 'next/image'
import { FaCircleExclamation } from "react-icons/fa6";
import CurrentNft from './CurrentNft';
import BidList from './BidList';
import ImageSlider from './ImageSlider';
import axios from 'axios';
import { BASE_URL } from '@/config/api';
import { toast } from 'react-toastify';
import { UNISAT, XVERSE } from '@/config/TextData';
import { unisatWalletSignPsbt } from '@/utils/wallet/unisat.wallet';
import { xverseWalletSignPsbt } from '@/utils/wallet/xverse.wallet';

export default function NavBar() {
  const { currentNftPrice, setCurrentNftPrice, address, currentNftData, currentNft, inputErrorText, setInputErrorText, updataBidList, setUpdataBidList, setLoading } = useContext<any>(UserContext);

  const changePrice = (e: any) => {
    const value = Math.max(currentNftData?.currentPrice || 0, Number(e.target.value));
    setCurrentNftPrice(e.target.value);
  };

  const sendMintProp = async () => {
    setLoading(true)
    if (currentNftPrice <= (currentNftData?.currentPrice)) {
      setCurrentNftPrice(0);
      setInputErrorText(true);
      setLoading(false)
    } else {

      let walletData: any = localStorage.getItem('walletData');

      if (walletData) {
        try {

          // Parse the stored address
          walletData = JSON.parse(walletData);

          const response = await axios.post(`${BASE_URL}/api/bid/new`, {
            paymentAddress: walletData.paymentAddress,
            price: currentNftPrice,
            paymentPublicKey: walletData.paymentPublicKey,
            taprootAddress: walletData.taprootAddress
          });

          let txHex: string = "";

          if (walletData.walletType == UNISAT) {

            txHex = await unisatWalletSignPsbt(response.data.psbt)

          } else if (walletData.walletType == XVERSE) {

            txHex = await xverseWalletSignPsbt(response.data.psbt, response.data.signingIndexes, walletData)
          }

          if (txHex) {
            const response = await axios.post(`${BASE_URL}/api/bid/confirm`, {
              paymentAddress: walletData.paymentAddress,
              price: currentNftPrice,
              taprootAddress: walletData.taprootAddress,
              txHex: txHex
            });

            console.log("currentPrice", currentNftData.currentPrice)
            console.log("response.data.updatedAuction.users[0].price", response.data.updatedAuction.users[0].price)

            if (currentNftData.currentPrice < response.data.updatedAuction.users[0].price) {
              console.log(response.data.updatedAuction)
              setUpdataBidList(!updataBidList)
            }
          }

        } catch (error) {
          console.log('Wallet Sign Error')
        }
      }
      setInputErrorText(false);
      setCurrentNftPrice(0);
      setLoading(false)
    }
  };

  return (
    <div className={`w-full h-full min-h-[calc(100vh-180px)]`}
      style={{
        backgroundImage: `url("https://static-testnet.unisat.io/content/${currentNftData?.metaData?.background}")`
      }}>
      <div className='container'>
        <div className='w-full h-full flex flex-col gap-8 lg:flex-row justify-center items-end pt-10 lg:pt-20'>
          <div className="flex flex-col px-2 w-full h-full max-w-2xl mx-auto lg:w-1/2 justify-between items-center lg:items-end relative z-10">
            <div className="w-full h-[300px] xs:h-[400px] lg:h-[500px] flex bottom-0">
              <Image src={`https://static-testnet.unisat.io/content/${currentNftData?.metaData?.background}`} alt="Background" fill className="rounded-lg absolute z-[5]" />
              <Image src={`https://static-testnet.unisat.io/content/${currentNftData?.metaData?.body}`} alt="Body" fill className="rounded-lg absolute z-[10]" />
              <Image src={`https://static-testnet.unisat.io/content/${currentNftData?.metaData?.accessory}`} alt="Accessory" fill className="rounded-lg absolute z-[15]" />
              <Image src={`https://static-testnet.unisat.io/content/${currentNftData?.metaData?.head}`} alt="Head" fill className="rounded-lg absolute z-[20]" />
              <Image src={`https://static-testnet.unisat.io/content/${currentNftData?.metaData?.glasses}`} alt="Glasses" fill className="rounded-lg absolute z-[25]" />
            </div>
          </div>

          <div className='flex flex-col px-2 w-full h-full lg:w-1/2 justify-between items-center lg:items-start pb-8 lg:pb-0'>
            <div className='w-full max-w-lg flex flex-col justify-start'>
              <CurrentNft />
            </div>
            {currentNftData?.users.length === 0 && currentNft !== 0 ?
              <div className='w-full max-w-lg justify-start items-center flex flex-row gap-3 text-[#5f5f5f] border-b-[1px] border-b-[#cfbdba] p-2'>
                <div className='text-sm xs:text-base font-medium text-start'>All Noun auction proceeds are sent to the Nouns DAO. For this reason, we, the project&#39;s founders <a href='/' className='text-red-600 font-semibold'>Nounders</a> have chosen to compensate ourselves with Nouns. Every 10th Noun for the first 5 years of the project will be sent to our multisig (5/10), where it will be vested and distributed to individual Nounders.</div>
              </div>
              :
              <a href='/' className='w-full max-w-lg justify-start items-center flex flex-row gap-3 text-[#5f5f5f] hover:text-black cursor-pointer py-1 px-2'>
                <FaCircleExclamation />
                <div className='text-sm xs:text-base font-semibold'>Help mint the next Noun</div>
              </a>
            }
            <div className={`${currentNft === 0 ? "flex flex-row" : "hidden"} w-full max-w-lg gap-3 justify-start text-md px-2 ${inputErrorText ? "pb-1" : "pb-5"}`}>
              <input type='number' min={currentNftData?.currentPrice} value={currentNftPrice || ""} onChange={(e) => changePrice(e)} className='flex flex-row gap-4 w-full max-w-xs text-start px-3 text-lg bg-white rounded-xl outline-none h-[48px] font-bold items-center text-black' placeholder={`${currentNftData?.currentPrice}`} />
              <div onClick={() => sendMintProp()} className={`${address === "" || address === undefined ? "bg-[#808080] cursor-not-allowed" : "bg-[#f7931a] hover:bg-[#ffb153] cursor-pointer"} flex flex-col px-4 py-2 text-lg items-center justify-center font-bold rounded-lg text-white min-w-[120px]`}>
                Place bid
              </div>
            </div>
            {inputErrorText && <div className='text-sm text-red-600 px-2'>* Select a price higher than the current suggested price.</div>}
            <div className='w-full max-w-lg flex flex-col justify-start pt-1'>
              <BidList />
            </div>
          </div>
        </div>
      </div>
      <ImageSlider sliderTime={6} className={"pt-20"} url={"/assest/images/slider-svg/3-heads/head ("} />
      <ImageSlider sliderTime={4} className={""} url={"/assest/images/slider-svg/4-glasses/glasses ("} />
      <ImageSlider sliderTime={2} className={""} url={"/assest/images/slider-svg/1-bodies/body ("} />
      <ImageSlider sliderTime={4} className={""} url={"/assest/images/slider-svg/2-accessories/accessory ("} />
    </div >
  )
}
