import './App.css';
import { useState } from 'react';

function App() {
    // const [username, setUsername ] = useState('');

    const [values, setValues] = useState({
        username: '',
        password: '',
        bio: '',
        gender: 'f',
        userType: 'individual',
        tac: false
    });

    const submitHandler = (e) => {
        e.preventDefault();
        // const formData =Object.fromEntries(new FormData(e.target));
        // console.log(formData);

        console.log(values);
    }

    // const usernameChangeHandler = (e) => {
    //     setUsername(e.target.value);
    // }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value 
        }));
    }

    const checkboxChangeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: !state[e.target.name]
        }));
    }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="username">Username</label>
                <input 
                    type="text"  
                    id='username' 
                    name='username' 
                    onChange={changeHandler}
                    value={values.username}   
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="text"  
                    id='password' 
                    name='password' 
                    onChange={changeHandler}
                    value={values.password}
                />
            </div>
            <div>
                <label htmlFor="bio">Bio:</label>
                <textarea 
                    name="bio" 
                    id="bio" 
                    cols="30" 
                    rows="10"
                    onChange={changeHandler}
                    value={values.bio}
                />
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <select name="gender" id="gender" value={values.gender} onChange={changeHandler}>
                    <option  value="m">Male</option>
                    <option value="f">Female</option>
                </select>
            </div>

            <div>
                <label htmlFor="individual">Individual:</label>
                <input type="radio" id='individual' name='userType' value='individual' onChange={changeHandler} checked={values.userType == 'individual'}/>
                <label htmlFor="corporate">Corporate:</label>
                <input type="radio" id='corporate' name='userType' value='corporate' onChange={changeHandler} checked={values.userType == 'corporate'}/>
            </div>
            <div>
                <label htmlFor="tac">Terms and Conditions:</label>
                <input type="checkbox" id='tac' name='tac' onChange={checkboxChangeHandler} checked={values.tac}/>
            </div>
            <button>Register</button>
        </form>
      </header>
    </div>
  );
}

export default App;
