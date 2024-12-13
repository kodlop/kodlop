"use client";

import Link from "next/link";
import { useState } from "react";

export function Banner() {

  const [isBannerVisible, setIsBannerVisible] = useState(true)

  function handleDismiss() {
    setIsBannerVisible(false)
  }

  return (
    <>
      {isBannerVisible && 
        <div className="flex items-center gap-x-6 bg-transparent px-6 py-2.5 sm:px-3.5 sm:before:flex-1 z-50">
          <Link href="#">
            <p className="text-sm leading-6 text-white mt-1">
              We are broke. Atleast buy us a chai ☕️<span aria-hidden="true">&rarr;</span>
            </p>
          </Link>
          <div className="flex flex-1 justify-end">
            <button onClick={handleDismiss} type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
              <span className="sr-only">Dismiss</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      }
    </>
  )
}