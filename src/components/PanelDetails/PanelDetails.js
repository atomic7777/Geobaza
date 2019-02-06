import React from 'react';
import classes from './PanelDetails.module.css';

const PanelDetails = (props) => {
    if (props.selectedPoint !== undefined && props.selectedPoint !== null)
            return(
            <div className={classes.Panel}>
                <div className={classes.PanelBackground}>
                        <div>Nr: <input type="text" onChange={() => {}} value={props.selectedPointData.nr}/>
                        </div>
                        <div>X: <input type="text" onChange={() => {}} value={props.selectedPointData.x  }/>
                        </div>
                        <div>Y: <input type="text" onChange={() => {}} value={props.selectedPointData.y  }/>
                        </div>
                        <div>Opis: {props.selectedPointData.opis  }
                        </div>
                        <div>Data: {props.selectedPointData.data  }
                        </div>                        
                </div>
            </div>

        )

    else return (
           <div className={classes.Panel}>
                <div className={classes.PanelBackground}>
                     Wybierz punkt z listy
                </div> 
            </div>
    )
    
        
}

export default PanelDetails;