import { useCollection } from '../../hooks/useCollection';
import './dashboard.scss';

const ProjectFilter = ({ currentFilter, handleChooseFilter }) => {
    const { error, documents } = useCollection('users');

    const handleClick = (newFilter) => {
        handleChooseFilter(newFilter)
    }

    return (
        <div className='project-filter'>
            <nav>
                Filter by:
                {error && <p className='error'>{error}</p>}
                {documents && [...documents.map(item => { return item.displayName }), 'all', 'mine'].map((f) => (
                    <button key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >
                        {f}
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default ProjectFilter