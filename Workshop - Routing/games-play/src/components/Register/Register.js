// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { withAuth } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const Register = ({ auth }) => {
    // const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = new FormData(e.target);
        const email = userData.get('email');
        const password = userData.get('password');
        const confirmPassword = userData.get('confirm-password');

        if(password !== confirmPassword) {
            return;
        }

        authService.register({email, password, confirmPassword})
            .then(authData => {
                auth.userLogin(authData);
                navigate('/');
            });

    }

    return (
        <section id="register-page" className="content auth">
        <form id="register" onSubmit={onSubmit} >
          <div className="container">
            <div className="brand-logo" />
            <h1>Register</h1>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="maria@email.com"
            />
            <label htmlFor="pass">Password:</label>
            <input type="password" name="password" id="register-password" />
            <label htmlFor="con-pass">Confirm Password:</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
            />
            <input
              className="btn submit"
              type="submit"
              defaultValue="Register"
            />
            <p className="field">
              <span>
                If you already have profile click <a href="#">here</a>
              </span>
            </p>
          </div>
        </form>
      </section>
    );
};

const RegisterWithAuth = withAuth(Register);

export default RegisterWithAuth;