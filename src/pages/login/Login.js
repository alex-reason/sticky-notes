import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import './login.scss';

const defaultFormInputs = {
  email: '',
  password: ''
}

const Login = () => {
  const [loginInfo, setLoginInfo] = useState(defaultFormInputs);
  const { error, login, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginInfo(defaultFormInputs);
    login(loginInfo.email, loginInfo.password);
  };

  return (
    <form onSubmit={handleSubmit} className='login'>
    <h2>Login</h2>

    <div className='login__container'>
      <label>
        <span>email</span>
        <input type='email' value={loginInfo.email} required onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })} />
      </label>

      <label>
        <span>password</span>
        <input type='password' value={loginInfo.password} required onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })} />
      </label>

      {!isPending && <button className='btn'>Login</button>}
      {error && <p className='error'>{error}</p>}
    </div>
  </form>
  )
}

export default Login