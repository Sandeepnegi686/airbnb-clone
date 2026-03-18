import { Suspense } from "react";
import AuthHandler from "../_components/AuthHandler";

export const dynamic = "force-dynamic";

export default function GoogleAuth() {
  return (
    <Suspense fallback={<p>Signing you in...</p>}>
      <AuthHandler />
    </Suspense>
  );
}
