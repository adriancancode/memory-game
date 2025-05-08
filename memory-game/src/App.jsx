import { useState, useEffect } from 'react'
import './styles/App.css'
import './components/Card'

function App() {
  const [count, setCount] = useState(0)
  const [loading, isLoading] = useState(true);
  const [data, setData] = useState([]);
  const api_key = import.meta.env.CAT_API_ACCESS_KEY;
  const url = ` https://api.thecatapi.com/v1/images/search?limit=9?api_key=${api_key}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Vite + React</h1>
      <div className='card-container'>
        {data.map((cat) => (
          <Card title={cat.breeds.name} imageUrl={cat.url}/>
        ))}
      </div>
    </>
  )
}

export default App
