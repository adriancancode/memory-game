import { useState, useEffect } from 'react'
import './styles/App.css'
import Card from './components/Card';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(null);
  const [clickedCats, setClickedCats] = useState([]);

  const api_key = import.meta.env.VITE_CAT_API_ACCESS_KEY;
  const url = ` https://api.thecatapi.com/v1/images/search?limit=14&has_breeds=1${api_key ? `&api_key=${api_key}` : ''}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        console.log("response status: ", response.status);
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCats(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return (
      <div className='app'>
        <h1>Cat Memory Game</h1>
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
        <p>Click on a cat to earn points, but don't click on the same cat twice!</p>
        <h2>Loading cats...</h2>
      </div>
      
    );
  }

  if (error) {
    return <div className='error'>Error: {error.message}</div>;
  }

  const shuffleCats = () => {
    const shuffledCats = [...cats].sort(() => Math.random() - 0.5);
    setCats(shuffledCats);
  }
  const handleCardClick = (catId) => {
    if (clickedCats.includes(catId)) {
      alert("You already clicked this cat!");
      setScore(0);
      setClickedCats([]);
    } else {
      setClickedCats([...clickedCats, catId]);
      setScore(score + 1);
      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }
    }
    shuffleCats();
  }

  return (
    <div className='app'>
      <h1>Cat Memory Game</h1>
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
      <p>Click on a cat to earn points, but don't click on the same cat twice!</p>

      <div className='card-container'>
        {cats.map((cat) => (
           <div key={cat.id} onClick={() => handleCardClick(cat.id)}>
           <Card 
             title={cat.breeds && cat.breeds.length > 0 ? cat.breeds[0].name : "Cat"} 
             imageUrl={cat.url}
           />
         </div>
          
        ))}
      </div>
    </div>
  )
}

export default App
