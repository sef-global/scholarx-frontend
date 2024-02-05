import React from 'react';
import Twittericon from '../../../assets/svg/Icons/Twittericon.jsx';
import Facebookicon from '../../../assets/svg/Icons/Facebookicon.jsx';
import Linkedinicon from '../../../assets/svg/Icons/Linkedinicon.jsx';
import Instagramicon from '../../../assets/svg/Icons/Instagramicon.jsx';
import Discourseicon from '../../../assets/svg/Icons/Discourseicon.jsx';
import Slackicon from '../../../assets/svg/Icons/Slackicon.jsx';
import Githubicon from '../../../assets/svg/Icons/Githubicon.jsx';
import Youtubeicon from '../../../assets/svg/Icons/Youtubeicon.jsx';

const FooterComponent: React.FC = () => (
  <>
    <div className="wrapper flex justify-around flex-col sm:flex-row ">
      <div className="col ml-8">
        <div className="footerMainTitle font-sans text-4xl text-darkmod-blue font-bold mb-12">
          Let`s Rethink Education!
        </div>
        <div className="footerSecondaryTitle font-sans text-base text-darkmod-blue font-normal">
         
          Get in touch with using any of these platforms.
        </div>

        {/* SEF Social Media Links */}
        <div className="flex socialmedia mt-[10px]">
          <div className="twitter w-7 h-7  rounded flex justify-center items-center bg-[#1DA1F2]">
            <a href="https://twitter.com/goasksef">
              <Twittericon />
            </a>
          </div>

          <div className="facebook w-7 h-7 rounded flex justify-center items-center  bg-[#3B5999] ml-2 mb-2">
            <a href="https://www.facebook.com/sustainableeducationfoundation/">
              <Facebookicon />
            </a>
          </div>

          <div className="linkedin  w-7 h-7 rounded flex justify-center items-center p-0.5  bg-[#0077B5] ml-2 mb-2">
            <a href="https://www.linkedin.com/company/sefglobal/">
              <Linkedinicon />
            </a>
          </div>
          <div className="instagram  w-7 h-7  rounded flex justify-center items-center  bg-[#E4405F] ml-2 mb-2">
            <a href="https://www.instagram.com/sefglobal/">
              <Instagramicon />
            </a>
          </div>

          <div className="github rounded flex justify-center items-center  w-7 h-7 ml-2 mb-2">
            <a href="https://github.com/sef-global">
              <Githubicon />
            </a>
          </div>

          <div className="youtube bg-[#CD201F] rounded flex justify-center items-center w-7 h-7 ml-2 mb-2">
            <a href="https://www.youtube.com/channel/UClw7QbeW_FOJz_fDMvjXsJw">
              <Youtubeicon />
            </a>
          </div>

          <div className="slack bg-[#3AAF85]  w-7 h-7 ml-2 mb-2 rounded flex justify-center items-center">
            <a href="https://join.slack.com/t/sefheadquarters/shared_invite/zt-1h5zt3go4-wnRDDpecbWiTdpDv1VUoVg">
              <Slackicon />
            </a>
          </div>

          <div className="discourse bg-[#5E72E4] rounded flex justify-center items-center w-7 h-7 ml-2 mb-2 ">
            <a href="https://sef.discourse.group/">
              <Discourseicon />
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
        </a>
      </div>
    </div>
  </>
);
export default FooterComponent;
