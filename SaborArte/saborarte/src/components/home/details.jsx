import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipeDetails } from '../../api'; // 
import { addFavorite, fetchFavorites } from '../../api/models/favs'; 

const RecipeDetails = () => {
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        const getRecipeDetails = async () => {
            try {
                const data = await fetchRecipeDetails(id); 
                setRecipe(data);

                
                const favorites = await fetchFavorites();
                setIsFavorite(favorites.some(fav => fav.recipeId === id));
            } catch (err) {
                setError('Error fetching recipe details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getRecipeDetails(); 
    }, [id]);

    const handleAddFavorite = async () => {
        if (!isFavorite) {
            await addFavorite({
                id,
                name: recipe.name,
                thumbnail_url: recipe.thumbnail_url,
            });
            setIsFavorite(true);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="recipe-details-container">
            <button onClick={() => navigate(-1)} className="back-button">
                &larr; Back
            </button>

            <h1 className="recipe-title">{recipe.name}</h1>

            <img
                src={recipe.thumbnail_url}
                alt={recipe.name}
                className="recipe-thumbnail"
            />

            <div
                className="recipe-description"
                dangerouslySetInnerHTML={{ __html: recipe.description }} 
            />

            <h3>Video Tutorial:</h3>
            {recipe.video_url && (
                <div className="recipe-video">
                    <video controls width="100%">
                        <source src={recipe.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            <h3>Program:</h3>
            {Array.isArray(recipe.show) && recipe.show.length > 0 ? (
                <ul>
                    {recipe.show.map((showItem, index) => (
                        <li key={index}>{showItem.name}</li> 
                    ))}
                </ul>
            ) : (
                <p>No program information available.</p>
            )}

            <div className="recipe-additional-info">
                <p><strong>Country:</strong> {recipe.country}</p>
                <p><strong>Language:</strong> {recipe.language}</p>
                <p><strong>Created At:</strong> {new Date(recipe.created_at * 1000).toLocaleDateString()}</p>
            </div>

            <button onClick={handleAddFavorite} className="favorite-button">
                {isFavorite ? '❤️ Added to Favorites' : '🤍 Add to Favorites'}
            </button>

            <style jsx>{`
                .recipe-details-container {
                    padding: 20px;
                    max-width: 1000px;
                    margin: 0 auto;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .back-button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-bottom: 20px;
                    transition: background-color 0.3s ease;
                }

                .back-button:hover {
                    background-color: #45a049;
                }

                .recipe-title {
                    font-size: 2.5rem;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: #333;
                }

                .recipe-thumbnail {
                    width: 100%;
                    max-width: 450px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    margin-bottom: 20px;
                }

                .recipe-description {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: #444;
                    margin-bottom: 20px;
                }

                .recipe-video {
                    margin-bottom: 20px;
                }

                .recipe-additional-info {
                    font-size: 1rem;
                    color: #555;
                }

                .recipe-additional-info p {
                    margin-bottom: 10px;
                }

                ul {
                    padding-left: 20px;
                }

                ul li {
                    font-size: 1rem;
                    color: #555;
                    margin-bottom: 5px;
                }

                .favorite-button {
                    padding: 10px 20px;
                    background-color: ${isFavorite ? '#e11d48' : '#3498db'};
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .favorite-button:hover {
                    background-color: ${isFavorite ? '#9b1c3f' : '#217dbb'};
                }
            `}</style>
        </div>
    );
};

export default RecipeDetails;
