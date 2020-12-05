import React, { useEffect } from "react";
import { useRouter } from "next/router";

import createPersistedState from "use-persisted-state";

const useUserState = createPersistedState("user");

const Logout = (props) => {
  const router = useRouter();

  const [user, setUser] = useUserState(null);

  useEffect(function() {
    window.localStorage.removeItem("access-token");
    window.localStorage.removeItem("refresh-token");

    setUser(null);

    router.push("/");
  });

  return null;
}
 
export default Logout;