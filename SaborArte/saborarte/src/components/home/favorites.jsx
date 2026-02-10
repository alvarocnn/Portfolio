import React, { useEffect, useState} from 'react';
import { fetchFavorites } from '../../api/models/favs';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const getFavorites = async () => {
            try {
                const favoritesData = await fetchFavorites();
                setFavorites(favoritesData);
            } catch (err) {
                setError('Error fetching favorites');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getFavorites();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="favorites-container">
            <h1>Your Favorite Recipes</h1>
            {favorites.length === 0 ? (
                <p>You have no favorite recipes yet!</p>
            ) : (
                <ul>
                    {favorites.map((recipe) => (
                        <li key={recipe.id}>
                            <img src={recipe.thumbnail_url} alt={recipe.name} width="100" />
                            <h3>{recipe.name}</h3>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoritesPage;
