"use client"
import { useContext, useState } from 'react';
import Image from 'next/image'
import { FaExternalLinkAlt, FaBirthdayCake, FaHeart } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import TestImage from "@/../public/assest/images/wallet_icons/xverse.png"
import UserContext from '@/contexts/usercontext';
import { formatDate } from '@/utils/formatDate';

export default function BidList() {
  const { setBidListModal, currentNftData, currentNft } = useContext(UserContext);

  return (
    <div className="flex flex-col w-full h-full pb-4">
      <div className='w-full h-full flex flex-col px-2 gap-1'>
        {currentNft === 0 ?
          <>
            {currentNftData?.users.map((item: any, index: number) => {
              {
                return (
                  index < 3 &&
                  <div key={index} className='w-full p-3 flex flex-row items-center justify-between text-base xs:text-md font-semibold text-[#151c3b] border-b-[1px] border-b-[#bdc0cf]'>
                    <div className='flex flex-row gap-2 items-center'>
                      <Image src={TestImage} alt="TestImage" className='w-6 h-6 rounded-full' />
                      {item.userAddress?.slice(0, 5)}....{item.userAddress?.slice(-5)}
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                      <p className='flex flex-row items-center'>Ξ {item.price}</p>
                      <a href={`https://mempool.space/testnet/tx/${item.txid}`} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt className='text-[#79809c] cursor-pointer' />
                      </a>
                    </div>
                  </div>
                )
              }
            })}
          </>
          :
          <></>
        }
        {
          currentNft === 0 ?
            <>
              {currentNftData?.users.length === 0 ?
                <div className="cursor-not-allowed h-10 w-full text-center text-sm xs:text-base font-semibold text-[#79809c] pt-2">
                  View all bids
                </div>
                :
                <div onClick={() => setBidListModal(true)} className="hover:text-[#f7931a] cursor-pointer h-10 w-full text-center text-sm xs:text-base font-semibold text-[#79809c] pt-2">
                  View all bids
                </div>
              }
            </>
            :
            <>
              {currentNftData?.users.length === 0 ?
                <a href='/' className="cursor-pointer h-10 w-full text-center text-sm xs:text-base font-semibold text-[#e40536] pt-2">
                  Learn more →
                </a>
                :
                <div className='flex flex-col gap-4 w-full xs:justify-start items-start pt-2 px-2'>
                  <div className='flex flex-row gap-3 items-center justify-start text-black'>
                    <FaBirthdayCake />
                    Born
                    {formatDate(currentNftData?.users[0].time)}
                  </div>
                  <div className='flex flex-row gap-3 items-center justify-start text-black'>
                    <FaHeart />
                    Winner
                    <a href={`https://mempool.space/testnet/tx/${currentNftData?.users[0].txid}`} className='text-[#4965f0] font-semibold cursor-pointer'>{currentNftData?.users[0]?.userAddress?.slice(0, 5)}....{currentNftData?.users[0].userAddress?.slice(-5)}</a>
                    <a href={`https://mempool.space/testnet/tx/${currentNftData?.users[0].txid}`} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className='text-sm text-[#8c8d92] cursor-pointer' />
                    </a>
                  </div>
                  <div className='flex flex-row gap-3 items-center mx-auto xs:mx-0 text-lg xs:text-xl'>
                    <div onClick={() => setBidListModal(true)} className='flex flex-row px-4 py-2 items-center justify-center rounded-full ord-connect-font font-bold xs:text-lg cursor-pointer gap-1 border-[#bdc0cf] border-[1px]'>
                      <FaBirthdayCake /><p className=''>Bid history</p>
                    </div>
                    <a href={`https://mempool.space/testnet/tx/${currentNftData?.users[0].txid}`} className='flex flex-row px-4 py-2 items-center justify-center rounded-full ord-connect-font font-bold xs:text-lg cursor-pointer gap-1 border-[#bdc0cf] border-[1px]'>
                      <BsPatchCheckFill /><p className=''>Scan</p>
                    </a>
                  </div>
                </div>
              }
            </>
        }
      </div>
    </div>
  )
}