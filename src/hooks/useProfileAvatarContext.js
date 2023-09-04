import { ProfileAvatarContext } from "../context/ProfileContext";
import { useContext } from "react";

export const useProfileAvatarContext = () => {
    const context = useContext(ProfileAvatarContext);

    if (!context) {
        throw Error('useProfileAvatarContext hook must only be used inside an AuthContextProvider')
    }
    return context
};
