"use client"
import { useContext, useState } from 'react'
import { formatEndDate, formatEndTimeDate } from '@/utils/formatDate'
import UserContext from '@/contexts/usercontext'
import Countdown from './Countdown'

export default function TimeLeft() {
  const { currentNftData, currentNft } = useContext<any>(UserContext);
  const [timeLeftState, setTimeLeftState] = useState<boolean>(true)

  return (
    <div onClick={() => setTimeLeftState(!timeLeftState)} className={`${currentNft === 0 ? "cursor-pointer" : "cursor-not-allowed"} flex flex-row xs:flex-col justify-between gap-4 w-full text-center xs:text-start pl-2 xs:pl-8 px-2 pb-4 xs:pb-0`}>
      {currentNft === 0 ?
        <>
          <div className='text-[#79809c] text-base xs:text-md font-semibold text-start w-2/5 xs:w-full'>
            {timeLeftState ? "Time left" : `Ends on ${formatEndDate(currentNftData.endTime)}`}
          </div>
          <div className='text-black text-xl xs:text-2xl font-bold text-end xs:text-start w-3/5 xs:w-full'>
            {timeLeftState ? <Countdown targetTimestamp={currentNftData?.endTime} /> : `${formatEndTimeDate(currentNftData.endTime)}`}
          </div>
        </>
        :
        <>
          <div className='text-[#79809c] text-base xs:text-md font-semibold'>
            {currentNftData?.users.length === 0 ? "Held by" : "Winner"}
          </div>
          <a href={`https://mempool.space/testnet/tx/${currentNftData?.users?.txId !== "" ? currentNftData?.txId : ""}`} target="_blank" rel="noopener noreferrer" className='text-black text-xl xs:text-2xl font-bold'>
            {currentNftData?.users.length !== 0 ? `${currentNftData.users[0]?.userAddress?.slice(0, 4)}....${currentNftData?.users[0]?.userAddress?.slice(-4)}` : "nounders.eth"}
          </a>
        </>
      }
    </div>
  )
}