import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import React from "react";

const Welcome = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");
  return (
    <h3 className="flex place-items-center justify-center h-96 bg-[url('/thinking-boy.svg')] bg-no-repeat">
      Thank you for logging into my website. <br /> However, I am currently in
      the planning stages. <br /> Thank you for your understanding.
    </h3>
  );
};

export default Welcome;
