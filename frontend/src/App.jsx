import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import TransactionPage from "./pages/TransactionPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Routes, Route } from "react-router-dom";
import Header from "./components/ui/Header.jsx";
import { GET_AUTHENTICATED_USER } from "./graphql/query/user.query.js";
import { useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
function App() {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
  //console.log(data);

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            data?.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}
export default App;
