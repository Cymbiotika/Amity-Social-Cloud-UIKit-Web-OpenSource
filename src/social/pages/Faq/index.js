import React, { useState } from 'react';
import styled from 'styled-components';

import FaqVideo from './FaqVideo';
import TourModal from '~/social/components/TourModal';
// import Accordion from '~/social/components/Accordion';

const FaqContainer = styled.div`
  margin: 0 auto;
  padding: 28px 20px;
  max-width: 546px;

  a {
    text-decoration: underline;
    color: #005850;
  }

  p {
    margin-bottom: 10px;
  }

  ol {
    margin-left: 16px;
    list-style-type: decimal;
  }
`;

const FaqPage = () => {
  const [tourModalIsOpen, setTourModalIsOpen] = useState(false);
  const openTourModal = () => {
    setTourModalIsOpen(true);
  };

  return (
    <>
      <TourModal tourModalIsOpen={tourModalIsOpen} setTourModalIsOpen={setTourModalIsOpen} />
      <FaqContainer>
        <h1 className="cym-h-1 !text-[24px] md:!text-[32px]">Help</h1>
        <hr className="my-[26px] md:my-[36px]" />
        <h2 className="mb-[24px] !text-[16px] md:!text-[20px]">Welcome!</h2>
        <FaqVideo />
        {/* <Accordion items={accordionItems} /> */}
        <h2 className="!text-[16px] md:!text-[20px font-ter">Frequently Asked Questions</h2>
        <div className="mt-[20px] md:mt-[24px] w-full mx-auto px-5 mb-[36px] bg-white min-h-sceen rounded-md">
          <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="!text-[12px] md:!text-[14px]">
                    Where do I login into the community?
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  Currently, the Arise Community is accessible via your account portal.{' '}
                  <a target="_blank" href="/account" className="underline">
                    Sign in here.
                  </a>{' '}
                  If you are a subscriber you will automatically be enrolled in Arise, our rewards
                  program. One of the perks of Arise is access to the community.
                </div>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="!text-[12px] md:!text-[14px]">
                    How do I join the Arise Community
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  <p>To join the Arise Community you must have an active subscription.</p>
                  <ol>
                    <li>Login into your account portal</li>
                    <li>Locate the Community tab on the menu bar</li>
                    <li>Accept the terms and conditions to get started.</li>
                  </ol>
                </div>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="!text-[12px] md:!text-[14px]"> How do I join a group?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  <p>
                    Locate groups to join on the sidebar if you are on desktop or top menu if you
                    are using mobile. Provide screenshots. Click join to add conversations from this
                    group to your newsfeed and to enable your option to post and interact within
                    that group.
                  </p>
                  <p>More groups to come!</p>
                </div>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="!text-[12px] md:!text-[14px]"> How do I post?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  <p>
                    Mobile. Locate the green pen and paper icon in the bottom right corner. Clicking
                    this icon will post the group page you are on when you post.
                  </p>
                  <p>Desktop: Find the text box at the top of your newsfeed or group.</p>
                  <p>
                    Posting photos or videos: You have the option to post text, video and photo or
                    even create a poll. Sharing unauthorized links or sensitive content will inhibit
                    sharing of your post.
                  </p>
                </div>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="!text-[12px] md:!text-[14px]">
                    {' '}
                    What do I do in the community?
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  <p>
                    How you use the community is up to you! This platform was created with our
                    customer base in mind.
                  </p>
                  <ol>
                    <li>Look forward to learning more about Cymbitoika products. </li>
                    <li>
                      Enjoy space to share health and wellness values with like minded individuals.
                    </li>
                    <li>Access exclusive content.</li>
                    <li>Participate in wellness challenges and games.</li>
                    <li>Exchange inspiration and knowledge with others.</li>
                  </ol>
                </div>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="!text-[12px] md:!text-[14px]">
                    How do I contact Cymbiotika about issues or concerns about the community?
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  <p>
                    For questions please contact our{' '}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://cymbiotika.com/pages/contact-us"
                    >
                      customer experience team{' '}
                    </a>
                    or message @Arise within the community.
                  </p>
                  <p>
                    If you have general feedback for improvement and would like to help shape the
                    future of the community, please fill out{' '}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://app.knocommerce.com/surveys/e407d4c1-2524-4b6c-bba1-3ee0ae432b1e"
                    >
                      this survey
                    </a>
                    .
                  </p>
                </div>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="!text-[12px] md:!text-[14px]">
                    How will I be notified of community events and interactions with my account?
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  <p>
                    You will be notified of interactions in your community while you are away via
                    email.
                  </p>
                  <p>
                    Look forward to community newsletters where we highlight key contributors to the
                    community and hot topics..
                  </p>
                </div>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="!text-[12px] md:!text-[14px]">What is my community role?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  <p>
                    Locate your community role next to your profile name. Look for Founder,
                    Cymbiologist and Moderator and Curated by Cymbiotika. This community role
                    determines your unique responsibility within the community.
                  </p>
                  <p>
                    Additionally your profile is tagged with your Arise tier. This tag showcases
                    your progress in Arise and determines your unique access to exclusive content.
                  </p>
                </div>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="!text-[12px] md:!text-[14px]">
                    What is the future of the Arise Community?
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  <p>
                    Our goal with Arise is to create an all-encompassing wellness platform. Whether
                    you&lsquo;re shopping, creating your routine, exploring the community, watching
                    live streams, tuning in to meditations or learning a new recipe, you can do
                    everything and more just in one location.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        <h3 className="mb-[20px] md:mb-[24px] !text-[16px] md:!text-[20px]">Need a refresher?</h3>
        <button
          type="button"
          className="py-[6px] px-[20px]  bg-cym-teal text-[16px] leading-[140%] font-mon uppercase text-white rounded-full"
          onClick={openTourModal}
        >
          Take the tour
        </button>
      </FaqContainer>
    </>
  );
};

export default FaqPage;
