import Image from 'next/image'
import Logo from '@/../public/assest/images/logo.png'

export default function Loading() {
  return (
    <div className="z-50 w-screen md:w-full flex h-full min-h-screen top-0 left-0 bg-black/40 fixed">
      <div className='w-full h-screen bg-cover flex justify-center items-center backdrop-blur-md'>
        <div className='relative top-0 left-0 rotate-45 mx-auto bg-black/70 border-[#f7931a] border-[2px] w-40 h-40  rounded-2xl'>
          <Image src={Logo} alt="Logo" className='mx-auto w-16 z-10 relative -rotate-45 top-16' />
          <div
            className="inline-block h-24 w-24 animate-spin text-[#f7931a] rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>
        </div>
      </div>
    </div>)
}