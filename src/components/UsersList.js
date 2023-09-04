import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';
import './usersList.scss';

const UsersList = () => {
    const { error, documents } = useCollection('users');
    return (
        <div className='users-list'>
            <h2>All Users</h2>
            {error && <p className='error'>{error}</p>}

            <div className='users-list__container'>
            {documents && documents.map(user => (
                <div className='users-list__item' key={user.id}>
                    {user.online ? <div className='users-list__status users-list__status-online' /> :
                        <div className='users-list__status users-list__status-offline' />}
                    <span>{user.displayName}</span>

                    <Avatar src={user.avatar} title={user.displayName} />

                </div>
            ))}
            </div>
        </div>
    )
}

export default UsersList