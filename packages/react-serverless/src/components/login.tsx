import { useState } from "react";

export function Login() {
  const [userAuth, setUserAuth] = useState();

  const getAuthInfo = async () => {
    const authInfoJson = await fetch("/.netlify/functions/auth");
    const authInfo = await authInfoJson.json();
    console.log(authInfo);

    setUserAuth(authInfo);
  };

  return (
    <div>
      <a href="/.netlify/functions/auth">
        <button>Login</button>
      </a>
      {/* <button onClick={getAuthInfo}>Login</button>
      {userAuth && <p>{userAuth["token"]}</p>} */}
    </div>
  );
}
