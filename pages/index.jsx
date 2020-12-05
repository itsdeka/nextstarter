import React, { Component, useEffect, useState, Fragment } from "react";
import Head from "next/head";
import * as endpoints from "../controllers/endpoints";
import Link from "next/link";
import { useRouter, router } from "next/router";
import { withPageRouter } from "../components/generic/functions";
import createPersistedState from "use-persisted-state";

const useUserState = createPersistedState("user");

const Home = () => {
  const [user, setUser] = useUserState(null);
  return (
    <div className="d-flex flex-column flex-root">
      <div>
        Ciao
      </div>
    </div>
  );
};

export default withPageRouter(Home);
