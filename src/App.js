import CreateAroom from "./pages/CreateAroom";
import HomePage from "./pages/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room" element={<CreateAroom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
