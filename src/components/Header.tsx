"use client";
import React, { useState, useEffect } from 'react';


import { KengLernitasLogo } from '@/components/Logo';

function PageNav({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-0.5 rounded-lg border border-slate-800 p-0.5">
      {children}
    </div>
  );
}

function PageNavItem({
  children,
  href,
  isSelected,
}: {
  children: React.ReactNode;
  href: string;
  isSelected?: boolean;
}) {

  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      className={`inline-block rounded-md px-3 py-2 text-sm font-medium ${
        isSelected
          ? 'bg-brand text-slate-950'
          : ' text-slate-400 hover:bg-slate-900 hover:text-slate-200'
      }`}
    >
      {children}
    </a>
  );
}

const pages = [
  { href: '/', label: 'KLEIPs' },
  { href: 'https://vote.kenglernitas.wtf', label: 'Vote' },
  { href: 'https://kenglernitas.wtf', label: 'Witepaiper' },
  //{ href: '/irs', label: 'IRs' },
  //{ href: '/wgcs', label: 'WGCs' },
  //{ href: '/rcs', label: 'RCs' },
  //{ href: '/trfs', label: 'TRFs' },
] as const;

type CurrentPage = (typeof pages)[number]['label'];

function Nav({ currentPage }: { currentPage: CurrentPage }) {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Only set screen width if running in the browser
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  if (screenWidth === null) {
    // Don't render anything until the screen width is determined
    return null;
  }

  return (
    <PageNav>
      {pages.map((page) => {
        if (screenWidth < 500 && page.label === 'Witepaiper') {
          return null;
        }
        return (
          <PageNavItem
            href={page.href}
            key={page.href}
            isSelected={currentPage === page.label}
          >
            {page.label}
          </PageNavItem>
        );
      })}
    </PageNav>
  );
}

export function Header({
  currentPage,
  className,
}: {
  currentPage: CurrentPage;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center gap-2.5 sm:gap-6 mr-10px">
      <div className="svg-margin">
      <KengLernitasLogo className="w-28 sm:w-36 md:w-60 lg:w-64 xl:w-80" />
      </div>
        <div className="text-xl text-slate-600">/</div>
        <h1 className="text-xl font-semibold text-slate-50">Proposals</h1>
      </div>
      <Nav currentPage={currentPage} />
    </div>
  );
}
