import './App.css';
import { useState, useEffect } from 'react';

import { Footer } from "./components/common/Footer";
import { Header } from "./components/common/Header";
import { Search } from "./components/common/search/Search";
import { UserSection } from './components/user-section/UserSection';

const baseURL = 'http://localhost:3005/api';

function App() {

    const [users, setUsers ] = useState([]);

    useEffect(() => {
        fetch(`${baseURL}/users`)
        .then(res => res.json())
        .then(result => setUsers(result.users));
    }, []); 
    console.log(users);
    return (
    <div >
      <Header/>
      <main className="main">

        <section className="card users-container">
            <Search />

            <UserSection users={users} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
