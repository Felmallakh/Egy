import "./App.css";
import AuthPage from "./components/AuthPage";
import SignUp from "./components/SignUp";
import Splash from "./components/Splash";
// import Workspace from "./components/Workspace";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./components/store/session";
import NotFound from "./components/NotFound";

function App() {
  // organization page:
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  return (
    <Routes>
      {/* <Route path="/organization" element={<Workspace />}>
        {" "}
      </Route> */}
      <Route path="/" element={<Splash />}></Route>
      <Route path="/login" element={<AuthPage />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      {/* <Route
        path="/users/:id/organizations"
        element={<WorkspaceCreate />}
      ></Route> */}
      <Route path="/NotFound" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
