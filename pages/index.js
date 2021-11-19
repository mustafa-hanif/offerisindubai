import { createClient } from '@supabase/supabase-js'
import Head from 'next/head';
import Image from 'next/image';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';

const supabaseUrl = 'https://jsrjlfxhklrtqwqmtecc.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {
  useEffect(() => {
    document.body.className = 'bg-sky-50';
  }, []);
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-4">
      <Head>
        <title>Shisha offers in Dubai</title>
      </Head>
      <Heading />
      <Paragraph />
      <Offers />
    </main>
  );
}

function Paragraph() {
  return (
    <div className="mb-12 sm:px-6">
      <div className="flex text-sky-700 items-center justify-between flex-wrap sm:flex-nowrap"> 
        Welcome to Shisha offers in Dubai, below are the best deals for you today, come back tomorrow for more deals.
      </div>
    </div>)
};

function Offers() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    supabase
    .from('shisha_deals')
    .select(`
    social_image,
    offer_text,
    cafe (
      name
    )
  `).then(({ data: shisha_deals, error }) =>  { console.log(shisha_deals, error);
    setFiles(shisha_deals);
    });
  }, []);
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {files.concat(files).concat(files).map((file) => (
        <li key={file.social_image} className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <Image
              src={file.social_image}
              alt={file.cafe.name}
              width={480}
              height={480}
              className="object-cover pointer-events-none group-hover:opacity-75"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {file.title}</span>
            </button>
          </div>
          <div className='text-sky-700 font-medium pointer-events-none text-lg my-1'>{file.cafe.name}</div>
          <p className="mt-1 block text-sm font-medium text-sky-900 pointer-events-none">
            {file.offer_text}
          </p>
          <p className="block text-sm font-medium text-sky-700 pointer-events-none">
            <div className="flex my-2">
              <div>
                <LocationMarkerIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="mr-1">Get Directions</div>
            </div>
          </p>
        </li>
      ))}
    </ul>
  );
}

function Heading() {
  return (
    <div className="py-5 border-gray-200 sm:px-6">
      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div className="mt-2 mb-1">
          <h1 className="text-2xl mr-4 leading-6 font-medium text-sky-800">
            Shisha offers today
          </h1>
        </div>
        <div className="mt-2 mb-0 flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center mr-2 px-4 py-2 border border-sky-500 shadow-sm bg-sky-100 text-sm text-sky-700 font-medium rounded-md  hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Buy 1 get 1 offers
          </button>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md border-sky-500 text-sky-700 bg-sky-100 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Discount offers
          </button>
        </div>
      </div>
    </div>
  );
}
