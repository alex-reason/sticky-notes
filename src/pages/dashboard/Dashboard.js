import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";

const Dashboard = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleChooseFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const filteredProjects = documents ? documents.filter((document) => {
    if (currentFilter === 'all') {
      return true;
    }
    if (currentFilter === 'mine') {
      return document.assignedUsersList.some((u) => u.id === user.uid)
    }
    else {
      return document.assignedUsersList.some((u) => u.displayName === currentFilter)
    }
  }) : null

  return (
    <div className='dashboard'>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} handleChooseFilter={handleChooseFilter} />}
      {filteredProjects && <ProjectList documents={filteredProjects} />}
    </div>
  )
}

export default Dashboard