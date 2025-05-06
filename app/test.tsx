"use client";

import { trpc } from "@/src/handlers/trpc/client";

export default function Test() {
  const { data } = trpc.getUserResume.useQuery();
  return <div>{data?.userId}</div>;
}
