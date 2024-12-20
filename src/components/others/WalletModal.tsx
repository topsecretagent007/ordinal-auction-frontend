import React, { useContext, useEffect, useRef } from 'react'
import UserContext from '@/contexts/usercontext';
import Image from 'next/image'
import { UNISAT, WalletList, XVERSE } from '../../config/TextData'
import { FaExternalLinkAlt } from "react-icons/fa";
import { connectToUnisatWallet } from '@/utils/wallet/unisat.wallet';
import { connectToXverseWallet } from '@/utils/wallet/xverse.wallet';


export default function WalletModal() {
  const { setOpenModal, address, setAddress } = useContext<any>(UserContext);
  const menuDropdown = useRef<HTMLDivElement | null>(null);

  const connectWallet = async (id: string) => {
    if (id == UNISAT) {
      let unisatAddress = await connectToUnisatWallet();
      if (unisatAddress) {
        let walletData = {
          walletType: UNISAT,
          taprootAddress: unisatAddress[0].address,
          paymentAddress: unisatAddress[0].address,
          paymentPublicKey: unisatAddress[0].publicKey
        }
        setAddress(unisatAddress[0].address);
        localStorage.setItem('walletData', JSON.stringify(walletData))
      }
    } else if (id == XVERSE) {
      let xverseAddress = await connectToXverseWallet();
      if (xverseAddress) {
        let walletData = {
          walletType: XVERSE,
          taprootAddress: xverseAddress[0].address,
          paymentAddress: xverseAddress[1].address,
          paymentPublicKey: xverseAddress[1].publicKey
        }
        setAddress(xverseAddress[0].address);
        localStorage.setItem('walletData', JSON.stringify(walletData))
      }
    }
  }

  const disconnectWallet = async () => {
    localStorage.removeItem('walletData')
    setAddress("");
    setOpenModal(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuDropdown.current && !menuDropdown.current.contains(event.target as Node)) {
        setOpenModal(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuDropdown]);

  return (
    <div className='fixed z-50 w-full h-full min-h-screen top-0'>
      <div className='w-full h-full min-h-screen absolute flex flex-col top-0 left-0 items-center justify-center gap-2 backdrop-blur-md z-40'>
        <div ref={menuDropdown} className='w-[280px] xs:w-[400px] flex flex-col border-[1px] border-[#232428] bg-[#fff]/80 shadow-xl shadow-[#f7931a] justify-center items-center py-12 px-8 gap-4 xs:gap-8 mx-auto rounded-lg'>
          <div className='text-xl xs:text-3xl font-bold text-[#f7931a] mb-3'>Connect your wallet</div>

          {WalletList.map((item, index) =>
            <div key={index} onClick={() => { connectWallet(item.id); setOpenModal(false) }} className='w-full flex flex-row items-center justify-between px-4 py-2 rounded-lg bg-[#FFF]/90 hover:bg-black/30 cursor-pointer'>
              <div className='flex flex-row items-center justify-start'>
                <Image src={item.url} alt={item.id} className='w-10 h-10 rounded-md' />
                <div className='text-[16px] text-[#f7931a] font-bold ml-4'>{item.name}</div>
              </div>
              <FaExternalLinkAlt className='text-[#f7931a]' style={{ fontWeight: "700" }} />
            </div>
          )}

          <div className='w-full flex flex-col xs:flex-row items-center justify-between px-3'>

            {address && address !== undefined && <div onClick={disconnectWallet} className='text-[20px] font-semibold text-white px-8 py-2 bg-[#0d6efd] rounded-full cursor-pointer mt-5 hover:bg-[#5392f1]'>Disconnect</div>}

            <div onClick={() => setOpenModal(false)} className='text-[20px] font-semibold text-white px-8 py-2 bg-[#0d6efd] rounded-full cursor-pointer mt-5 hover:bg-[#5392f1]'>Cancel</div>
          </div>
        </div>
      </div>
    </div>)
}
