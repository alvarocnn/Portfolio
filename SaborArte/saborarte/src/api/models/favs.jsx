import { db } from '../index'; // Asegúrate de tener configurado Firebase en este archivo.
import { collection, addDoc, getDocs, query, where,deleteDoc} from 'firebase/firestore';

export const addFavorite = async (recipe) => {
    try {
        const favoritesRef = collection(db, 'favorites');
        await addDoc(favoritesRef, recipe);
    } catch (err) {
        console.error('Error adding favorite:', err);
    }
};

export const removeFavorite = async (recipeId) => {
    try {
        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef, where("id", "==", recipeId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    } catch (err) {
        console.error('Error removing favorite:', err);
    }
};

export const fetchFavorites = async () => {
    try {
        const favoritesRef = collection(db, 'favorites');
        const querySnapshot = await getDocs(favoritesRef);
        const favorites = [];
        querySnapshot.forEach((doc) => {
            favorites.push(doc.data());
        });
        return favorites;
    } catch (err) {
        console.error('Error fetching favorites:', err);
        return [];
    }
};
