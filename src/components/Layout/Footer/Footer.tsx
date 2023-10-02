import React from 'react';

const FooterComponent: React.FC = () => (
  <div>
    <div className='flex flex-row px-36 py-16 justify-between bg-white_2'>
    <div className='flex flex-col'>
      <div>
        <p className='text-4xl font-bold text-purple'>Let`s Rethink Education!</p>
        <p className='text-sm font-medium text-purple mt-10'>
          Get in touch with using any of these platforms.
        </p>
      </div>
      {/* SEF Social Media Links */}
      <div className='flex flex-row gap-2 mt-2'>
        <a href="https://twitter.com/goasksef" target="_blank" rel="noreferrer">
          <img
            src = '/footer-twitter-icon.svg'
            alt='twitter-icon'
          />
        </a>
        <a
          href="https://www.facebook.com/sustainableeducationfoundation/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src = '/footer-fb-icon.svg'
            alt='facebook-icon'
          />
        </a>
        <a
          href="https://www.linkedin.com/company/sefglobal/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src = '/footer-linkedin-icon.svg'
            alt='linkedin-icon'
          />
        </a>
        <a
          href="https://www.instagram.com/sefglobal/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src = '/footer-insta-icon.svg'
            alt='instagram-icon'
          />
        </a>
        <a
          href="https://github.com/sef-global"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src = '/footer-github-icon.svg'
            alt='github-icon'
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UClw7QbeW_FOJz_fDMvjXsJw"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src = '/footer-yt-icon.svg'
            alt='youtube-icon'
          />
        </a>
        <a
          href="https://join.slack.com/t/sefheadquarters/shared_invite/zt-1h5zt3go4-wnRDDpecbWiTdpDv1VUoVg"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src = '/footer-slack-icon.svg'
            alt='slack-icon'
          />
        </a>
        <a href="https://sef.discourse.group/" target="_blank" rel="noreferrer">
        <img
            src = '/footer-discourse-icon.svg'
            alt='discourse-icon'
          />
        </a>
      </div>
    </div>

    {/* SEF Site Links */}
    <div className='flex flex-row gap-8'>
      <a href="https://sefglobal.org/">
        <p className='text-sm text-gray_1 font-medium'>Home</p>
      </a>
      <a href="https://sefglobal.org/index.html#projects">
        <p className='text-sm text-gray_1 font-medium'>Projects</p>
      </a>
      <a href="https://sefglobal.org/team.html">
        <p className='text-sm text-gray_1 font-medium'>Team</p>
      </a>
      <a href="https://sefglobal.medium.com/">
        <p className='text-sm text-gray_1 font-medium'>Blog</p>
      </a>
      <a href="https://sefglobal.org/join-us.html">
        <p className='text-sm text-gray_1 font-medium'>Join Us</p>
      </a>
      <a
        href="https://handbook.sefglobal.org/"
        target="_blank"
        rel="noreferrer"
      >
        <p className='text-sm text-gray_1 font-medium'>Handbook</p>
      </a>
    </div>
</div>
    {/* Footer Link */}
    <div className='text-center mb-4'>
      <p className='text-sm text-purple font-medium'>
        © 2023
        <a href="https://sefglobal.org/">
          {' '}
          Sustainable Education Foundation - SEF.
        </a>
      </p>
    </div>
  </div>
  

);
export default FooterComponent;
