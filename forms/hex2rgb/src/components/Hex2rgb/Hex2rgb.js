import React, { useState } from "react";
import "./Hex2rgb.css";

const DEFAULT_COLOR = "#9a00ff", ERROR_COLOR = "#e94b35";

// Коррекция вводимого значения
const fixСolorInput = color => ((color || "").startsWith("#") ? color : ("#" + (color || ""))).slice(0, 7);

// Валидация ввода
const checkColorInput = color => /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(color);

// RGB представление цвета или сообщение, в случае некорректного значения
const getColorLabel = (color) => {
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  return rgb
    ? ["rgb(", rgb.map(v => parseInt(v, 16)).slice(1).join(", "), ")"].join("")
    : (7 > color.length ? "Ввод.." : "Ошибка!");
}

// Цвет фона
const getBackgoundColor = color => ({ "backgroundColor": checkColorInput(color) ? color : ERROR_COLOR });

/**
 * Конвертер цветов из HEX в RGB
 * 
 * @returns 
 */
const Hex2rgb = () => {
  const [state, setState] = useState({
    color: DEFAULT_COLOR, // значение текущего ввода
    background: DEFAULT_COLOR // значение цвета фона
  });
  const handleChange = ({ target }) => {
    const colorInput = fixСolorInput(target.value);
    setState(prev => ({
      color: colorInput,
      background: 7 === colorInput.length ? colorInput : prev.background
    }));
  };

  return (
    <div className="hex2rgb" style={getBackgoundColor(state.background)}>
      <input
        id="hex2rgb-input"
        className="hex2rgb-input"
        placeholder="#fafafa"
        value={state.color}
        onChange={handleChange}
      />
      <label htmlFor="hex2rgb-input" className="hex2rgb-label">
        {getColorLabel(state.color)}
      </label>
    </div>
  );
};

export default Hex2rgb;