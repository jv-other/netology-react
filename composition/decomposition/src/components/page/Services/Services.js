import React, { useState } from "react";
import PropTypes from "prop-types";

import Nav, { NavItem } from "../../common/Nav/Nav";

import "./Services.css";

// Набор сервисов для примера
import SERVICES_LIST from "./services-list_ru.json";

const SHOW_ALL_KEY = "show-all";

// Элемент списка сервисов
const ServiceItem = ({ id, title, icon }) => (
  <figure className="service-item">
    <img src={icon} alt={title} className="card-img-top" />
    <figcaption className="service-title">{title}</figcaption>
  </figure>
);
ServiceItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

/**
 * Компонент - Список сервисов
 * 
 * @returns 
 */
const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const handleSelect = evt => (SHOW_ALL_KEY === evt.target.dataset.id) && setShowAll(prev => !prev);
  const allServices = showAll && (
    <div className="services-all-list nav" onClick={() => setShowAll(false)}>
      {SERVICES_LIST.map(service => (
        <ServiceItem key={service.id} {...service} />
      ))}
    </div>
  );

  return (
    <div className="services">
      {allServices}
      <Nav className="services-line" onSelect={handleSelect}>
        {SERVICES_LIST.slice(0, 7).map(service => (
          <NavItem key={service.id} id={service.id} className="service-item">
            {service.title}
          </NavItem>
        ))}
        <NavItem key={SHOW_ALL_KEY} id={SHOW_ALL_KEY} className="service-item">
          ещё
        </NavItem>
      </Nav>
    </div>
  );
};

export default Services;