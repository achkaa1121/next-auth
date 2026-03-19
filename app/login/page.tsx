import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg border p-8 shadow-md w-full max-w-sm space-y-3">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign in</h1>

        <form
          className="flex flex-col gap-2"
          action={async (formData: FormData) => {
            "use server";
            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirectTo: "/dashboard",
            });
          }}
        >
          <input
            name="email"
            className="outline-1 outline-gray-300 rounded-sm h-10 pl-3"
            type="email"
            placeholder="Email"
          />
          <input
            name="password"
            className="outline-1 outline-gray-300 rounded-sm h-10 pl-3"
            type="password"
            placeholder="Password"
          />
          <a href="/forgot" className="ml-1 hover:underline text-blue-600">
            Forgot password?
          </a>
          <button className="w-full rounded bg-blue-500 border border-gray-300 px-4 py-2 text-white hover:bg-blue-600">
            Sign in
          </button>{" "}
        </form>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded bg-white border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Sign in with Google
          </button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded bg-black border border-gray-300 px-4 py-2 text-gray-50 hover:bg-gray-900"
          >
            Sign in with Github
          </button>
        </form>
        <p className="text-center text-md text-gray-500">
          No account?{" "}
          <a href="/register" className="hover:underline text-blue-600">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
