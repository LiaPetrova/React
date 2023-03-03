import './App.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import { RandomActivity } from './components/RandomActivity';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <ErrorBoundary>
                    <RandomActivity />
                </ErrorBoundary>
            </header>
        </div>
    );
}

export default App;
