import React from 'react';

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-brand-dark relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1.5 after:bg-brand-yellow after:rounded-full">
    {children}
  </h2>
);

export default SectionHeading;
