import { useState, useEffect } from 'react'
import './styles/App.css'
import Card from './components/Card';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const api_key = import.meta.env.CAT_API_ACCESS_KEY;
  const url = ` https://api.thecatapi.com/v1/images/search?limit=10?api_key=${api_key}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        console.log("response status: ", response.status);
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>Cat Memory Game</h1>
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>

      <div className='card-container'>
        {data.map((cat) => (
          <Card title={cat.breeds.name} imageUrl={cat.url}/>
        ))}
      </div>
    </>
  )
}

export default App
