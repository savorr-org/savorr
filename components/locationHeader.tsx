import React from 'react'

export default function LocationHeader() {
    return (
    <header className="bg-green">
      <div className="container mx-auto px-4 md:px-12 pt-3 md:pt-6">
            <div className='flex justify-between items-center pb-3 font-manrope text-white font-bold'>
                <span className='flex justify-center items-center'>
                    <svg width="32" height="32" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.03696 21.1502C5.68756 22.046 4.22992 23.2942 4.22992 24.6749C4.22992 27.4006 9.91149 29.6103 16.9201 29.6103C23.9286 29.6103 29.6102 27.4006 29.6102 24.6749C29.6102 23.2942 28.1526 22.046 25.8032 21.1502M16.9201 12.6901H16.9342M25.3802 12.6901C25.3802 18.42 19.0351 21.1502 16.9201 25.3803C14.805 21.1502 8.45997 18.42 8.45997 12.6901C8.45997 8.01775 12.2477 4.23004 16.9201 4.23004C21.5924 4.23004 25.3802 8.01775 25.3802 12.6901ZM18.3301 12.6901C18.3301 13.4689 17.6988 14.1002 16.9201 14.1002C16.1413 14.1002 15.51 13.4689 15.51 12.6901C15.51 11.9114 16.1413 11.2801 16.9201 11.2801C17.6988 11.2801 18.3301 11.9114 18.3301 12.6901Z" stroke="white" stroke-width="2.11502" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    { typeof window !== "undefined" && localStorage.getItem('zipcode')}
                </span>

                <button>Change Location</button>
            </div>
        </div>
      </header>
    )
  }
