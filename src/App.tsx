import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import SpecialRecipes from "./pages/SpecialRecipes";
import InMyFridge from "./pages/InMyFridge";
import SearchPage from "./pages/SearchPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

function AppContent() {
    const location = useLocation();

    const showBottomPart = location.pathname === "/";

    return (
        <div className="App flex flex-col min-h-screen">
            <Header showBottomPart={showBottomPart} />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipe/:id" element={<Recipe />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/special/:slug" element={<SpecialRecipes />} />
                    <Route path="/dans-mon-frigo" element={<InMyFridge />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;