"use client";
import {useChangePassword}from "./hooks/useChangePassword";
import { useState } from "react";

export default function ChangePasswordModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Change Password
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>

            <form
              action={useChangePassword(formData: FormData)}
            >
              <input
                name="currentPassword"
                type="password"
                placeholder="Current Password"
                className="w-full mb-3 p-2 border rounded"
              />

              <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                className="w-full mb-3 p-2 border rounded"
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                Update
              </button>
            </form>

            <button
              onClick={() => setOpen(false)}
              className="mt-3 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
