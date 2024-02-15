import { Link } from "react-router-dom";

export default function NotFound() {
    return (
      <div className="segment placeholder">
        <div className="header icon">
          <span className="icon">🔍</span> 
          <h2>Cannot Find</h2>
        </div>
        <div className="segment inline">
          <Link to="/activities" className="button">
            Return
          </Link>
        </div>
      </div>
    );
  }