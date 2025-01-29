import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CommonFooter } from "./components/CommonFooter";
import InputPage from "./pages/InputPage/InputPage";
import { ResultPage } from "./pages/resultPage/ResultPage";
import AgeInputPage from "./pages/agePage/agePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AgeInputPage />} />
        <Route path="/inputPage" element={<InputPage />} />
        <Route path="/resultPage" element={<ResultPage />} />
      </Routes>
      <CommonFooter />
    </BrowserRouter>
  );
}

export default App;
