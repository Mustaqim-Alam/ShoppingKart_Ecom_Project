
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiError } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <BiError className="error-icon" />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="home-link">
        <FaHome /> Go Home
      </Link>
    </div>
  );
};

export default NotFound;
