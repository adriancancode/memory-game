import "../styles/Card.css";

export default function Card({ title, description, imageUrl }) {
    return (
        <div className="card">
            {imageUrl && <img src={imageUrl} alt={title || "Cat image"} />}
            {title && <h2>{title}</h2>}
                
        </div>
    );
}