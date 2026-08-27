import { redirect } from "next/navigation";

// The interview now lives at the site root; keep /about working as an alias.
export default function AboutRedirect() {
  redirect("/");
}
