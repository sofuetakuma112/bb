import React from 'react';

export function Icon({
  name,
  title,
  className,
  width,
  height,
}: Readonly<{
  name: string;
  width?: string;
  height?: string;
  title?: string;
  className?: string;
}>) {
  return (
    <svg className={className} viewBox="0 0 28 28" aria-hidden="true" width={width} height={height}>
      {title && <title>{title}</title>}
      <use xlinkHref={`#${name}`}></use>
    </svg>
  );
}
