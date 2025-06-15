import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const MovieList = () => {
  const handleBook = () => {
    console.log('Booking ticket...');
  };

  const navigate = useNavigate();

  const movies = [
    {
      id: 'tt1375666', 
      title: 'Inception',
      poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      rating: 8.8,
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
      price: 12,
    },
    {
      id: 'tt0468569',
      title: 'The Dark Knight',
      poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
      rating: 9.9,
      description: 'When the menace known as The Joker emerges from his mysterious past...',
      price: 15,
    },
    {
      id: 'tt0816692',
      title: 'Interstellar',
      poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg",
      rating: 6.9,
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival...',
      price: 18,
    },
    {
      id: 'tt3659388',
      title: 'The Martian',
      poster: "https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg",
      rating: 7.5,
      description: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive and can survive until a potential rescue.',
      price: 10,
    },
    {
      id: 'tt0481499',
      title: 'The Croods',
      rating: 4.9,
      poster: "https://m.media-amazon.com/images/M/MV5BMTcyOTc2OTA1Ml5BMl5BanBnXkFtZTcwOTI1MjkzOQ@@._V1_SX300.jpg",
      description: 'In the primeval era, Grug and his family risk the dangers of their surroundings to find a new dwelling place. Along the way, they meet a modern boy who woos them with his adventurous ways.',
      price: 15,
    },
    {
      id: 'tt25433734',
      title: 'Hi Nanna',
      rating: 7.6,
      poster: "https://m.media-amazon.com/images/M/MV5BZmU4MzExZGQtYzUzZC00NGE2LTg5NTgtZWI3MWM4YzgyNWUxXkEyXkFqcGc@._V1_SX300.jpg",
      description: 'A single father begins to narrate the story of the missing mother to his child and nothing remains the same',
      price: 18,
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            poster={movie.poster}
            rating={movie.rating}
            description={movie.description}
            price={movie.price}
            onBook={handleBook}
            onClick={() => navigate(`/detail/${movie.id}`)} 
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
