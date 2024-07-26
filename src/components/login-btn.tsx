"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-col justify-between min-h-full p-3 lg:p-6">
        <div className="flex w-full p-0 gap-2 items-center">
          <div className="h-12 relative overflow-hidden w-12 rounded-full bg-black p-2 border-2 flex justify-center items-center">
            <Image
              src={
                session.user?.image ||
                "https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg"
              }
              alt="Product image"
              fill
              className="object-cover transition-all rounded-full duration-300 hover:scale-105 animate__animated animate__faster animate__fadeIn"
            />
          </div>
          <span className="hidden lg:flex flex-col items-start">
            <p className="text-lg font-semibold truncate">
              {session.user?.name}
            </p>
            <p className="text-sm font-light truncate">{session.user?.email}</p>
          </span>
        </div>
        <Button className="w-full" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between min-h-full p-6">
      <div className="flex w-full p-0 gap-2 items-center">
        <div className="h-12 relative overflow-hidden w-12 rounded-full bg-black p-2 border-2 flex justify-center items-center">
          <Image
            src={
              "https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg"
            }
            alt="Product image"
            fill
            className="object-cover transition-all rounded-full duration-300 hover:scale-105 animate__animated animate__faster animate__fadeIn"
          />
        </div>
        <span className="flex flex-col items-start">
          <p className="text-lg font-semibold truncate">Sign in</p>
          <p className="text-sm font-light truncate w-1/3"></p>
        </span>
      </div>
    </div>
  );
}
