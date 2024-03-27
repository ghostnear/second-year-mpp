import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

const PageSelector = (params) => {
    return <div className={`w-full bg-secondary my-4 flex`}>
        <div className={`mx-auto flex p-1 shadow-md`}>
            {params.offset > 0 && 
                <ChevronLeftIcon className={`w-7 h-7 my-auto dark:hover:fill-blue-400 cursor-pointer`} onClick={() => params.setOffset(params.offset - 1)}/>
            }
            {
                Array.from(Array(params.size).keys()).map((i) => {
                    return <div key={i} onClick={() => params.setOffset(i)}
                        className={`mx-1 text-lg p-1 rounded-sm ${i == params.offset ? 'dark:bg-third' : ''} dark:hover:bg-gray-700 cursor-pointer`}>
                        {i + 1}
                    </div>
                })
            }
            {params.offset < params.size - 1 && 
                <ChevronRightIcon className={`w-7 h-7 my-auto dark:hover:fill-blue-400 cursor-pointer`} onClick={() => params.setOffset(params.offset + 1)}/>
            }
        </div>
    </div>;
}

export default PageSelector;