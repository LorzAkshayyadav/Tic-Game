import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import Game from './Pages/Game';
import { v4 as uuidV4 } from 'uuid';
function App() {
    return (
        <div className="App">
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/Game/:roomId"
                        element={<Game />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
