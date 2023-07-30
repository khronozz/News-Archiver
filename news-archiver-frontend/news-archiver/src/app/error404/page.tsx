/**
 * Copyright 2023 Nicolas Favre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * page.tsx
 * Error 404 page
 *
 * @author Nicolas Favre
 * @date 29.07.2023
 * @version 1.0.0
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */

import Image from "next/image";

/**
 * Error 404 page
 * @constructor
 */
export default function Error404() {
  return (
    <main>
      <section className="pt-5 sm:pt-32 pb-36 bg-white overflow-hidden md:h-screen">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-8">
            <div className="w-full md:w-1/2 p-8">
              <div className="flex flex-col justify-between h-full">
                <div className="mb-8">
                  <h2 className="mb-6 text-9xl text-indigo-600 font-extrabold tracking-px-2n leading-none">
                    404
                  </h2>
                  <h3 className="mb-4 text-3xl font-extrabold font-heading leading-snug">
                    Something is wrong!
                  </h3>
                  <p className="text-lg text-gray-600 font-medium leading-normal md:max-w-md">
                    The page you are looking for is not found! Try something else or go back to homepage.
                    <br/>
                    <br/>
                    <span className={"font-semibold"}>
                    If you are accessing the archive page directly, please go back to the homepage
                    and select a news source first.
                    </span>
                  </p>
                </div>
                <div>
                  <a
                    className="inline-flex items-center text-center text-xl font-semibold text-indigo-600 hover:text-indigo-700 leading-normal"
                    href="/"
                  >
                    <svg className="mr-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.66667 12.6667L2 8.00004M2 8.00004L6.66667 3.33337M2 8.00004L14 8.00004"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>
                      Go Back to Homepage
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8 self-end">
              <Image
                src={"/illustration.png"}
                alt={"Error Illustration"}
                className={"mx-auto transform hover:-translate-x-4 transition ease-in-out duration-1000"}
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}