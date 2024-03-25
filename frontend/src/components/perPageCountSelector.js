import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

const PerPageCountSelector = (params) => {
    return <div className={`${params.className} rounded-md shadow-md bg-secondary flex`}>
        <div className={`flex p-1 shadow-md mx-4`}>
            <h1 className={`text-xl my-auto mr-2`}>Per page:</h1>
            {params.perPage > params.multiple && 
                <ChevronLeftIcon className={`w-5 h-5 my-auto mr-2 dark:hover:fill-blue-400 cursor-pointer`} onClick={() => {
                    params.setOffset(0)
                    params.setPerPage(params.perPage - params.multiple)
                }}/>
            }
            {
                <h2 className={`text-xl`}>
                    {params.perPage}
                </h2>
            }
            {params.perPage < params.size && 
                <ChevronRightIcon className={`w-5 h-5 my-auto mx-2 dark:hover:fill-blue-400 cursor-pointer`} onClick={() => {
                    params.setOffset(0)
                    params.setPerPage(params.perPage + params.multiple)
                }}/>
            }
        </div>
    </div>;
}

export default PerPageCountSelector;