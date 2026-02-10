import Login from "./components/auth/login";
import Register from "./components/auth/register";
import RecipeDetails from "./components/home/details"
import Header from "./components/header";
import Home from "./components/home";
import FavoritesPage from "./components/home/favorites";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/details/:id",
      element: <RecipeDetails />,
    },
    {
      path: "/favorites",
      element: <FavoritesPage />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;