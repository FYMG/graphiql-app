import React from 'react';
import Image from 'next/image';

function EmptyResponseField() {
  return (
    <div className="mb-4 flex flex-col items-center gap-2">
      <Image src="/rest-img.png" alt="Empty URL field" width={100} height={100} />
      <span className="text-foreground">
        Enter the URL and click Send to get a response
      </span>
    </div>
  );
}

export default EmptyResponseField;
