import { ChevronRightIcon } from '@heroicons/react/24/solid'

const MusicHeader = () => {
    return <nav className={`w-100 bg-secondary m-auto flex`}>
        <ChevronRightIcon className={`dark:text-main w-5 h-5 my-auto`}/>
        <h1 className={`dark:text-main text-xl`}>Music</h1>
    </nav>;
}

export default MusicHeader;