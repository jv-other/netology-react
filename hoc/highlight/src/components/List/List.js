import React from 'react';
import PropTypes from "prop-types";

import Video from '../Video/Video';
import Article from '../Article/Article';
import New from "../New/New";
import Popular from "../Popular/Popular";

import withConditionChainWrapper, { setComponentsShowRules } from '../../utils/withConditionWrapper';

/*

// Если задавать правила отображения элементов списка в одном месте:
setComponentsShowRules([Video, Article, New, Popular], [
  item => "video" === item.type,
  item => "article" === item.type,
  item => 100 > item.views,
  item => 1000 < item.views
]);

*/

// Компонент - элемент списка, содержимое отображается в зависимости от срабатывания условия,
// заданного в Component.withCondition
const ListItem = withConditionChainWrapper([Video, Article, New, Popular]);

const List = ({ list }) => (
  <>
    {list.map((item, index) => (
      <ListItem {...item} key={index} />
    ))}
  </>
);

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    url: PropTypes.string,
    title: PropTypes.string
  }))
};

export default List;