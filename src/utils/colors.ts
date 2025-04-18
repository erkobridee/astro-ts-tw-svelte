// https://echarts.apache.org/en/option.html#color

export const hexToRGB = (hex: string, alpha: number | undefined = 1) => {
  if (!hex) {
    return '';
  }

  if (alpha < 0 || alpha > 1) {
    alpha = 1;
  }

  hex = hex.toUpperCase();

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
