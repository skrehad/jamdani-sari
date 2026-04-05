/* eslint-disable @typescript-eslint/no-explicit-any */
export const loginUser = async (userData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return res.json();
};

export const registerUser = async (userData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return res.json();
};

// export const getCurrentUser = async () => {
//   const token = localStorage.getItem("accessToken");

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/get-me`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };

// export const getCurrentUser = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/get-me`, {
//     credentials: "include", // 🔥 important
//   });

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };

export const getCurrentUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/get-me`, {
    credentials: "include",
  });

  console.log("STATUS:", res.status); // 🔥 add this

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

// export const changePassword = async (userData: FieldValues) => {
//   console.log({ userData });
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API}/auth/change-password`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: (await cookies()).get("accessToken")?.value as string,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       },
//     );
//     const data = await res.json();
//     return data;
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// export const forgetPassword = async (userData: FieldValues) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API}/auth/forget-password`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       },
//     );
//     const data = await res.json();
//     return data;
//   } catch (error: any) {
//     return Error(error);
//   }
// };
// export const resetPassword = async (userData: FieldValues) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API}/auth/reset-password`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       },
//     );
//     const data = await res.json();
//     return data;
//   } catch (error: any) {
//     return Error(error);
//   }
// };
