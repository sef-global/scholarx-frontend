import React from 'react';

// import styles from './Footer.module.css';



const FooterComponent: React.FC = () => (
  <>
    <div className="wrapper flex justify-around flex-col sm:flex-row ">
      <div className="col ml-8">
        <div className="footerMainTitle font-sans text-4xl text-darkmod-blue font-bold mb-12">
          Let`s Rethink Education!
        </div>
        <div className="footerSecondaryTitle font-sans text-base text-darkmod-blue font-normal">
          {' '}
          Get in touch with using any of these platforms.
        </div>

        {/* SEF Social Media Links */}
        <div className="flex socialmedia mt-[10px]">
          <div className="twitter w-7 h-7  rounded flex justify-center items-center bg-[#1DA1F2]">
            <a href="https://twitter.com/goasksef">
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Twitter"
                role="img"
                viewBox="0 0 512 512"
              >
                <rect width="512" height="512" rx="15%" fill="#1da1f2" />
                <path
                  fill="#ffffff"
                  d="M437 152a72 72 0 01-40 12a72 72 0 0032-40a72 72 0 01-45 17a72 72 0 00-122 65a200 200 0 01-145-74a72 72 0 0022 94a72 72 0 01-32-7a72 72 0 0056 69a72 72 0 01-32 1a72 72 0 0067 50a200 200 0 01-105 29a200 200 0 00309-179a200 200 0 0035-37"
                />
              </svg>
            </a>
          </div>

          <div className="facebook w-7 h-7 rounded flex justify-center items-center  bg-[#3B5999] ml-2 mb-2">
            <a href="https://www.facebook.com/sustainableeducationfoundation/">
              <svg
                className="w-7"
                viewBox="0 -6 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#475a96" d="M0 0h512v500H0z" />
                <path
                  d="M375.717 112.553H138.283c-8.137 0-14.73 6.594-14.73 14.73v237.434c0 8.135 6.594 14.73 14.73 14.73h127.826V276.092h-34.781v-40.28h34.781v-29.705c0-34.473 21.055-53.244 51.807-53.244 14.73 0 27.391 1.097 31.08 1.587v36.026l-21.328.01c-16.725 0-19.963 7.947-19.963 19.609v25.717h39.887l-5.193 40.28h-34.693v103.355h68.012c8.135 0 14.73-6.596 14.73-14.73V127.283c-.001-8.137-6.596-14.73-14.731-14.73z"
                  fill="#ffffff"
                />
              </svg>
            </a>
          </div>

          <div className="linkedin  w-7 h-7 rounded flex justify-center items-center p-0.5  bg-[#0077B5] ml-2 mb-2">
            <a href="https://www.linkedin.com/company/sefglobal/">
              <svg
                className="w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#f7f7f8"
                  d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                />
              </svg>
            </a>
          </div>
          <div className="instagram  w-7 h-7  rounded flex justify-center items-center  bg-[#E4405F] ml-2 mb-2">
            <a href="https://www.instagram.com/sefglobal/">
              <svg
                className="h-6 "
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#593636"
                stroke-width="0.00024000000000000003"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  stroke-width="0"
                  transform="translate(2.879999999999999,2.879999999999999), scale(0.76)"
                >
                  <rect
                    x="-2.4"
                    y="-2.4"
                    width="28.80"
                    height="28.80"
                    rx="14.4"
                    fill="#ffffff"
                    strokewidth="0"
                  ></rect>
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#c12584CCCCCC"
                  stroke-width="0.048"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                    fill="#c12584"
                  ></path>{' '}
                  <path
                    d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                    fill="#c12584"
                  ></path>{' '}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                    fill="#c12584"
                  ></path>{' '}
                </g>
              </svg>
            </a>
          </div>

          <div className="github rounded flex justify-center items-center  w-7 h-7 ml-2 mb-2">
            <a href="https://github.com/sef-global">
              <svg
                className="w-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM265.8 407.7c0-1.8 0-6 .1-11.6c.1-11.4 .1-28.8 .1-43.7c0-15.6-5.2-25.5-11.3-30.7c37-4.1 76-9.2 76-73.1c0-18.2-6.5-27.3-17.1-39c1.7-4.3 7.4-22-1.7-45c-13.9-4.3-45.7 17.9-45.7 17.9c-13.2-3.7-27.5-5.6-41.6-5.6s-28.4 1.9-41.6 5.6c0 0-31.8-22.2-45.7-17.9c-9.1 22.9-3.5 40.6-1.7 45c-10.6 11.7-15.6 20.8-15.6 39c0 63.6 37.3 69 74.3 73.1c-4.8 4.3-9.1 11.7-10.6 22.3c-9.5 4.3-33.8 11.7-48.3-13.9c-9.1-15.8-25.5-17.1-25.5-17.1c-16.2-.2-1.1 10.2-1.1 10.2c10.8 5 18.4 24.2 18.4 24.2c9.7 29.7 56.1 19.7 56.1 19.7c0 9 .1 21.7 .1 30.6c0 4.8 .1 8.6 .1 10c0 4.3-3 9.5-11.5 8C106 393.6 59.8 330.8 59.8 257.4c0-91.8 70.2-161.5 162-161.5s166.2 69.7 166.2 161.5c.1 73.4-44.7 136.3-110.7 158.3c-8.4 1.5-11.5-3.7-11.5-8zm-90.5-54.8c-.2-1.5 1.1-2.8 3-3.2c1.9-.2 3.7 .6 3.9 1.9c.3 1.3-1 2.6-3 3c-1.9 .4-3.7-.4-3.9-1.7zm-9.1 3.2c-2.2 .2-3.7-.9-3.7-2.4c0-1.3 1.5-2.4 3.5-2.4c1.9-.2 3.7 .9 3.7 2.4c0 1.3-1.5 2.4-3.5 2.4zm-14.3-2.2c-1.9-.4-3.2-1.9-2.8-3.2s2.4-1.9 4.1-1.5c2 .6 3.3 2.1 2.8 3.4c-.4 1.3-2.4 1.9-4.1 1.3zm-12.5-7.3c-1.5-1.3-1.9-3.2-.9-4.1c.9-1.1 2.8-.9 4.3 .6c1.3 1.3 1.8 3.3 .9 4.1c-.9 1.1-2.8 .9-4.3-.6zm-8.5-10c-1.1-1.5-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3c1.1 1.5 1.1 3.3 0 4.1c-.9 .6-2.6 0-3.7-1.5zm-6.3-8.8c-1.1-1.3-1.3-2.8-.4-3.5c.9-.9 2.4-.4 3.5 .6c1.1 1.3 1.3 2.8 .4 3.5c-.9 .9-2.4 .4-3.5-.6zm-6-6.4c-1.3-.6-1.9-1.7-1.5-2.6c.4-.6 1.5-.9 2.8-.4c1.3 .7 1.9 1.8 1.5 2.6c-.4 .9-1.7 1.1-2.8 .4z" />
              </svg>
            </a>
          </div>

          <div className="youtube bg-[#CD201F] rounded flex justify-center items-center w-7 h-7 ml-2 mb-2">
            <a href="https://www.youtube.com/channel/UClw7QbeW_FOJz_fDMvjXsJw">
              <svg
                className="w-4"
                viewBox="0 -3 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <title>youtube [#ffffff]</title>{' '}
                  <desc>Created with Sketch.</desc> <defs> </defs>{' '}
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    {' '}
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-300.000000, -7442.000000)"
                      fill="#ffffff"
                    >
                      {' '}
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        {' '}
                        <path
                          d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289"
                          id="youtube-[#ffffff]"
                        >
                          {' '}
                        </path>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                </g>
              </svg>
            </a>
          </div>

          <div className="slack bg-[#3AAF85]  w-7 h-7 ml-2 mb-2 rounded flex justify-center items-center">
            <a href="https://join.slack.com/t/sefheadquarters/shared_invite/zt-1h5zt3go4-wnRDDpecbWiTdpDv1VUoVg">
              <svg
                className="h-4"
                fill="#FFFFFF"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>slack</title>
                <path d="M19.955 23.108c-1.74 0-3.151-1.411-3.151-3.151s1.411-3.151 3.151-3.151h7.889c1.74 0 3.151 1.411 3.151 3.151s-1.411 3.151-3.151 3.151v0zM19.955 24.693c1.739 0 3.149 1.41 3.149 3.149s-1.41 3.149-3.149 3.149c-1.738 0-3.148-1.408-3.149-3.146v-3.152zM23.108 12.044c0 1.74-1.411 3.151-3.151 3.151s-3.151-1.411-3.151-3.151v0-7.888c0-1.74 1.411-3.151 3.151-3.151s3.151 1.411 3.151 3.151v0zM24.693 12.044c0.001-1.738 1.41-3.147 3.148-3.147s3.148 1.41 3.148 3.149c0 1.738-1.408 3.147-3.145 3.149h-3.152zM12.044 8.893c1.736 0.005 3.142 1.413 3.142 3.15s-1.406 3.146-3.142 3.15h-7.888c-1.736-0.005-3.142-1.413-3.142-3.15s1.406-3.146 3.142-3.15h0zM12.044 7.305c-1.736-0.002-3.143-1.41-3.143-3.147 0-1.738 1.409-3.147 3.147-3.147s3.145 1.408 3.147 3.144v3.149zM8.893 19.955c0.005-1.736 1.413-3.142 3.15-3.142s3.146 1.406 3.15 3.142v7.889c-0.005 1.736-1.413 3.142-3.15 3.142s-3.146-1.406-3.15-3.142v-0zM7.305 19.955c-0.001 1.737-1.41 3.145-3.147 3.145s-3.147-1.409-3.147-3.147c0-1.738 1.408-3.146 3.145-3.147h3.149z"></path>
              </svg>
            </a>
          </div>

          <div className="discourse bg-[#5E72E4] rounded flex justify-center items-center w-7 h-7 ml-2 mb-2 ">
            <a href="https://sef.discourse.group/">
              <svg
                className="h-4"
                fill="#ffffff"
                viewBox="-2.4 -2.4 28.80 28.80"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                stroke-width="0.00024000000000000003"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  stroke-width="0"
                  transform="translate(5.64,5.64), scale(0.53)"
                >
                  <rect
                    x="-2.4"
                    y="-2.4"
                    width="28.80"
                    height="28.80"
                    rx="0"
                    fill="#6271d5"
                    strokewidth="0"
                  ></rect>
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="m12.102 0c-.024 0-.053 0-.081 0-6.559 0-11.891 5.252-12.02 11.779v.012c0 .209.006 12.209.006 12.209l12.097-.01c6.582-.055 11.897-5.404 11.897-11.995s-5.315-11.939-11.892-11.995h-.005zm-.102 18.857c-.005 0-.01 0-.015 0-1.053 0-2.05-.239-2.94-.666l.041.018-4.345 1.077 1.227-4.018c-.522-.945-.83-2.072-.83-3.27 0-3.788 3.071-6.859 6.859-6.859s6.859 3.071 6.859 6.859c0 3.787-3.069 6.858-6.856 6.859z"></path>
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
      {/* SEF Site Links */}
      <div className="col">
        <div className="sitelinks pt-[15px]">
          <ul className="flex items-center ">
            <li>
              <a
                href="https://sefglobal.org"
                className="text-sm font-medium ml-5 mr-5 text-desatdark-blue"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://sefglobal.org/index.html#projects"
                className="text-sm font-medium mr-5 text-desatdark-blue"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="https://sefglobal.org/team.html"
                className="text-sm font-medium mr-5 text-desatdark-blue"
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="https://sefglobal.medium.com"
                className="text-sm font-medium mr-5 text-desatdark-blue"
              >
                Blog
              </a>
            </li>
            <li className="w-[70px]">
              <a
                href="https://sefglobal.org/join-us.html"
                className="text-sm font-medium mr-5 text-desatdark-blue inline-block w-[100%] block "
              >
                Join Us
              </a>
            </li>
            <li>
              <a
                href="https://handbook.sefglobal.org/"
                className="text-sm font-medium mr-5 text-desatdark-blue"
              >
                Handbook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Footer Link */}
    <div className="footerlinks flex justify-center mt-[8%]">
      <div className="footerLink font-sans text-base text-darkmod-blue font-normal ">
        © 2024
        <a
          href="https://sefglobal.org/"
          className=" sefLink active:text-darkmod-blue font-sans font-normal"
        >
          {' '}
          Sustainable Education Foundation - SEF.
        </a>{' '}
      </div>
    </div>
  </>
);
export default FooterComponent;
