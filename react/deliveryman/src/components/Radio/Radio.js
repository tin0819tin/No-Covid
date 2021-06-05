import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import styles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

const useStyles = makeStyles(styles);

const CustomRadio = React.forwardRef((props, ref) => {
  const [selectedEnabled, setSelectedEnabled] = React.useState(null);
  const classes = useStyles();
  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal
  );
  return (
    <div >
      <div className={wrapperDiv} >
        <FormControlLabel
          // inputRef={ref} 
          control={
            <Radio
              checked={selectedEnabled === true}
              onChange={(event) => {setSelectedEnabled(true); props.onChange(true);}}
              value={true}
              // inputRef={ref}
              name="radio button enabled"
              aria-label="A"
              icon={
                <FiberManualRecord
                  className={classes.radioUnchecked}
                />
              }
              checkedIcon={
                <FiberManualRecord className={classes.radioChecked} />
              }
              classes={{
                checked: classes.radio
              }}
            />
          }
          classes={{
            label: classes.label
          }}
          label="Yes"
        />
      </div>
      <div className={wrapperDiv}>
        <FormControlLabel
          control={
            <Radio
              checked={selectedEnabled === false}
              onChange={(event) => {setSelectedEnabled(false); props.onChange(false)}}
              value={false}
              name="radio button enabled"
              aria-label="B"
              icon={
                <FiberManualRecord
                  className={classes.radioUnchecked}
                />
              }
              checkedIcon={
                <FiberManualRecord className={classes.radioChecked} />
              }
              classes={{
                checked: classes.radio
              }}
            />
          }
          classes={{
            label: classes.label
          }}
          label="No"
        />
      </div>
    </div>
  );
});

CustomRadio.propTypes = {
  onClick: PropTypes.func,


}; 

export default CustomRadio;