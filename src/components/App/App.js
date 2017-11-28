// @flow
import React, { Component, PureComponent, MouseEvent } from "react";
import style from "./styleApp.scss";
import moize from "moize";
import { scaleLinear } from "d3-scale";
import { binder, translator } from "src/utils";
// import for

const width = 500;
const height = 150;

export default class App extends Component {
  state = {
    power: 0.2,
    alpha: 0.05,
    z: 0.3
  };
  onChange = (key: "power" | "alpha" | "z", e: MouseEvent) => {
    this.setState({
      [key]: e.target.value
    });
  };
  render() {
    let { power, alpha, z } = this.state;
    let dx = height / 5;
    const bh = 30;
    let w = width * 0.5;
    return (
      <div className={style.container}>
        <div className={style.left}>
          <svg className={style.svg} width={width} height={height * 1.5}>
            <g transform={translator(20,20)}>
              <g transform={translator(0, 0)}>
                <text x={w*z/2} y={-5}>positives</text>
                <rect className={style.true} width={w * z} height={bh} />
                <text x={w*z+w*(1-z)/2} y={-5}>negatives</text>
                <rect
                  className={style.false}
                  width={w * (1 - z)}
                  x={w * z}
                  height={bh}
                />
              </g>
              <g transform={translator(0, 2 * dx)}>
                <g transform={translator(-w * z / 2, 0)}>
                  <rect
                    className={style.falseNegative}
                    width={w * z * (1 - power)}
                    height={bh}
                  />
                  <rect
                    className={style.truePositive}
                    x={w * z * (1 - power)}
                    width={w * z * power}
                    height={bh}
                  />
                </g>
                <g transform={translator(w - w * (1 - z) / 2, 0)}>
                  <rect
                    className={style.falsePositive}
                    width={w * alpha * (1 - z)}
                    height={bh}
                  />
                  <rect
                    className={style.trueNegative}
                    x={w * alpha * (1 - z)}
                    width={w * (1 - alpha) * (1 - z)}
                    height={bh}
                  />
                </g>
              </g>
              <g
                transform={translator(
                  w / 2 - w * (power * z + alpha * (1 - z)) / 2,
                  4 * dx
                )}
              >
                <rect
                  className={style.truePositive}
                  width={w * power * z}
                  height={bh}
                />
                <rect
                  className={style.falsePositive}
                  width={w * alpha * (1 - z)}
                  x={w * power * z}
                  height={bh}
                />
              </g>
            </g>
          </svg>
        </div>
        <div className={style.right}>
          <div className={style.sliderContainer}>
            <div>power = {(+power).toFixed(2)}</div>
            <input
              min="0"
              max="0.4"
              type="range"
              step="0.01"
              value={power}
              onChange={binder(this.onChange, "power")}
            />
          </div>
          <div className={style.sliderContainer}>
            <div>z = {(+z).toFixed(2)}</div>
            <input
              min="0"
              max="0.5"
              type="range"
              step="0.01"
              value={z}
              onChange={binder(this.onChange, "z")}
            />
          </div>
        </div>
      </div>
    );
  }
}
