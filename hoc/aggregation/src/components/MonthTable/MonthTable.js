import React from "react";
import PropTypes from "prop-types";

function MonthTable(props) {
  console.log('MonthTable', props);

  return (
    <div>
      <h2>Month Table</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

MonthTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    month: PropTypes.string,
    amount: PropTypes.number
  }))
}

export default MonthTable;