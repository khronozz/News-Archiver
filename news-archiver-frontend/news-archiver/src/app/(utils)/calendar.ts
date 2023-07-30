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
 * calendar.ts
 * Generate an array of dates for a given month and year
 *
 * @author Nicolas Favre
 * @date 29.07.2023
 * @version 1.0.0
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */


import dayjs from "dayjs";

/**
 * Generate an array of dates for a given month and year
 * @param month
 * @param year
 * @param brand - news page brand
 * @param images - array of news page screenshot images
 */
export const generateDate = (
  month: number = dayjs().month(),
  year: number = dayjs().year(),
  brand: string = 'default',
  images: any = {}
): {
  currentMonth: boolean,
  date: dayjs.Dayjs,
  today: boolean,
  availableArchive: boolean
}[] => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');

  const arrayOfDates: {
    currentMonth: boolean,
    date: dayjs.Dayjs,
    today: boolean,
    availableArchive: boolean
  }[] = [];
  const arrayOfImageCreationDates: any[] = [];
  if (brand !== 'default') {
    images.forEach((image: any) => {
      let imageCreationDate = image.name.split('_')[1];
      imageCreationDate = imageCreationDate.split('.')[0];
      // Convert unix timestamp to dayjs object
      imageCreationDate = dayjs(Number(imageCreationDate));
      if (imageCreationDate.isSame(firstDateOfMonth, 'month')) {
        arrayOfImageCreationDates.push(imageCreationDate);
      }
    })
  }

  // Generate prefix dates
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDates.push({
      currentMonth: false,
      date: firstDateOfMonth.day(i),
      today: false,
      availableArchive: false
    });
  }

  // Generate array of dates
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDates.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today: dayjs().isSame(firstDateOfMonth.date(i), 'day'),
      availableArchive: arrayOfImageCreationDates.some((imageCreationDate: any) => {
        return imageCreationDate.isSame(firstDateOfMonth.date(i), 'day');
      })
    });
  }

  // Generate suffix dates
  const remaining = 42 - arrayOfDates.length;

  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
    arrayOfDates.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
      today: false,
      availableArchive: false
    });
  }

  return arrayOfDates;
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];