import React from "react";
import classes from "./Panel.module.css";
import Button from "../UI/Button/Button";

const Panel = props => {
  const selectedPointId = props.selectedPointId;

  return (
    <div className={classes.Panel}>
      <div className={classes.PanelBackground}>
        <div style={{ textAlign: "center" }}>Punkty</div>
        <div>
          <Button clicked={props.addPoint}>Dodaj</Button>
        </div>
        <div>
          <Button disabled={selectedPointId === null ? "true" : false}>
            Usuń
          </Button>
        </div>
        <div>
          <Button disabled={selectedPointId === null ? "true" : false}>
            Edytuj
          </Button>
        </div>
        <div>
          <Button clicked={props.importPoints}>Import pikiet</Button>
        </div>
        <div>
          <Button clicked={props.exportTxt}>Eksport tekstowy</Button>
        </div>
      </div>
    </div>
  );
};

export default Panel;
