import React from 'react'
import { SocialLink } from '@/config/TextData';

export default function Footer() {
  return (
    <div className='w-full h-[90px] flex flex-col bg-white border-t-[1px] border-t-black'>
      <div className='container'>
        <div className='w-full h-[90px] flex flex-col 2xs:flex-row justify-between items-center py-2 px-[10px] sm:px-[100px]'>
          <p className='text-[12px] sm:text-[14px] text-black'>©2024 Ordinal Nouns. All Rights Reserved.</p>
          <div className='flex flex-row justify-start items-center gap-2 text-sm sm:text-xl'>
            {SocialLink.map((item: any, index: number) => {
              return (
                <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                  <div className='rounded-full flex flex-col p-[10px] bg-[#f7931a]/10 text-[#f7931a] border-[1px] border-[#f7931a] cursor-pointer'>
                    {item.icon}
                  </div>
                </a>
              )
            })

            }
          </div>
        </div>
      </div>
    </div>
  )
}
