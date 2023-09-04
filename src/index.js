import { createRoot } from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
import './index.scss';
import { ProfileAvatarContextProvider } from './context/ProfileContext';

const root = createRoot(document.querySelector('#root'));

root.render(
    <AuthContextProvider>
        <ProfileAvatarContextProvider>
            <App />
        </ProfileAvatarContextProvider>
    </AuthContextProvider>
)