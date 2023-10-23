import CreateAroom from "./pages/CreateAroom";
import HomePage from "./pages/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PracticeRoom from "./pages/PracticeRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room" element={<CreateAroom />} />
        <Route path="/practice" element={<PracticeRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
