import { Cog8ToothIcon } from '@heroicons/react/24/solid'
import noCover from '../../../static/images/no-cover.png';

const GameItem = (params) => {
    return <div className={`block bg-secondary p-4 rounded shadow-lg text-center`}>
        <img src={noCover} className={'rounded-md mb-5 shadow-md'}></img>
        <label className={'text-xl'}> {params.title} </label>
    </div>
}

export default GameItem;