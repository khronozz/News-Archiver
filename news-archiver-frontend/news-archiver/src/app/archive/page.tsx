'use client'
import {useEffect, useState} from "react";
import {useRouter} from 'next/navigation'
import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";

export default function Archive() {
  const [isLoading, setIsLoading] = useState(true);
  const [brand, setBrand] = useState("No Brand Selected");
  const [date, setDate] = useState(dayjs());
  const [imageName, setImageName] = useState("No Name");
  const [brandImages, setBrandImages] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("No URL set");
  const [bucketUrl, setBucketUrl] = useState("No Bucket set");

  //const router = useRouter();

  useEffect(() => {
    setBrand(localStorage.getItem('brand'));
    setDate(dayjs(JSON.parse(localStorage.getItem('date'))));
    setBrandImages(JSON.parse(localStorage.getItem('brandImages')));
    setImageName(localStorage.getItem('imageName'));
    setBucketUrl(
      process.env.NEXT_PUBLIC_SUPABASE_URL
      + '/storage/v1/object/public/news-archives/'
    );
  }, [])

  useEffect(() => {
    if (brand !== "No Brand Selected" && imageName !== "No Name") {
      setCurrentImageUrl(bucketUrl + brand + '/' + imageName);
      setIsLoading(false);
    }
  }, [brand, imageName])

  // useEffect(() => {
  //   if (brand === "No Brand Selected" && date === null) {
  //     router.back()
  //   }
  // }, [brand, date])

  if (isLoading) {
    return (
      <main>
      {/*  Waiting animation */}
        <div className={"flex flex-col items-center justify-center"}>
          <div className={"flex flex-col items-center justify-center"}>
            <div className={"animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"} />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* Use the whole page to display only the image */}
      <div className={"flex flex-col items-center justify-center"}>
        <div className={"flex flex-col items-center justify-center"}>
          <Link href={"/"} className={"text-blue-500 hover:text-blue-700"}>
            Back
          </Link>
          <Image
            src={currentImageUrl}
            alt={imageName}
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </main>
  )
}