import { Link } from 'react-router-dom';

const GameItem = (params) => {
    return <div className={`block bg-secondary p-4 rounded shadow-lg text-center`}>
        <Link to={`/user/${params.user.id}/`}>
            <label className={'text-xl hover:cursor-pointer'}> { params.user.name } </label>
        </Link>
    </div>
}

export default GameItem;