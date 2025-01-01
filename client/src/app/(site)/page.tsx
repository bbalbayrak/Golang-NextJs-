"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function deneme() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/users`);
  }, []);

  return <></>;
}
