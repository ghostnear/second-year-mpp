import { useParams } from 'react-router-dom';

const MangaPage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Manga {id}</h1>
        </div>
    );
}

export default MangaPage;