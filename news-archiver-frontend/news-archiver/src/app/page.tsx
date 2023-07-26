'use client'
import Image from 'next/image'
import {generateDate, months} from "@/app/utils/calendar.ts";
import cn from "@/app/utils/cn.ts";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {supabase} from "@/app/utils/initSupabase.ts";
import {useRouter, useSearchParams} from 'next/navigation'

export default function Home() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs()
  const router = useRouter()
  //const [searchParams, setSearchParams] = useSearchParams()

  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedBrand, setSelectedBrand] = useState('default');
  const [selectedImages, setSelectedImages] = useState(null);
  const [afpImages, setAfpImages] = useState(null);
  const [frappImages, setFrappImages] = useState(null);
  const [laliberteImages, setLaliberteImages] = useState(null);
  const [shortpediaImages, setShortpediaImages] = useState(null);
  const [validSearch, setValidSearch] = useState(false);

  const fetchImages = async (brand: string, imageSetter: any) => {
    const {data, error} = await supabase
      .storage
      .from('news-archives')
      .list(brand, {
        sortBy: {column: 'name', order: 'desc'},
      })
    if (error) {
      console.log(error)
    }
    imageSetter(data)
  }

  useEffect(() => {
    fetchImages('afp', setAfpImages).then(() => {
      //console.log("Fetched images from afp")
    });
    fetchImages('frapp', setFrappImages).then(() => {
      //console.log("Fetched images from frapp")
    });
    fetchImages('laliberte', setLaliberteImages).then(() => {
      //console.log("Fetched images from laliberte")
    });
    fetchImages('shortpedia', setShortpediaImages).then(() => {
      //console.log("Fetched images from shortpedia")
    });
  }, []);

  return (
    <main>
      <header className={"ml-3 mt-3 mr-3 shadow-md"}>
        <div className='px-4 bg-white rounded-lg'>
          <nav className='flex items-center py-6'>
            <a
              className='block text-3xl font-semibold leading-none'
              href='/'
            >
              <div className='flex items-center'>
                <Image
                  className='lg:h-10 h-10 w-auto'
                  src='/archive_icon.svg'
                  alt='News Archiver'
                  width={100}
                  height={100}
                />
                <span className='ml-3 font-bold lg:text-2xl text-2xl text-gray-700'>News Archiver</span>
              </div>
            </a>
          </nav>
        </div>
      </header>
      <section className='py-10 mb-24'>
        <div className='container px-4 mx-auto'>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full lg:w-1/2 px-3 order-0 lg:order-0'>
              <div className='max-w-md'>
                <h2 className='mb-4 text-3xl lg:text-4xl font-bold font-heading'>
                  Get back in time to read the latest news
                </h2>
                <p className='leading-loose text-blueGray-400'>
                  Select a brand and an available date to read the previous headlines of
                  the chosen news website
                </p>

                <Image
                  className='sm:max-w-sm lg:max-w-full mx-auto mb-10 mt-4 lg:mb-0 bg-white p-3 rounded-lg shadow-md'
                  src='/browse_articles.svg'
                  alt='Browse Articles'
                  width={500}
                  height={374}
                />

              </div>
            </div>

            <div className='w-full lg:w-1/2 lg:pt-0 order-1 lg:order-1 flex items-center justify-center'>

              <div className='w-96 h-96'>

                <div className="mb-6 flex justify-center bg-white p-2 rounded-lg shadow-md">
                  <button
                    className={
                      "bg-[#325aff] transition-all hover:bg-blue-700 p-2 text-gray-800 font-bold border-4 rounded-l"
                      + (selectedBrand === 'afp' ? " border-black" : " border-white")
                    }
                    onClick={() => {
                      setSelectedBrand('afp')
                      setSelectedImages(afpImages)
                    }}
                  >
                    <Image
                      src="/afp_logo.svg"
                      alt="AFP"
                      width={100}
                      height={100}
                    />
                  </button>
                  <button
                    className={
                      "bg-[#0f0f0f] transition-all hover:bg-gray-700 p-2 text-gray-800 font-bold border-4"
                      + (selectedBrand === 'frapp' ? " border-black" : " border-white")
                    }
                    onClick={() => {
                      setSelectedBrand('frapp')
                      setSelectedImages(frappImages)
                    }}
                  >
                    <Image
                      src="/frapp_logo.svg"
                      alt="Frapp"
                      width={100}
                      height={100}
                    />
                  </button>
                  <button
                    className={
                      "bg-[#e21922] transition-all hover:bg-red-700 p-2 text-gray-800 font-bold border-4"
                      + (selectedBrand === 'laliberte' ? " border-black" : " border-white")
                    }
                    onClick={() => {
                      setSelectedBrand('laliberte')
                      setSelectedImages(laliberteImages)
                    }}
                  >
                    <Image
                      src="/laliberte_logo.svg"
                      alt="La Liberté"
                      width={100}
                      height={100}
                    />
                  </button>
                  <button
                    className={
                      "bg-[#640091] transition-all hover:bg-fuchsia-950 p-2 text-gray-800 font-bold rounded-r border-4"
                      + (selectedBrand === 'shortpedia' ? " border-black" : " border-white")
                    }
                    onClick={() => {
                      setSelectedBrand('shortpedia')
                      setSelectedImages(shortpediaImages)
                    }}
                  >
                    <Image
                      src="/shortpedia_logo.svg"
                      alt="shortpedia"
                      width={100}
                      height={100}
                    />
                  </button>
                </div>

                <div className="flex justify-between bg-white pt-4 rounded-t-lg shadow-md">
                  <h1 className="font-semibold pl-3">{months[today.month()]}, {today.year()}</h1>
                  <div className="flex items-center gap-5 pr-3">
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
                <div className='w-full grid grid-cols-7 bg-white pl-3 pr-3 shadow-md'>
                  {days.map((day, index) => {
                    return (
                      <h1 key={index} className='h-12 grid place-content-center text-sm text-gray-400'>
                        {day}
                      </h1>
                    );
                  })}
                </div>
                <div className='w-full grid grid-cols-7 bg-white pl-3 pr-3 rounded-b-lg shadow-md'>
                  {generateDate(
                    today.month(), today.year(), selectedBrand, selectedImages
                  ).map(({
                           date,
                           currentMonth,
                           today,
                           availableArchive
                         }, index) => {
                    return (
                      <div key={index} className='h-12 border-t grid place-content-center text-sm'>
                        <h1
                          className={cn(
                            currentMonth ?
                              availableArchive ? "hover:text-white hover:bg-red-600 transition-all cursor-pointer" : "text-gray-600 cursor-not-allowed"
                              : "text-gray-400 cursor-not-allowed",
                            today ? "bg-indigo-500 !text-white" : "",
                            availableArchive && !today ? "bg-black text-white" : "",
                            selectedDate.isSame(date) && availableArchive ? "bg-red-600 !text-white" : "",
                            "h-10 w-10 rounded-full grid place-content-center"
                          )}
                          onClick={() => {
                            if (currentMonth && availableArchive) {
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

                <div className="flex">
                  <button
                    className="bg-gray-700 hover:bg-gray-900 transition-all text-white px-4 py-2 rounded-md my-5 shadow-md"
                    onClick={() => {
                      if (selectedBrand !== 'default' && selectedDate !== null) {
                        setValidSearch(true)
                        localStorage.setItem('brand', selectedBrand)
                        localStorage.setItem('date', JSON.stringify(selectedDate))
                        localStorage.setItem('brandImages', JSON.stringify(selectedImages))

                        selectedImages.map((image) => {
                          let imageCreationDate = image.name.split('_')[1];
                          imageCreationDate = imageCreationDate.split('.')[0];
                          imageCreationDate = dayjs(Number(imageCreationDate));
                          if (dayjs(selectedDate).isSame(imageCreationDate, 'day')) {
                            localStorage.setItem('imageName', image.name)
                          }
                        })

                        router.push('/archive')
                      }
                    }}
                  >
                    Search
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <footer className={"ml-3 mb-2 mr-3 shadow-md"}>
        <div className='px-4 bg-gray-800 rounded-lg'>
          <nav className='flex items-center justify-center py-6 text-gray-200'>
            Coded with ❤️ by
            <a href={"https://www.gitlab.com/khronozz"} className={"ml-2 mr-2 text-gray-200 hover:text-gray-400"}>
              Khronozz
            </a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
