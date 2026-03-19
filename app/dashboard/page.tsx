import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import ChangePassForm from "./ChangePassForm";
export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="p-8 flex flex-col gap-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">
        Welcome, <strong>{session.user?.email}</strong>
      </p>
      <p className="text-gray-500 mt-2">
        Role:{" "}
        <span className="font-mono bg-gray-100 px-1 rounded">
          {session.user?.role}
        </span>
      </p>
      <ChangePassForm />
      change password
      <LogoutButton />
    </div>
  );
}
