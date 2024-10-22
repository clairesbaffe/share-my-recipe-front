import { Link } from "react-router-dom";

const Form = () => {
  return (
    <div>
      <p>Sign up form</p>
      <p>
        Vous avez déjà un compte ?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default Form;
