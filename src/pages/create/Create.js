import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { timestamp } from '../../firebase/config';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import Select from 'react-select';
import './create.scss';

const projectCategories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'finance', label: 'Finance' }
];

const Create = () => {
  const { documents } = useCollection('users');
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore('projects');
  const navigate = useNavigate();

  const defaultFormValues = {
    name: '',
    details: '',
    dueDate: '',
    category: '',
    assignedUsers: []
  };

  const [formValues, setFormValues] = useState(defaultFormValues);
  const [users, setUsers] = useState([]);
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => { return { value: user, label: user.displayName } })
      setUsers(options)
    }

  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (Object.keys(formValues.category).length < 1) {
      setFormError('Please select a project category');
      return;
    };

    if (formValues.assignedUsers.length < 1) {
      setFormError('Please assign project to atleast 1 user');
      return;
    };

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = formValues.assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.avatar,
        id: u.value.id,
      }
    });

    const projectData = {
      name: formValues.name,
      details: formValues.details,
      dueDate: timestamp.fromDate(new Date(formValues.dueDate)),
      category: formValues.category.value,
      createdBy,
      assignedUsersList,
      comments: []
    }
    await addDocument(projectData)
    if (!response.error) {
      navigate('/')
    }

  };

  return (
    <div className='create'>
      <h2 className='page-title'>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name</span>
          <input
            type='text'
            onChange={(e) => { setFormValues({ ...formValues, name: e.target.value }) }}
            value={formValues.name}
            required
          />
        </label>

        <label>
          <span>Project Details</span>
          <textarea
            type='text'
            onChange={(e) => { setFormValues({ ...formValues, details: e.target.value }) }}
            value={formValues.details}
            required
          >

          </textarea>
        </label>

        <label>
          <span>Set Due Date</span>
          <input
            type='date'
            onChange={(e) => { setFormValues({ ...formValues, dueDate: e.target.value }) }}
            value={formValues.dueDate}
            required
          />
        </label>

        <label>
          <span>Project Category</span>
          <Select
            onChange={(option) => setFormValues({ ...formValues, category: option })}
            options={projectCategories}
          />
        </label>

        <label>
          <span>Assign to User</span>
          <Select
            onChange={(user) => setFormValues({ ...formValues, assignedUsers: user })}
            options={users}
            isMulti
          />
        </label>


        <button className='btn'>Add Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default Create