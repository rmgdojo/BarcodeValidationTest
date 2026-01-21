import type React from "react";

import Image from "next/image";

export const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground text-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Image src="/rm-logo.svg" alt="Profile" width={68} height={46} />
          <h1 className="text-2xl font-bold tracking-tight">
            Royal Mail Barcode Validator
          </h1>
        </div>
      </div>
    </header>
  );
}
