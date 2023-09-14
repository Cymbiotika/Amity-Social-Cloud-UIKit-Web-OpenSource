import React from 'react';

const Accordion = ({ items }) => {
  return (
    <div className="w-full mx-auto px-5 mb-[36px] bg-white min-h-sceen rounded-md">
      <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
        {items.map((item, index) => (
          <div key={index} className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>{item.title}</span>
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
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn ml-[16px] text-[14px]">
                {item.content}
              </p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
