import noCover from '../../../static/images/no-cover.png';
import { Link } from 'react-router-dom';

const GameItem = (params) => {
    return <div className={`block bg-secondary p-4 rounded shadow-lg text-center`}>
        <Link to={`/game/${params.game.id}/`}>
            <img src={noCover} className={'rounded-md mb-5 shadow-lg'}></img>
            <label className={'text-xl'}> { params.game.title } </label>
        </Link>
    </div>
}

export default GameItem;