"use client";

import { trpc } from "@/src/trpc/client";

export default function Test() {
  const { data } = trpc.getUserResume.useQuery();
  return <div>{data?.userId}</div>;
}
