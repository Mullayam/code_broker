import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import ProtectedPage from "./pages/ProtectedPage";

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/editor/:roomId/:username"
            element={<EditorPage />}
          ></Route>
          <Route path="protected-room" element={<ProtectedPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
