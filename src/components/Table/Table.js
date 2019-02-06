import React from "react";
import classes from "./Table.module.css";
import Hoc from "../../hoc/Hoc/Hoc";
import PanelTop from "../../components/PanelTop/PanelTop"

const Table = props => {
    return (
        <Hoc><div  className={classes.Table}>
            <PanelTop 
                tableTitle={props.tableTitle}
                switchTable1={() => props.switchTable(1)}
                switchTable2={() => props.switchTable(2)}
                dateForward={props.dateForward}
                dateBackward={props.dateBackward}
                tableType={props.tableType}
            >


                </PanelTop>




            <table>
                <thead
                    className={classes.TableHeader}
                    onClick={props.deselectPoint}
                >
                 
                     
               
                    
                    <tr>
                        <td>Lp</td>
                        <td>Nr</td>
                        <td>X</td>
                        <td>Y</td>
                        <td>h</td>
                        <td>opis</td>
                        <td>data</td>
                    </tr>
                </thead>
                <tbody>
                    {props.points.map((point, i) => {
                        return (
                            <tr
                                className={
                                    props.selected === i
                                        ? classes.Selected
                                        : classes.NotSelected
                                }
                                key={i}
                                onClick={() => props.select(i)}
                            >
                                
                                <td>{point.lp}</td>
                                <td>{point.nr}</td>
                                <td>{point.x}</td>
                                <td>{point.y}</td>
                                <td>{point.h}</td>
                                <td>
                                    {point.opis.length > 7
                                        ? point.opis
                                              .substring(0, 9)
                                              .concat("...")
                                        : point.opis}{" "}
                                </td>
                                <td>{point.data}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div> </Hoc>
    );
};

export default Table;
