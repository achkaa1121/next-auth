import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
const ForgotPasswordPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg border p-8 shadow-md w-full max-w-sm space-y-3">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <p className="mb-4 text-gray-600">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>
        <form
          className="flex flex-col gap-4"
          action={async (formData: FormData) => {
            "use server";
            const email = formData.get("email") as string;
            const user = await prisma.user.findUnique({ where: { email } });
            const rawToken = crypto.randomBytes(32).toString("hex");
            const hashedToken = await bcrypt.hash(rawToken, 10);
            const expiry = new Date(Date.now() + 15 * 60 * 1000);

            await prisma.user.update({
              where: { id: user?.id },
              data: {
                resetToken: hashedToken,
                resetTokenExpiry: expiry,
              },
            });
            const resetLink = `https://myapp.com/reset-password?token=${rawToken}&id=${user?.id}`;
            // await sendEmail(user?.email, "Reset your password", resetLink);
          }}
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="outline-1 outline-gray-300 rounded-sm h-10 pl-3"
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 border border-gray-300 px-4 py-2 text-white hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
