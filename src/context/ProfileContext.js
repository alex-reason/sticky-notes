import { createContext, useState } from 'react';

export const ProfileAvatarContext = createContext();

export const ProfileAvatarContextProvider = ({ children }) => {
    const [currentProfileAvatar, setCurrentProfileAvatar] = useState(null);

    return (
        <ProfileAvatarContext.Provider value={{ currentProfileAvatar, setCurrentProfileAvatar }}>
            {children}
        </ProfileAvatarContext.Provider>
    )
}