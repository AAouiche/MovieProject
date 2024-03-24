import { useNavigate } from 'react-router-dom';
import '../../css/logo.css';



function Logo() {
  const navigate = useNavigate();
  const handleNavigateDash = () =>{navigate("/dashboard");}
  return (
    <div className="logo" onClick={handleNavigateDash}>
      <span role="img" aria-label="popcorn">🍿</span>
      <h1>Movie App</h1>
    </div>
  );
}

export default Logo;