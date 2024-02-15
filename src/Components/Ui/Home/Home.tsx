import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function HomePage() {
    return (
        <div className="mhead segment">
            <div className="text container">
                <div className="logo-section">
                    <h2 className="inverted header">
                        {/* <img className="massive image" src="/assets/logo.png" alt="logo" style={{ marginBottom: '12px' }} /> */}
                        <Logo/>
                    </h2>
                </div>
                <div className="buttons-section">
                    <Link to="/login" className="Home button">Login</Link>
                    <Link to="/register" className="Home button">Register</Link>
                </div>
            </div>
        </div>
    );
}