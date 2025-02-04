import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { forgetPassword } from "../slices/userSlice";

const ForgotPassword = () => {
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    loading,
    data: {
      user: { _id },
    },
    error,
  } = useSelector((state) => state.user);

  const validate = () =>{
    let error = ''
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!pattern.test(email)){
        error = 'enter a valid email'
    }

    setEmailError(error)
    return error === ''
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate())
        dispatch(forgetPassword({email}))
  };

  useEffect(() => {
    if (_id) {
      state ? navigate(state.previousURL) : navigate("/profile");
    }
  }, [_id]);

  useEffect(()=>{
    document.title = 'Forget Password'
  },[])

  return (
    <section id="auth-container">
      <div className="container">
        <div className="form-container">
          <h1 className="heading-2">Forget Password</h1>
          <p className="body-text-1">
            We'll send you a password reset link.
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>email</span>
              {
                emailError && <p className="form-error-msg">{emailError}</p>
              }
            </label>
            <input type="submit" value="Send" className="button-1" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
