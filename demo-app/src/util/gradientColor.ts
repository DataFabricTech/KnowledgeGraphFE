import * as d3 from "d3";

export const getInterpolator = (
  infos: { color: string; value: number }[],
  step = 0
) => {
  const interpolators: ((t: number) => string)[] = [];
  const length = infos.length - 1;
  const min = infos[0].value;
  const max = infos[length].value;

  new Array(length).fill(null).forEach((_, i) => {
    interpolators.push(d3.interpolate(infos[i].color, infos[i + 1].color));
  });

  return (d: number) => {
    const stepedD = (() => {
      if (step < 2) {
        return d;
      }

      const k = Math.floor(d * step);

      return Math.min(k / (step - 1), 1);
    })();

    const d1 = stepedD * (max - min) + min;

    let d2 = 1;

    for (let i = 1; i <= length; i++) {
      const v1 = infos[i].value;

      if (d1 < v1) {
        const v2 = infos[i - 1].value;

        d2 = ((d1 - v2) / (v1 - v2) + (i - 1)) / length;
        break;
      }
    }

    if (d2 < 0) return infos[0].color;
    if (d2 >= 1) return infos[length].color;

    const scaledD = d2 * length;
    const interpolatorIndex = Math.floor(scaledD);
    const newD = scaledD - interpolatorIndex;

    return interpolators[interpolatorIndex](newD);
  };
};
