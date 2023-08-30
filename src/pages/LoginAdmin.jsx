import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from '../assets/img/logo.png'

const LoginAdmin = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { loginAdmin } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin(inputs)
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
       <div class="form-bg">
    <div class="container-login">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="form-container">
                    <div className="logo-login">
                      <img src={Logo} alt="LOGO BRANDED STRONG"></img>
                    </div>
                    <h3 class="title">¡Hello Admin!</h3>
                    <form class="form-horizontal">
                        <div class="form-group">                            
                            <input 
                              required
                              type="text"
                              placeholder="USERNAME"
                              name="username"
                              onChange={handleChange}        
                              class="form-control"
                              />
                         </div>
                        <div class="form-group">                           
                            <input class="form-control" 
                              required
                              type="password"
                              placeholder="PASSWORD"
                              name="password"
                              onChange={handleChange}
                            />
                        </div>
                        <button className="btn" onClick={handleSubmit}><span>Login to your account</span></button>
                        {err && <p className="flex justify-center text-white mt-2 ">{err}</p>}
                          
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
      
    
    </div>
  );
};

export default LoginAdmin;
