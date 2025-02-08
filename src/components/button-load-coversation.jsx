import React, { useState } from "react";
import { Button } from "./ui/button";

export default function ButtonLoadCoversation({ data }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  return (
    <Button
      key={data?.id}
      variant="ghost"
      className="w-full justify-start gap-2 text-gray-700 hover:text-primary hover:bg-blue-50"
      loading={isLoading}
      onClick={handleClick}
    >
      {data?.name || "Senza nome"}
    </Button>
  );
}
