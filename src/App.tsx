import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <>
            <Toaster />
            <Header />
            <main className="container">
                <Outlet />
            </main>
        </>
    )
}

export default App
