import { getSession } from "next-auth/react";

export const requireAuthentification = async (
  context: any,
  callback: any,
  role: string | string[] = ""
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (
    role !== "" &&
    session.user.role !== role &&
    !role.includes(session.user.role)
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return callback();
};
