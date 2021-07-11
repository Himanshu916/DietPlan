import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 200
  }
});

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider({value,setValue}) {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Meals Range
      </Typography>
      <Slider
        min={1}
        max={7}
        marks
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
