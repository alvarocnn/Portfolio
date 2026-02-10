import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../api"; // Asegúrate de que el servicio de auth está correctamente importado
import { onAuthStateChanged,signOut} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [isGoogleUser, setIsGoogleUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser(user);
            // Determinar si el usuario es de Google o correo electrónico
            const isEmail = user.providerData.some(
                (provider) => provider.providerId === "password"
            );
            setIsEmailUser(isEmail);
            setIsGoogleUser(user.providerData.some(
                (provider) => provider.providerId === "google.com"
            ));

            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false); // Dejar de cargar una vez que la información del usuario esté disponible
    }

    const logout = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);  // Actualiza el estado después de cerrar sesión
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const value = {
        userLoggedIn,
        isEmailUser,
        isGoogleUser,
        currentUser,
        setCurrentUser,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Solo renderizar hijos cuando no estamos en "cargando" */}
        </AuthContext.Provider>
    );
}
