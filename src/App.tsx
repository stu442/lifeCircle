import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CommonFooter } from "./components/CommonFooter";
import InputPage from "./pages/InputPage/InputPage";
import { ResultPage } from "./pages/resultPage/ResultPage";
import AgeInputPage from "./pages/agePage/agePage";
import LifeCirclePage from "./pages/lifeCirclePage/lifeCirclePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/age" element={<AgeInputPage />} />
        <Route path="/lifeCircle" element={<LifeCirclePage />} />
      </Routes>
      <CommonFooter />
    </BrowserRouter>
  );
}

export default App;
