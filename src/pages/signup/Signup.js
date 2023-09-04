import { useState } from "react";
import { useSignUp } from "../../hooks/useSignup";
import './signup.scss';

const defaultFormInputs = {
  email: '',
  password: '',
  displayName: '',
}

const Signup = () => {
  const [signUpInfo, setSignUpInfo] = useState(defaultFormInputs);
  const { error, signup, isPending } = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignUpInfo(defaultFormInputs);
    signup(signUpInfo.email, signUpInfo.password, signUpInfo.displayName);
  };


  return (
    <form onSubmit={handleSubmit} className='signup'>
      <h2>Sign up</h2>

      <div className='signup__container'>
        <label>
          <span>email</span>
          <input type='email' value={signUpInfo.email} required onChange={(e) => setSignUpInfo({ ...signUpInfo, email: e.target.value })} />
        </label>

        <label>
          <span>password</span>
          <input type='password' value={signUpInfo.password} required onChange={(e) => setSignUpInfo({ ...signUpInfo, password: e.target.value })} />
        </label>

        <label>
          <span>display name</span>
          <input type='text' value={signUpInfo.displayName} required onChange={(e) => setSignUpInfo({ ...signUpInfo, displayName: e.target.value })} />
        </label>

        {!isPending && <button className='btn'>Sign up</button>}
        {error && <p className='error'>{error}</p>}
      </div>
    </form>
  )
}

export default Signup