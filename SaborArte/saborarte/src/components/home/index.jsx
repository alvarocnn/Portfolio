import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom'; 
import { fetchRecipes } from '../../api/index';

const Home = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [from, setFrom] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    // Redirigir si no hay usuario
    useEffect(() => {
        if (!currentUser) {
            navigate("/login", { replace: true });
        }
    }, [currentUser, navigate]);

    // Obtener recetas
    const loadRecipes = async () => {
        if (!hasMore) return;

        setIsLoading(true);
        try {
            const response = await fetchRecipes(from, 20);
            if (response?.results?.length > 0) {
                setRecipes((prevRecipes) => [...prevRecipes, ...response.results]);
                setFilteredRecipes((prevRecipes) => [...prevRecipes, ...response.results]);
                setFrom((prevFrom) => prevFrom + 20);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error('Error fetching recipes:', err);
            setError('There was an error fetching recipes.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = recipes.filter((recipe) =>
            recipe.name.toLowerCase().includes(term)
        );
        setFilteredRecipes(filtered);
    };

    const handleRecipeClick = (recipeId) => {
        navigate(`/details/${recipeId}`); 
    };

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="welcome-message">
                Hello {currentUser?.displayName || currentUser?.email}, you are now logged in.
            </div>
            <button onClick={logout} className="logout-btn">
                Log Out
            </button><br/>
            <button onClick={() => navigate('/favorites')} className="favorites-btn">
                Go to Favorites
            </button>
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search for a recipe..."
                    className="search-input"
                />
            </div>

            <div className="recipes-list">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe, index) => (
                        <div key={index} className="recipe-card" onClick={() => handleRecipeClick(recipe.id)}>
                            <h3>{recipe.name}</h3>
                            {recipe.thumbnail_url && (
                                <img
                                    src={recipe.thumbnail_url}
                                    alt={recipe.name}
                                    className="recipe-thumbnail"
                                />
                            )}
                            <p>{recipe.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No matching recipes found</p>
                )}
            </div>

            {hasMore && !searchTerm && (
                <button onClick={loadRecipes} className="load-more-btn" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Load More'}
                </button>
            )}

            <style jsx>{`
                .home-container {
                    font-size: 1.25rem;
                    font-weight: bold;
                    padding: 2rem;
                    text-align: center;
                    color: #4b4b4b;
                }

                .welcome-message {
                    margin-bottom: 1rem;
                }

                .logout-btn {
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    background-color: #e11d48;
                    color: white;
                    border-radius: 0.375rem;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    font-weight: 600;
                }

                .logout-btn:hover {
                    background-color: #9b1c3f;
                }

                .search-container {
                    margin: 2rem 0;
                }

                .search-input {
                    width: 100%;
                    max-width: 400px;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 0.375rem;
                    font-size: 1rem;
                }

                .recipes-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1rem;
                    margin-top: 2rem;
                    width: 100%;
                    justify-content: center;
                }

                .recipe-card {
                    background-color: #fff;
                    border: 1px solid #ddd;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    text-align: left;
                    max-width: 300px;
                    margin: 0 auto;
                    overflow: hidden; /* Para evitar que el contenido se desborde */
                    height: 350px; /* Fija la altura para evitar que las tarjetas se expandan */
                }

                .recipe-card img {
                    max-height: 200px;
                    object-fit: cover;
                    width: 100%;
                    border-radius: 0.5rem;
                }

                .recipe-card h3 {
                    font-size: 1.125rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    white-space: nowrap; /* Evita que el título se divida en varias líneas */
                    overflow: hidden;
                    text-overflow: ellipsis; /* Muestra los puntos suspensivos cuando el texto se desborda */
                }

                .recipe-card p {
                    font-size: 0.875rem;
                    color: #666;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3; /* Limita el número de líneas a 3 */
                    -webkit-box-orient: vertical;
                    margin-top: 1rem;
                }

                .load-more-btn {
                    margin-top: 2rem;
                    padding: 0.75rem 1.5rem;
                    background-color: #3498db;
                    color: white;
                    border-radius: 0.375rem;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                }

                .load-more-btn:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }

                .load-more-btn:hover:not(:disabled) {
                    background-color: #217dbb;
                }


                .error-container {
                    padding: 1rem;
                    background-color: #ffeded;
                    color: #d8000c;
                    border: 1px solid #d8000c;
                    border-radius: 0.5rem;
                }
                .favorites-btn {
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    background-color: #3498db;
                    color: white;
                    border-radius: 0.375rem;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    font-weight: 600;
                }

                .favorites-btn:hover {
                    background-color: #2980b9;
                }`
                }</style>
        </div>
    );
};
export default Home;

