import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./components/store/session";
import AuthPage from "./components/AuthPage";
import SignUp from "./components/SignUp";
import Splash from "./components/Splash";
import NotFound from "./components/NotFound";
import Homepage from "./components/Homepage/Homepage"
import Albums from "./components/Albums/Albums"
import Photos from "./components/Photos/Photos"
import Bio from "./components/Bio"
import CreateAlbumForm from "./components/CreateAlbumForm"
import CreatePhotoForm from "./components/CreatePhotoForm"
import AlbumPage from "./components/Albums/Album-page"
import PhotoPage from "./components/Photos/Photo-page"
import "./App.css";


function App() {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const user = useSelector((state) => state.session.user);

  const [loaded, setLoaded] = useState(false);

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
      <Route path="/" exact="true" element={<Splash />}></Route>
      <Route path="/login" element={<AuthPage />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/NotFound" element={<NotFound />}></Route>
      <Route path="/home" element={<Homepage />}></Route>
      <Route
        path="/users/:userId/albums"
        exact="true"
        element={<Albums />}
      ></Route>
      <Route
        path="/users/:userId/photos"
        exact="true"
        element={<Photos />}
      ></Route>
      <Route path="/bio" exact element={<Bio />}></Route>
      <Route path="/albums/new" element={<CreateAlbumForm />}></Route>
      <Route
        path="/albums/:albumId/photos/new"
        element={<CreatePhotoForm />}
      ></Route>
      <Route path="/albums/:albumId" element={<AlbumPage />}></Route>
      <Route path="/photos/:photoId" element={<PhotoPage />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
