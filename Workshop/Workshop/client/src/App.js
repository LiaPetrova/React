
import { Footer } from "./components/common/Footer";
import { Search } from "./components/common/search/Search";
import { UserList } from './components/user-list/UserList';
import { Header } from "./components/common/Header";
import './App.css';
import { UserProvider } from "./contexts/UserContext";


function App() {


    return (
        <div >
            <Header />
            <UserProvider>
                <main className="main">

                    <section className="card users-container">
                        <Search />

                        <UserList />
                    </section>
                </main>
            </UserProvider>
            <Footer />
        </div>
    );
}

export default App;
