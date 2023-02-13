import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "./components/404";
import { About } from "./components/About";
import { Contacts } from "./components/Contacts";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { PremiumPricing } from "./components/PremiumPricing";
import { Pricing } from "./components/Pricing";
import { Planet } from "./components/Planet";

function App() {
  return (
    <div className="App">
      <Navigation/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="/pricing/*" element={<Pricing/>}/>
        <Route path="/pricing/premium" element={<PremiumPricing/>}/>
        <Route path="/planets/:planetId" element={<Planet/>}/>
        <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
