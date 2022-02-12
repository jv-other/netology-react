import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { reset, request, PENDING, SUCCESS, FAILURE } from "../store/requestSlice";

import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

/**
 * Список записей об услугах
 * 
 * @component
 *  
 */
const ServicesList = () => {
  // статус и данные
  const { status, data } = useSelector(state => state.request);

  const dispatch = useDispatch();
  const handleClick = () => dispatch(reset());

  // загрузка записей
  useEffect(() => {
    dispatch(request("services"));
  }, []);

  return (
    // Если загрузка
    ((PENDING === status) && <Spinner />) ||
    // Если ошибка
    ((FAILURE === status) && <ErrorMessage />) ||
    // Если данные получены
    ((SUCCESS === status) && (
      <ul className="nav flex-column">
        {data?.map(item => (
          <li key={item.id} className="list-group-item nav-item">
            <Link
              to={`/${item.id}/details`}
              className="nav-link"
              onClick={handleClick}
            >
              {item.name}:&nbsp;{item.price}&nbsp;руб.
            </Link>
          </li>
        ))}
      </ul>
    ))
  );
};

export default ServicesList;