import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { DashboardIcon, AddIcon } from '../assets';
import Avatar from "./Avatar";
import './sidebar.scss';

const Sidebar = () => {
    const { user } = useAuthContext();
    const { updateDocument } = useFirestore('users');

    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [fileError, setFileError] = useState(null);
    const [uploadedAvatar, setUploadedAvatar] = useState(null);

    const handleFileChange = (e) => {
        setUploadedAvatar(null)
        let selected = e.target.files[0];

        if (!selected) {
            setFileError('please select an file');
            return;
        }
        if (!selected.type.includes('image')) {
            setFileError('selected file must be an image');
            return;
        }
        if (selected.size > 100000) {
            setFileError('file size too big; please select an image lest than 100kb');
            return;
        }

        setFileError(null);
        setUploadedAvatar(selected);
    }

    const handleConfirmAvatar = async () => {
        const storage = getStorage();
        const storageRef = ref(storage, `thumbnails/${user.uid}/${uploadedAvatar.name}`);

        await uploadBytes(storageRef, uploadedAvatar);

        await getDownloadURL(storageRef)
            .then((url) => {
                console.log(url)
                updateDocument(user.uid, { avatar: url })
                updateProfile(user, { photoURL: url })
                // setCurrentAvatar(url)
            })
            .catch((error) => {
                console.log(error)
            });
        setUploadingAvatar(false)
    }


    return (
        <div className='sidebar'>
            <div className='sidebar__content'>
                {user &&
                    <div className='sidebar__user'>
                        <div className='sidebar__avatar'>
                            <Avatar src={user.photoURL} />
                            {!uploadingAvatar && <button className='btn btn-alt' onClick={() => setUploadingAvatar(true)} >change avatar</button>}
                            {uploadingAvatar &&
                                <label>
                                    <input type='file' required onChange={handleFileChange} />
                                    {fileError && <p className='error'>{fileError}</p>}

                                    <div className='sidebar__avatar-btns'>
                                        <button className='btn btn-alt btn-alt-reverse' onClick={handleConfirmAvatar}>confirm</button>
                                        <button className='btn btn-alt' onClick={() => setUploadingAvatar(false)}>cancel</button>
                                    </div>
                                </label>
                            }
                        </div>
                        <p>Hi, {user.displayName}</p>
                    </div>
                }

                <nav className='sidebar__links'>
                    <NavLink to='/'>
                        <img src={DashboardIcon} alt='dashboard' title='dashboard' />
                        Dashboard
                    </NavLink>
                    <NavLink to='/create'>
                        <img src={AddIcon} alt='add project' title='add project' />
                        Add a project
                    </NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar