import React, { useContext, useEffect, useRef, useState } from 'react'
import UserContext from '@/contexts/usercontext';
import Image from 'next/image'
import { FaExternalLinkAlt } from "react-icons/fa";
import UserImage from "@/../public/assest/images/wallet_icons/xverse.png"
import WinUser from "@/../public/assest/images/win.png"
import { formatDate } from '@/utils/formatDate';

export default function BidListModal() {
  const { setBidListModal, currentNftData } = useContext<any>(UserContext);
  const menuDropdown = useRef<HTMLDivElement | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("")


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuDropdown.current && !menuDropdown.current.contains(event.target as Node)) {
        setBidListModal(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuDropdown]);

  return (
    <div className='fixed z-50 w-full h-full min-h-screen top-0'>
      <div className='w-full h-full min-h-screen absolute flex flex-col top-0 left-0 items-center justify-center backdrop-blur-md z-40'>
        <div ref={menuDropdown} className='w-full h-[500px] xs:max-w-md lg:max-w-xl flex flex-col border-[1px] border-[#232428] bg-[#fff]/80 shadow-xl shadow-[#f7931a] justify-center items-center p-4 gap-4 xs:gap-8 mx-auto rounded-lg'>
          <div className='w-full h-[450px] flex flex-col gap-2 justify-start items-start'>
            <div className='w-full flex flex-row gap-3 items-center justify-start'>
              <div className="relative w-[130px] h-[100px] flex bottom-0 rounded-md object-cover overflow-hidden">
                <Image src={`https://static-testnet.unisat.io/content/${currentNftData?.metaData?.background}`} alt="Background" fill className="rounded-lg absolute z-[5]" />
                <Image src={`https://static-testnet.unisat.io/content/${currentNftData?.metaData?.body}`} alt="Body" fill className="rounded-lg absolute z-[10]" />
                <Image src={`https://static-testnet.unisat.io/content/${currentNftData?.metaData?.accessory}`} alt="Accessory" fill className="rounded-lg absolute z-[15]" />
                <Image src={`https://static-testnet.unisat.io/content/${currentNftData?.metaData?.head}`} alt="Head" fill className="rounded-lg absolute z-[20]" />
                <Image src={`https://static-testnet.unisat.io/content/${currentNftData?.metaData?.glasses}`} alt="Glasses" fill className="rounded-lg absolute z-[25]" />
              </div>
              <div className='w-full h-full flex flex-col text-start justify-center'>
                <div className='text-xl text-[#8c8d92] font-bold'>Bids for</div>
                <div className='text-3xl text-black font-bold'>{currentNftData.name}</div>
              </div>
            </div>
            <div className='w-full h-[300px] p-3 object-cover overflow-hidden overflow-y-scroll rounded-l-xl rounded-r-sm gap-3 flex flex-col bg-[#e0e0e7] border-[1px] border-white relative'>
              {currentNftData.users?.map((item: any, index: number) => {
                return (
                  <div key={index} className='w-full h-full p-4 flex flex-col xs:flex-row justify-between items-start xs:items-center bg-white/90 rounded-xl gap-2'>
                    <div className='w-full xs:w-3/5 flex flex-row items-center justify-between xs:justify-start gap-2'>
                      <Image src={UserImage} alt="UserImage" className='w-10 h-10 rounded-full' />
                      <div className='flex flex-col justify-between items-center'>
                        <div className='text-black text-lg items-center font-semibold w-full text-start gap-2 flex flex-row'>
                          <p>{item.userAddress?.slice(0, 5)}....{item.userAddress?.slice(-5)}</p>
                          {index === 0 && <Image src={WinUser} alt='WinUser' className='w-4 h-4' />}
                        </div>
                        <p className='text-[#8c8d92] font-semibold text-sm text-start w-full flex'>
                          {formatDate(item.time)}
                        </p>
                      </div>
                    </div>
                    <div className='w-full xs:w-2/5 flex flex-row justify-between xs:justify-end items-center gap-4'>
                      <div className='text-black text-lg font-semibold'>
                        Ξ {item.price}
                      </div>
                      <a href={`https://mempool.space/testnet/tx/${item.txid}`} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt className='text-2xl text-[#8c8d92] cursor-pointer' />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='w-full flex flex-col xs:flex-row items-center justify-between px-3'>
              <div onClick={() => setBidListModal(false)} className='bg-[#f7931a] hover:bg-[#ffb153] cursor-pointer flex flex-col px-4 py-2 text-lg items-center justify-center font-bold rounded-full text-white min-w-[120px] mx-auto'>Cancel</div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}
