import "./App.css";
import AuthPage from "./components/AuthPage";
import SignUp from "./components/SignUp";
import Splash from "./components/Splash";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./components/store/session";
import NotFound from "./components/NotFound";
import Homepage from "./components/Homepage/Homepage"
import Albums from "./components/Albums/Albums"
import Photos from "./components/Photos/Photos"
import CreateAlbumForm from "./components/CreateAlbumForm"

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
      <Route path="/" exact element={<Splash />}></Route>
      <Route path="/login" element={<AuthPage />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/NotFound" element={<NotFound />}></Route>
      <Route path="/home" element={<Homepage />}></Route>
      <Route path="/users/:userId/albums" element={<Albums />}></Route>
      <Route path="/users/:userId/photos" element={<Photos />}></Route>
      <Route path="albums/new" element={<CreateAlbumForm />}></Route>
    </Routes>
  );
}

export default App;
