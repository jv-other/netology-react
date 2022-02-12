import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";

import { reset, request, PENDING, FAILURE, SUCCESS } from "../store/requestSlice";

import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";

/**
 * Карточка услуги
 * 
 * @component
 *  
 */
const ServicesForm = () => {
  const { params } = useMatch("/:id/details");
  // требуемый ресурс
  const resource = ["services", params.id].join("/");

  const { status, data } = useSelector(state => state.request);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Загрузка
  useEffect(() => {
    dispatch(request(resource));
  }, []);

  const handleCancel = () => {
    dispatch(reset());
    navigate(-1);
  };

  return (
    // Если загрузка
    ((PENDING === status) && <Spinner />) ||
    // Если ошибка
    ((FAILURE === status) && <ErrorMessage />) ||
    // Если данные получены
    ((SUCCESS === status) && (
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="form-input-name" className="form-label">Название</label>
            <input
              id="form-input-name"
              type="text"
              className="form-control"
              value={data?.name}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="form-input-price" className="form-label">Стоимость</label>
            <input
              id="form-input-price"
              type="number"
              className="form-control"
              value={data?.price}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="form-input-content" className="form-label">Описание</label>
            <input
              id="form-input-content"
              type="text"
              className="form-control"
              value={data?.content}
              readOnly
            />
          </div>
          <button type="button" className="btn btn-danger me-2" onClick={handleCancel}>
            Отмена
          </button>
        </div>
      </div>
    ))
  );
};

export default ServicesForm;