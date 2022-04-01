import { IUserToken, IUserDetails } from "@t/index";

export const getUserToken = async (userId: string): Promise<IUserToken> => {
  const data = await fetch("/.netlify/functions/getUserInfo", {
    method: "POST",
    body: JSON.stringify({
      userId,
    }),
  });
  const userToken = await data.json();

  return userToken;
};

export const getUserProfile = async ({
  userId,
  token,
}: IUserToken): Promise<IUserDetails> => {
  const data = await fetch(
    `https://api.fitbit.com/1/user/${userId}/profile.json`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const userProfile = await data.json();

  return userProfile;
};
