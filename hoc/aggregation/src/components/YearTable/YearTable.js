import React from "react";
import PropTypes from "prop-types";

function YearTable(props) {
  console.log('YearTable', props);

  return (
    <div>
      <h2>Year Table</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, index) => (
            <tr key={index}>
              <td>{item.year}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

YearTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    year: PropTypes.number,
    amount: PropTypes.number
  }))
};

export default YearTable;