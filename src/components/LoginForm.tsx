import { Link } from "react-router-dom";

const Form = () => {
  return (
    <div>
      <p>Login form</p>
      <p>
        Pas de compte ?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          S'inscrire
        </Link>
      </p>
    </div>
  );
};

export default Form;
