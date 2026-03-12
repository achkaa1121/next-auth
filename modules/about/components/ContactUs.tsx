"use client";

import { Button } from "@/components/ui/button";

export const ContactUs = () => {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => {
        console.log("ContactUs");
      }}
    >
      Contact Us
    </Button>
  );
};
