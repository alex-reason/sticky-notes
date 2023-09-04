import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from '../../hooks/useFirestore';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import uuid4 from "uuid4";

import './project.scss';
import Avatar from "../../components/Avatar";

const ProjectComments = ({ project }) => {
    const { user } = useAuthContext();
    const { updateDocument, response } = useFirestore('projects');

    const [newComment, setNewComment] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        let commentId = uuid4()
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: commentId
        }
        console.log(commentToAdd)
        await updateDocument(project.id, { comments: [...project.comments, commentToAdd] })
        if (!response.error) {
            setNewComment('')
        }
    }
    return (
        <div className='project-comments'>
            <h4>Project comments</h4>
            <ul>
                {project.comments.length > 0 && project.comments.map((comment) => (
                    <li key={comment.id} className='project-comments__comment'>
                        <div className='project-comments__comment-author'>
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                            <p className='project-comments__comment-date' > {formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
                        </div>

                        <div className='project-comments__comment-content'>
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <form className='project-comments__add' onSubmit={handleSubmit}>
                <label>
                    <span>Add new comment</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    >
                    </textarea>
                </label>
                <button className='btn'>Add comment</button>
            </form>
        </div>
    )
}

export default ProjectComments