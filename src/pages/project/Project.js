import { useParams } from "react-router-dom";
import { useDocuments } from "../../hooks/useDocument";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";
import './project.scss';

const Project = () => {
  const { id } = useParams();
  const { document, error } = useDocuments('projects', id);

  if (error) {
    return <div className='error'>{error}</div>
  }

  if (!document) {
    return <div className='loading'>loading...</div>
  }

  return (
    <div className='project-details'>
      <ProjectSummary project={document} />
      <ProjectComments project={document}/>
    </div>
  )
}

export default Project