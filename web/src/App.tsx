import { AppLayout } from "@/components/layout/AppLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Editor } from "@/pages/Editor";
import { Marketplace } from "@/pages/Marketplace";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
