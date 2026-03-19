export const useChangePassword = (formData: FormData) => {
  return async () => {
    "use server";
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
  };
};
