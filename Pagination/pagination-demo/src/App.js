import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "./components/404";
import { About } from "./components/About";
import { Contacts } from "./components/Contacts";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { PremiumPricing } from "./components/PremiumPricing";
import { Pricing } from "./components/Pricing";
import { Planet } from "./components/Planet";
import { PlanetList } from "./components/PlanetList";

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
        <Route path="/planets" element={<PlanetList/>}/>
        <Route path="/planets/:planetId/*" element={<Planet/>}>
            <Route path="films/:filmId" element={<h3>da</h3>}/>
        </Route>    
        <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
