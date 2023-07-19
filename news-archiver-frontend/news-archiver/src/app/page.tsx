'use client'
import Image from 'next/image'
import {generateDate, months} from "@/app/utils/calendar.ts";
import cn from "@/app/utils/cn.ts";
import dayjs from "dayjs";
import {useState} from "react";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

export default function Home() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const currentDate = dayjs()
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  return (
    <main>
      <header>
        <div className='container px-4 mx-auto'>
          <nav className='flex items-center py-6'>
            <a
              className='block mx-auto text-3xl font-semibold leading-none'
              href='/'
            >
              <div className='flex items-center'>
                <Image
                  className='lg:h-14 h-10 w-auto'
                  src='/archive_icon.svg'
                  alt='News Archiver'
                  width={200}
                  height={200}
                />
                <span className='ml-3 font-bold lg:text-3xl text-2xl'>News Archiver</span>
              </div>
            </a>
          </nav>
        </div>
      </header>
      <section className='py-10'>
        <div className='container px-4 mx-auto'>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full lg:w-1/2 px-3 order-0 lg:order-0 mb-9'>
              <div className='max-w-md'>
                <h2 className='mb-4 text-3xl lg:text-4xl font-bold font-heading'>
                  Get back in time to read the latest news
                </h2>
                <p className='mb-6 leading-loose text-blueGray-400'>
                  Select a brand and an available date to read the previous headlines of
                  the chosen news website
                </p>

                <Image
                  className='sm:max-w-sm lg:max-w-full mx-auto'
                  src='/browse_articles.svg'
                  alt='Browse Articles'
                  width={500}
                  height={374}
                />

              </div>
            </div>

            <div className='w-full lg:w-1/2 lg:pt-0 order-1 lg:order-1 flex items-center justify-center'>

              <div className='w-96 h-96'>

                <div className="border-b mb-8 pb-8 flex justify-center">
                  <button
                    className="bg-[#325aff] transition-all hover:bg-blue-700 p-2 text-gray-800 font-bold rounded-l"
                  >
                    <Image
                      src="/afp_logo.svg"
                      alt="AFP"
                      width={100}
                      height={100}
                    />
                  </button>
                  <button
                    className="bg-[#0f0f0f] transition-all hover:bg-gray-700 p-2 text-gray-800 font-bold"
                  >
                    <Image
                      src="/frapp_logo.svg"
                      alt="Frapp"
                      width={100}
                      height={100}
                    />
                  </button>
                  <button
                    className="bg-[#e21922] transition-all hover:bg-red-700 p-2 text-gray-800 font-bold"
                  >
                    <Image
                      src="/laliberte_logo.svg"
                      alt="La Liberté"
                      width={100}
                      height={100}
                    />
                  </button>
                  <button
                    className="bg-[#640091] transition-all hover:bg-fuchsia-950 p-2 text-gray-800 font-bold rounded-r"
                  >
                    <Image
                      src="/shortpedia_logo.svg"
                      alt="shortpedia"
                      width={100}
                      height={100}
                    />
                  </button>
                </div>

                <div className="flex justify-between">
                  <h1 className="font-semibold">{months[today.month()]}, {today.year()}</h1>
                  <div className="flex items-center gap-5">
                    <GrFormPrevious className="w-5 h-5 cursor-pointer" onClick={() => {
                      setToday(today.subtract(1, 'month'))
                    }}/>
                    <h1 className="cursor-pointer" onClick={() => {
                      setToday(currentDate)
                    }}>Today</h1>
                    <GrFormNext className="w-5 h-5 cursor-pointer" onClick={() => {
                      setToday(today.add(1, 'month'))
                    }}/>
                  </div>
                </div>
                <div className='w-full grid grid-cols-7'>
                  {days.map((day, index) => {
                    return (
                      <h1 key={index} className='h-12 grid place-content-center text-sm text-gray-400'>
                        {day}
                      </h1>
                    );
                  })}
                </div>
                <div className='w-full grid grid-cols-7'>
                  {generateDate(today.month(), today.year()).map(({date, currentMonth, today}, index) => {
                    return (
                      <div key={index} className='h-12 border-t grid place-content-center text-sm'>
                        <h1
                          className={cn(
                            currentMonth ? "hover:text-white hover:bg-gray-300 transition-all cursor-pointer" : "text-gray-400",
                            today ? "bg-indigo-500 text-white" : "",
                            "h-10 w-10 rounded-full grid place-content-center"
                          )}
                          onClick={() => {
                            if (currentMonth) {
                              setSelectedDate(date)
                            }
                          }}
                        >
                          {date.date()}
                        </h1>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
