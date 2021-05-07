import React, { useEffect, useState } from "react";
import { IQuestionProps } from "./IQuestionProps";
import styles from "./slider.module.css";

function Slider(props: IQuestionProps<string>) {
  const [sliderVal, setSliderVal] = useState(0);
  const { question, responseSetter } = props;
  const MAX_VALUE = 100;
  const MIN_VALUE = 0;

  useEffect(() => {
     responseSetter(sliderVal.toString());
  }, [sliderVal, responseSetter]);

  const onChangeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderVal(e.currentTarget.valueAsNumber);
  };
  return (
    <div className={styles.slidercontainer}>
      <h5 className="text-lg">{`${question}: ${sliderVal}%`}</h5>
      <input
        type="range"
        min={MIN_VALUE}
        max={MAX_VALUE}
        value={sliderVal}
        className={styles.slider}
        onChange={onChangeSlider}
      />
      <label className="flex justify-between ">
        <div>0</div>
        <div>100</div>
      </label>
    </div>
  );
}

export default Slider;
