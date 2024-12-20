"use client"
import React, { useContext, useEffect } from 'react'
import UserContext from '@/contexts/usercontext';
import Image from "next/image";
import Logo from "../../../public/assest/images/logo.png"
import { GiWallet } from "react-icons/gi";

export default function Header() {
  const { setOpenModal, address, setAddress, currentNftData, currentBtcPrice } = useContext(UserContext);
  const formatWalletAddress = (address: string) => {
    if (!address || address.length < 8) {
      return 'No Address'
    }
    const firstFive = address.slice(0, 5)
    const lastThree = address.slice(-5)
    return `${firstFive}...${lastThree}`
  }

  const addAddress = (walletAddress: string) => {
    setAddress(walletAddress)
  }

  useEffect(() => {
    // Retrieve the wallet address from localStorage
    const walletData: any = localStorage.getItem('walletData');

    if (walletData) {
      // Parse the stored address
      const walletAddress = JSON.parse(walletData).taprootAddress;
      addAddress(walletAddress)
    }
  }, [])

  return (
    <div className='border-b-[#f7931a] w-full h-[90px] flex flex-col border-b-[1px]'
      style={{
        backgroundImage: `url("https://static-testnet.unisat.io/content/${currentNftData?.metaData?.background}")`
      }}>
      <div className='container'>
        <div className='w-full h-[90px] flex flex-row items-center justify-between px-2 sm:px-10'>
          <div className='flex flex-row gap-3 items-center justify-start'>
            <a href='/' >
              <Image src={Logo} alt="Logo" className='w-20 flex flex-col' />
            </a>
            <a href='/' target="_blank" rel="noopener noreferrer" className='3xs:w-[160px] rounded-lg border-[1px] border-[#bdc0cf] flex flex-row justify-between items-center px-2 py-1 cursor-pointer'>
              <div className='text-[#151c3b] text-base font-bold hidden 3xs:flex'>
                BTC Price
              </div>
              <div className='items-center gap-1 text-base text-[#f7931a] font-semibold'>
                Ξ {currentBtcPrice}
              </div>
            </a>
          </div>
          {address ?
            <div onClick={() => setOpenModal(true)} className='flex flex-row p-2 xs:w-[180px] xs:h-9 sm:w-[220px] sm:h-11 items-center justify-center rounded-full ord-connect-font font-bold text-xl xs:text-lg cursor-pointer gap-1 border-[#bdc0cf] border-[1px]'>
              <GiWallet /><p className='hidden xs:flex w-[70%] truncate'>{formatWalletAddress(address)}</p>
            </div>
            :
            <div onClick={() => setOpenModal(true)} className='flex flex-row p-2 xs:w-[180px] xs:h-9 sm:w-[220px] sm:h-11 items-center justify-center rounded-full ord-connect-font font-bold text-xl xs:text-lg cursor-pointer gap-1 border-[#bdc0cf] border-[1px]'>
              <GiWallet /><p className='hidden xs:flex'>Connect Wallet</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}