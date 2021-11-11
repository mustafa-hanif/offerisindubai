import Image from 'next/image';
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center bg-">
      <Heading />
      <Example />
    </main>
  );
}

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const files = [
  {
    title: '59 AED Brunch Offer',
    size: 'Malang Cafe',
    source:
      '/malang.png',
  },
  {
    title: '150 AED - 1 shisha 1 drink, semi final offer',
    size: 'Smoke Lab',
    source:
      '/smokelab.png',
  },
  // More files...
];

function Example() {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {files.map((file) => (
        <li key={file.source} className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <Image
              src={file.source}
              alt=""
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
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            {file.title}
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            {file.size}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Heading() {
  return (
    <div className="bg-white px-4 py-5 border-gray-200 sm:px-6">
      <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Shisha offers today
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center mr-2 px-4 py-2 border shadow-sm text-sm font-medium rounded-md  hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Buy 1 get 1 offers
          </button>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Discount offers
          </button>
        </div>
      </div>
    </div>
  );
}
