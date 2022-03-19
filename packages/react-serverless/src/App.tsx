import { Form } from "./components/form";
import { Login } from "./components/login";

const App: React.FC = () => {
  return (
    <>
      <header>
        <h2>Serverless TypeScript + React!</h2>
      </header>
      <main>
        <Form />
        <Login />
      </main>
    </>
  );
};

export default App;
