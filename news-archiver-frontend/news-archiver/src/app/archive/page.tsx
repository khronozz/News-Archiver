'use client'
import {useEffect, useState} from "react";
import {useRouter} from 'next/navigation'
import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import cn from "@/app/(utils)/cn.ts";

export default function Archive() {
  const [isLoading, setIsLoading] = useState(true);
  const [brand, setBrand] = useState("No Brand Selected");
  const [date, setDate] = useState(dayjs());
  const [imageName, setImageName] = useState("No Name");
  const [brandImages, setBrandImages] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("No URL set");
  const [bucketUrl, setBucketUrl] = useState("No Bucket set");
  const [imageArray, setImageArray] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const router = useRouter();

  const getImageUrl = (brand, imageName) => {
    return bucketUrl + brand + '/' + imageName;
  }

  /**
   * This useEffect is used to get the data from localStorage
   */
  useEffect(() => {
    let brandData;
    try {
      brandData = localStorage.getItem('brand');
    } catch {
      brandData = null;
    }
    setBrand(brandData ? brandData : "No Brand Selected");

    let dateData;
    try {
      dateData = JSON.parse(localStorage.getItem('date'));
    } catch {
      dateData = null;
    }
    setDate(dateData ? dayjs(dateData) : dayjs());

    let brandImagesData;
    try {
      brandImagesData = JSON.parse(localStorage.getItem('brandImages'));
    } catch {
      brandImagesData = null;
    }
    setBrandImages(brandImagesData ? brandImagesData : []);

    let imageData;
    try {
      imageData = localStorage.getItem('imageName');
    } catch {
      imageData = null;
    }
    setImageName(imageData ? imageData : "No Name");

    let imageArrayData;
    try {
      imageArrayData = JSON.parse(localStorage.getItem('imageArray'));
    } catch {
      imageArrayData = null;
    }
    setImageArray(imageArrayData ? imageArrayData : []);

    setBucketUrl(
      process.env.NEXT_PUBLIC_SUPABASE_URL
      + '/storage/v1/object/public/news-archives/'
    );
    // Check if localStorage hasn't been set
    if (!brandData && !dateData && !brandImagesData && !imageData && !imageArrayData) {
      router.push('/error404');
    }
  }, [])

  useEffect(() => {
    if (brand !== "No Brand Selected" && imageName !== "No Name") {
      setCurrentImageUrl(getImageUrl(brand, imageName));
      setIsLoading(false);
    }
  }, [brand, imageName])

  useEffect(() => {
    if (imageArray.length > 0) {
      imageArray.forEach((image, index) => {
        if (image.name === imageName) {
          setImageIndex(index);
        }
      })
    }
  }, [imageArray])

  if (isLoading) {
    return (
      <main className='flex-grow'>
        <header className={"m-1 shadow-md"}>
          <div className='px-4 bg-white rounded-lg'>
            <nav className='md:flex items-center md:justify-between py-6'>
              <div className={"mb-2 md:mb-0 flex justify-center"}>
                <a
                  className='block text-3xl font-semibold leading-none'
                  href='/'
                  onClick={() => {
                    localStorage.clear();
                  }}
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
              </div>

              <div className={"mb-12 md:mb-0 flex justify-center"}>
                <Link href={"/"}>
                  <button
                    className={"bg-gray-300 hover:bg-gray-400 text-gray-700 font-extrabold py-2 px-4 rounded"}
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    Home
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <section className={"py-20"}>
          {/*  Waiting animation */}
          <div className={"flex flex-col items-center justify-center"}>
            <div className={"animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"}/>
          </div>
        </section>
      </main>
    )
  }

  return (
    <div className='flex flex-col min-h-screen'>

      <header className={"m-1 shadow-md"}>
        <div className='px-4 bg-white rounded-lg'>
          <nav className='md:flex items-center md:justify-between py-6'>
            <div className={"mb-2 md:mb-0 flex justify-center"}>
              <a
                className='block text-3xl font-semibold leading-none'
                href='/'
                onClick={() => {
                  localStorage.clear();
                }}
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
            </div>

            <div className={"mb-2 md:mb-0 flex justify-center"}>
              <Link href={"/"}>
                <button
                  className={"bg-gray-300 hover:bg-gray-400 text-gray-700 font-extrabold py-2 px-4 rounded"}
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  Home
                </button>
              </Link>
            </div>

            <div className={"flex justify-center md:justify-between"}>
              <Link href={""}>
                <button
                  className={cn(
                    imageIndex === 0 ? "bg-gray-300 text-gray-700 cursor-not-allowed" :
                      "bg-indigo-500 hover:bg-indigo-600 text-white",
                    "font-extrabold py-2 px-4 rounded"
                  )}
                  onClick={() => {
                    if (imageIndex > 0) {
                      setIsLoading(true);
                      setDate(dayjs(imageArray[imageIndex - 1].date));
                      setImageName(imageArray[imageIndex - 1].name);
                      setImageIndex(imageIndex - 1);
                      setImageLoaded(false)
                    }
                  }}
                >
                  &lt;
                </button>
              </Link>
              <div className={"flex flex-col justify-center ml-4 mr-4"}>
                <span className={"text-gray-700 font-bold text-xl"}>{date.format('DD/MM/YYYY')}</span>
              </div>
              <Link href={""}>
                <button
                  className={cn(
                    imageIndex === imageArray.length - 1 ? "bg-gray-300 text-gray-700 cursor-not-allowed" :
                      "bg-indigo-500 hover:bg-indigo-600 text-white",
                    "font-extrabold py-2 px-4 rounded"
                  )}
                  onClick={() => {
                    if (imageIndex < imageArray.length - 1) {
                      setIsLoading(true);
                      setDate(dayjs(imageArray[imageIndex + 1].date));
                      setImageName(imageArray[imageIndex + 1].name);
                      setImageIndex(imageIndex + 1);
                      setImageLoaded(false)
                    }
                  }}
                >
                  &gt;
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className='flex-grow'>
        <section>
          <div className={"flex flex-col items-center justify-center"}>
            <div className={"flex flex-col items-center justify-center"}>

              {/* Loading animation */}
              {!imageLoaded &&
                <div className={"flex flex-col items-center justify-center mt-20"}>
                  <div className={"animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"}/>
                  <div className={"mt-5 flex justify-center"}>
                    <h2 className="text-4xl text-indigo-600 font-extrabold tracking-px-2n leading-none">
                      Image Loading
                    </h2>
                  </div>
                </div>
              }

              <Image
                className={"rounded-md"}
                src={currentImageUrl}
                alt={imageName}
                width={1920}
                height={1080}
                // style={imageLoaded ? {} : {display: "none"}}
                onLoad={() => {
                  setImageLoaded(true)
                }}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className={"m-1 shadow-md"}>
        <div className='px-4 bg-gray-800 rounded-lg'>
          <nav className='flex items-center justify-center py-6 text-gray-200'>
            Coded with ❤️ by
            <a href={"https://www.gitlab.com/khronozz"} className={"ml-2 mr-2 text-gray-200 hover:text-gray-400"}>
              Khronozz
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}