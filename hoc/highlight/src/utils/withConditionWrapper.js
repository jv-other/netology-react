import React from "react";

/*
 Оборачивает контент, возвращаемый функцией contentResolver компонентом WrapperComponent 
 при выполнении условия WrapperComponent.withCondition(props) или если условие не задано
*/
const withConditionalWrapper = (WrapperComponent, contentResolver) => {
  const ConditionalWrapper = (props) => {
    return ("function" !== typeof (WrapperComponent.withCondition))
      || WrapperComponent.withCondition(props) ? (
      <WrapperComponent {...props}>
        {contentResolver(props)}
      </WrapperComponent>
    ) : contentResolver(props);
  };
  return ConditionalWrapper;
};

/**
 * Оборачивает массив компонентов друг в друга при выполнении условий
 * Условие [props => true|false] задается в Component.withCondition
 * Компоненты вкладываются в порядке следования в массиве (оборачивают друг друга с конца массива)
 * 
 * @param {React.ComponentType[]} components Массив компонентов
 * @returns {React.ComponentType} Результирующий компонент
 */
const withConditionChainWrapper = (components) => components.reduce(
  (contentResolver, component) => withConditionalWrapper(component, contentResolver),
  () => (<></>)
);

/**
 * Устанавливает переданным компонентам свойство Component.withCondition
 * 
 * @param {React.ComponentType} components Массив компонентов 
 * @param {function[]} rules Массив функций проверки отрисовки компонента
 * @returns {React.ComponentType} Исходный массив компонентов
 */
const setComponentsShowRules = (components, rules) => components.map((component, index) => {
  rules[index] && (component.withCondition = rules[index]);
  return component;
});

export { withConditionChainWrapper as default, setComponentsShowRules };