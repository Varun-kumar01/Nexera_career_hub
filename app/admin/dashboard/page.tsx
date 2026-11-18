import { redirect } from "next/navigation";

export default function AdminDashboardRedirect() {
  redirect("/secure/dashboard");
}
