/** @type {import('next').NextConfig} */

// const { parsed: localEnv } = require("dotenv").config({
//   path: `./.env.${process.env.NODE_ENV}`,
// });
module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // env: {
  //   NEXT_PUBLIC_CONVEX_URL: localEnv.NEXT_PUBLIC_CONVEX_URL,
  // },

  webpack: (config) => {
    // console.log(config);

    return config;
  },
};
