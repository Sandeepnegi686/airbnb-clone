"use client";

import { useEffect, useState } from "react";

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(function () {});
  return <div>{children}</div>;
}
