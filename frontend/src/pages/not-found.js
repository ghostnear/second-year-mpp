const NotFoundPage = () => {
    return (
        <main className={`min-h-screen bg-main flex`}>
            <div className={`m-auto grid justify-items-center`}>
                <h1 className={`text-9xl mb-4 dark:text-main`}>404</h1>
                <h2 className={`text-3xl dark:text-main`}>This page does not exist.</h2>
            </div>
        </main>
    );
}

export default NotFoundPage;