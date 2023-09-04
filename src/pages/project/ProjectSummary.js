import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import './project.scss';

const ProjectSummary = ({ project }) => {
    const { deleteDocument } = useFirestore('projects');
    const { user } = useAuthContext();
    const navigate = useNavigate()

    const assignedUsersIds = project.assignedUsersList.map((item) => {return item.id})

    // check if current user is either author or assigned to project; if not, cannot edit project note
    const currentUserIsAssigned = assignedUsersIds.includes(user.uid)
    const currentUserIsAuthor = user.uid === project.createdBy.id

    const handleDelete = (e) => {
        if (currentUserIsAssigned || currentUserIsAuthor){
            deleteDocument(project.id)
            navigate('/')
        }
    }

    return (
        <div>
            <div className='project-summary'>
                <h2 className='page-title'>{project.name}</h2>
                <p className='project-summary__author'>Project by: {project.createdBy.displayName}</p>
                <p className='project-summary__due-date'>Project due by: {project.dueDate.toDate().toDateString()}</p>
                <p className='project-summary__details'>{project.details}</p>
                <h4>Project is assigned to:</h4>
                <div className='project-summary__assigned-list'>
                    {project.assignedUsersList.map((user) => (
                        <div className='project-summary__assigned' key={user.id}>
                            <Avatar src={user.photoURL} />
                            <p>{user.displayName}</p>
                        </div>
                    ))}
                </div>
                {(currentUserIsAssigned || currentUserIsAuthor) && <button className='btn' onClick={handleDelete}>Completed or Delete</button>}
            </div>
        </div>
    )
}

export default ProjectSummary