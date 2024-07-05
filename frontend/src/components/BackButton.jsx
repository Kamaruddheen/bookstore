import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
function BackButton({ destination = "/" }) {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-100 text-white px-4 py-1 rounded-lg w-fit"
      >
        <BsArrowLeft className="text-2x1" />
      </Link>
    </div>
  );
}

export default BackButton;
