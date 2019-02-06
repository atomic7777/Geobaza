import React from "react";
import classes from "./ExportTxt.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import Hoc from "../../../../hoc/Hoc/Hoc";
import Button from "../../../UI/Button/Button";

const ExportTxt = props => {
  if (props.show)
    return (
      <Hoc>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div className={classes.ExportTxt}>
          Eksport widocznej tabeli do pliku tekstowego "punkty.txt"
          <br/><Button clicked={props.exportHandler}>Eksport Nr X Y </Button>
        </div>
      </Hoc>
    );
  else return null;
};

export default ExportTxt;
