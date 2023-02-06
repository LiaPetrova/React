import { Hero } from "./components/Hero";
import { Welcome } from "./components/Welcome";
import { Service } from "./components/Service";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
    return (
        <div>
            <Hero />

            <Welcome />

            <Service />

            <Contact />

            <Footer />

            <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
            <script type="text/javascript" src="js/bootstrap.js"></script>
                
    </div>
  );
}

export default App;
