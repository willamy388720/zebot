import { Route, Routes } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { DefaultLayout } from "./DefaultLayout";
import { SignIn } from "@pages/SignIn";
import { SignUp } from "@pages/SignUp";
import { Home } from "@pages/Home";
import { Profile } from "@pages/Profile";
import { Blacklist } from "@pages/Blacklist";
import { Messages } from "@pages/Messages";
import { PositiveDecision } from "@pages/PositiveDecision";
import { NegativeDecision } from "@pages/NegativeDecision";

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DefaultLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="perfil" element={<Profile />} />
        <Route path="lista-negra" element={<Blacklist />} />
        <Route path="mensagens" element={<Messages />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/positiveDecision/:info" element={<PositiveDecision />} />
      <Route
        path="/negativeDecision/:maliciousPhoneNumber"
        element={<NegativeDecision />}
      />
    </Routes>
  );
}
