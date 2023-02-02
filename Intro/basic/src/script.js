const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

const reactElement = (
<header className="site-header">
    <h1>Hello from JSX!</h1>
    <h2>React slogan</h2>
</header>
);


root.render(reactElement);  