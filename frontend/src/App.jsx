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

function App() {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
  //console.log(data);

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}
export default App;
