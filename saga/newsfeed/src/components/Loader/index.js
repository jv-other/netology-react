import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { request, SUCCESS, PENDING } from "../../store/requestSlice";

/**
 * Компонент загрузки новостей в ленту
 * 
 * @component
 * 
 */
const Loader = () => {
  const { status, data } = useSelector(state => state.request);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(request(`news?lastSeenId=${data[data.length - 1].id}`));
  };

  return !((SUCCESS === status) && (5 > data.length)) && (
    <div className="text-center">
      <button
        className="btn btn-light btn-more text-muted"
        onClick={handleClick}
        disabled={PENDING === status}
      >
        {(SUCCESS === status) ? "к предыдущим записям" : [...Array(3)].map((_, i) => (
          <span key={i} className="spinner-grow spinner-grow-sm mx-1" />
        ))}
      </button>
    </div>
  );
};

export default Loader;