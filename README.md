# News Archiver

News page archiver. Get back in time to read the latest news.

## Getting Started

### Accessing the online version

The online version of the News Archiver is available
at [https://news-archiver.khronozz.net/](https://news-archiver.khronozz.net/).

### Running the project locally using Docker

The project can be run locally using Docker. To do so, you need to have Docker installed on your machine.

Docker can be installed using the following links:
- [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

Once Docker is installed, you can run the project using the following command:
```bash
docker run -d -p 3000:3000 registry.gitlab.com/khronozz/news-archiver/news-archiver-frontend:latest
```

The project will be available at [http://localhost:3000/](http://localhost:3000/).

### Running the project locally using Node.js

The project can also be run locally using Next.js. To do so, you need to have Node.js installed on your machine.

Node.js can be installed using the following links:
- [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

The version of Node.js and Next.js used for this project are:
- Node.js: 18.14.2
- Next.js: 13.4.7

A .env file is required to run the project. This file is not included in the repository for security reasons.
The file sets the following environment variables:
- NEXT_PUBLIC_SUPABASE_URL: The URL of the Supabase project.
- NEXT_PUBLIC_SUPABASE_ANON_KEY: The anonymous key of the Supabase project.
- BUCKET_PUBLIC_URL: The URL of the bucket used to store the archived news screenshots.

Once Node.js is installed, you can run the frontend in development mode using the following command:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The project will be available at [http://localhost:3000/](http://localhost:3000/).

The backend that is responsible for taking regular screenshots of the news pages is run on Supabase edge functions.
The code of the backend is available in the following folder:
- news-archiver-scraper/supabase/functions/news-scraper

The edge function is triggered every day at 08:00 UTC +2. The screenshots are stored in a bucket on Supabase storage.

The code also requires a .env file to run. This file is not included in the repository for security reasons.
The file sets the following environment variables:
- PUPPETEER_BROWSERLESS_IO_KEY: The API key of the Browserless.io service used to take the screenshots.
- SUPABASE_URL: The URL of the Supabase project.
- SUPABASE_KEY: The key of the Supabase project.
