import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { routes } from './types/array_routes';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
