"use client"
import React, { useContext } from 'react'
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import TimeLeft from '../others/TimeLeft';
import UserContext from '@/contexts/usercontext';
import { auctionPeriod } from '@/config';


export default function CurrentNft() {
  const { currentNft, setCurrentNft, currentNftData, setInputErrorText } = useContext<any>(UserContext);

  const now = new Date(Date.now() - (+auctionPeriod) * currentNft);
  const day = now.getDate();
  const month = now.toLocaleString('default', { month: 'long' }); // gets the full month name
  const year = now.getFullYear();

  const changeCurrentNft = (e: string) => {
    console.log("currentNft", currentNft)
    if (e === "-") {
      console.log("here >>>", "-")
      if (currentNft === 0) {
        console.log("here ---------->>>", "return")
        return;
      } else {
        const _currentNft = currentNft - 1;
        console.log("here ------>>>", _currentNft)
        setCurrentNft(_currentNft)
      }
    } else if (e === "+") {
      console.log("here >>>", "+")

      if (currentNftData?.name === 1) {
        return
      } else {
        const _currentNft = currentNft + 1;
        setCurrentNft(_currentNft)
      }
    }
    setInputErrorText(false)
  }

  return (
    <div className='w-full flex flex-col justify-center lg:items-start gap-2'>
      <div className='w-full flex flex-col justify-center'>
        <div className='flex flex-row items-center justify-center lg:justify-start gap-2 py-1'>
          {/*   */}
          <div onClick={() => changeCurrentNft("+")} className={`${currentNftData?.name === 1 ? "cursor-not-allowed border-[#434344] text-[#434344]" : "bg-[#e9ebf3] hover:bg-[#fafafb] cursor-pointer border-[#f7931a] text-[#f7931a]"} text-lg p-2  rounded-full flex border-[1px] flex-col`}>
            <IoArrowBack />
          </div>
          <div className='text-lg font-semibold text-[#79809c]'>
            {`${day} ${month} ${year}`}
          </div>
          <div onClick={() => changeCurrentNft("-")} className={`${currentNft === 0 ? "cursor-not-allowed  border-[#434344] text-[#434344]" : "bg-[#e9ebf3] hover:bg-[#fafafb] cursor-pointer border-[#f7931a] text-[#f7931a]"} text-lg p-2  rounded-full flex border-[1px] flex-col`}>
            <IoArrowForward />
          </div>
        </div>
        <div className='w-full font-extrabold text-[#f7931a] text-3xl xs:text-4xl lg:text-5xl text-center lg:text-start py-1'>
          Noun {currentNftData?.name}
        </div>
      </div>
      <div className='w-full flex flex-col xs:flex-row gap-4 xs:gap-2'>
        <div className='flex flex-row xs:flex-col gap-4 w-full xs:w-2/5 xs:min-w-[180px] xs:border-r-[1px] xs:border-r-[#79809c49] justify-between text-start px-2 pb-4 xs:pb-0'>
          <div className='text-[#79809c] text-base xs:text-md font-semibold'>
            {currentNft === 0 ? "Current bid" : "Winning bid"}
          </div>
          {currentNftData?.users?.length === 0 ?
            (
              <div className='text-black text-xl xs:text-2xl font-bold'>
                {currentNft === 0 ? "0" : "n/a"}
              </div>
            ) : (
              <div className='text-black text-xl xs:text-2xl font-bold'>
                {`Ξ ${currentNftData?.currentPrice}`}
              </div>
            )}

        </div>
        <TimeLeft />
      </div>
    </div>
  )
}
