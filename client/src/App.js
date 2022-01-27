import { Container } from "react-bootstrap";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Login from "./components/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import { Route, Routes } from "react-router-dom";
import { ContactsProvider } from "./context/ContactsProvider";
import { ConvoProvider } from "./context/ConvoProvider";
import { SocketProvider } from "./context/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id");
  return (
    <Layout>
      <Routes>
        <Route
          exact
          path='/'
          element={
            id ? (
              <SocketProvider id={id}>
                <ContactsProvider>
                  <ConvoProvider id={id}>
                    <Dashboard id={id} />
                  </ConvoProvider>
                </ContactsProvider>
              </SocketProvider>
            ) : (
              <Login onSubmit={setId} />
            )
          }
        ></Route>
      </Routes>
    </Layout>
  );
}

export default App;
