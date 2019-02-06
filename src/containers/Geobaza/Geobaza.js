import React, { Component } from "react";
import Table from "../../components/Table/Table";
import classes from "./Geobaza.module.css";
import Panel from "../../components/Panel/Panel";
import PanelDetails from "../../components/PanelDetails/PanelDetails";
import AddPoint from "../../components/UI/Modals/AddPoint/AddPoint";
import ExportTxt from "../../components/UI/Modals/ExportTxt/ExportTxt";
import ImportPoints from "../../components/UI/Modals/ImportPoints/ImportPoints";
import axios from "axios";
import Backdrop from "../../components/UI/Backdrop/Backdrop"
import Hoc from "../../hoc/Hoc/Hoc"

class Geobaza extends Component {
    state = {
        // coords: [
        //     {nr: 1,x: 5556565, y: 6643434, h:0, opis:''},
        //     {nr: 2,x: 5576565, y: 6643434, h:0, opis:''},
        //     {nr: 3,x: 5546565, y: 6343434, h:0, opis:''},
        // ],
        username: '',
        pass: '',
        hash:'',
        table: 1, // 1 wybrana baza robocza, 2 - archiwum
        coords: [],
        dates: [], // lista możliwych dat z archiwum 
        dateShow: 0, //wybrany indeks daty do wyświetlenia
        selectedPointId: null,  // id wybranego punktu
        showAddPointModal: false,
        showImportPointsModal: false,
        showExportTxtModal: false,
        selectedPointData: [], // współrzędne wybranego punktu
        tableTitle: 'Tabela robocza',
        loading: false
    };

    componentDidMount() {
        this.reloadData(1);
        
    }

    //przeładowanie tabeli


    reloadData = (table) =>{
        this.setState({
            loading : true
          });
       var tablename 
       var dateShow=''
       var data=''
       if(this.state.dates.length>0) {
           dateShow=this.state.dates[this.state.dateShow].data.data
           console.log(this.state.dates[this.state.dateShow].data.data)
        }
        
        console.log(this.state.dates.length)
        if(table===1)  tablename='wspolrzedne'; 
        else 
        { tablename='wspolrzedne_2'
         data="&data="+dateShow
         }

        this.setState({
            tableName: tablename,
            coords: []
        })
        axios.get(process.env.REACT_APP_URL+"access.php?tabela="+tablename
        + data
        ).then(response => {
            response.data.map((coord,index) => { 
                return this.setState({
                    coords: [
                        ...this.state.coords,
                        {   lp: index+1,
                            id: coord.id,
                            nr: coord.nr,
                            x: parseFloat(coord.x).toFixed(2),
                            y: parseFloat(coord.y).toFixed(2),
                            h:
                                coord.h > 0
                                    ? parseFloat(coord.h).toFixed(2)
                                    : "",
                            opis: coord.opis,
                            data: coord.data
                        } 
                    ]
                });  

                
            })
            this.setState({
                loading : false
                
                
              })
            
        })

        if(table===1 && this.state.dates.length<1 )
        {
            axios.get( process.env.REACT_APP_URL+"access.php?tabela=wspolrzedne_2&listadat=1").then(response => {
                response.data.map((data,index) => { 
                    return this.setState({
                        dates: [
                            ...this.state.dates,
                            {   lp: index,
                                data: data
                            } 
                        ]
                    }); 
                    
                }); 
            });
            this.setState({
                dateShow: 0
                
            })
        }


    }


    

    //wykonanie eksportu do pliku txt
    exportTxt = () => {
        var data = "";

        this.state.coords.map(coord => {
            data += coord.nr + " " + coord.x + " " + coord.y + "\r\n";
        });

        var element = document.createElement("a");
        element.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," + encodeURIComponent(data)
        );
        element.setAttribute("download", "punkty.txt");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
    };

    selectPointHandler = pointNumber => {
        const selectedData = { ...this.state.coords[pointNumber] };
        this.setState({
            selectedPointId: pointNumber,
            selectedPointData: { ...selectedData }
        });
    };

    deselectPointHandler = () => {
        this.setState({
            selectedPointId: null,
            selectedPointData: null
        });
    };

    addPointHandler = () => {
        this.setState({ showAddPointModal: true });
    };

    addPointClosedHandler = () => {
        this.setState({ showAddPointModal: false });
    };
    importPointsHandler = () => {
        this.setState({ showImportPointsModal: true });
    };

    importPointsClosedHandler = () => {
        this.setState({ showImportPointsModal: false });
    };

    exportTxtHandler = () => {
        this.setState({ showExportTxtModal: true });
    };

    exportTxtClosedHandler = () => {
        this.setState({ showExportTxtModal: false });
    };

changeTable = i => {
    var data=this.state.dateShow

    if(i===1)
    {
    this.setState ({
        tableTitle: 'Tabela robocza', 
        table: 1,
        loading: true
    }, () =>
    this.reloadData(i))
}
    else if(i===2)
    {this.setState ({tableTitle: 'Archiwum: '+ this.state.dates[data].data.data,
     table: 2}, () =>
    this.reloadData(i))
}
    
}

dateForward = () => {
if(this.state.dateShow>0)
{
    var data=this.state.dateShow
    this.setState({
        dateShow: data-1,
        loading: true,
        tableTitle: 'Archiwum: '+ this.state.dates[data-1].data.data,

    }, () => {
        this.reloadData(2)
    } )  
}
}

dateBackward = () => {
if(this.state.dateShow<this.state.dates.length-1)    
 {
    var data=this.state.dateShow
    this.setState({
        dateShow: data+1,
        loading: true,   
        tableTitle: 'Archiwum: '+ this.state.dates[data+1].data.data,
    }, () => {
        this.reloadData(2)
    } )  
    



 }  
}


    render() {
        
        return (
        <Hoc>
            <Backdrop show={this.state.loading}
                    loading={this.state.loading} />
            
            <div className={classes.Geobaza}>
        
                <AddPoint
                    show={this.state.showAddPointModal}
                    modalClosed={this.addPointClosedHandler}
                />
                <ImportPoints
                    show={this.state.showImportPointsModal}
                    modalClosed={this.importPointsClosedHandler}
                />

                <Table
                    points={this.state.coords}
                    select={this.selectPointHandler}
                    selected={this.state.selectedPointId}
                    deselectPoint={this.deselectPointHandler}
                    tableTitle={this.state.tableTitle}
                    switchTable={this.changeTable}
                    dateForward={this.dateForward}
                    dateBackward={this.dateBackward}
                    tableType={this.state.table}
                />

           

                <Panel
                    selectedPointId={this.state.selectedPointId}
                    addPoint={this.addPointHandler}
                    importPoints={this.importPointsHandler}
                    exportTxt={this.exportTxtHandler}
                />
                <PanelDetails
                    selectedPoint={this.state.selectedPointId}
                    selectedPointData={this.state.selectedPointData}
                />
                <ExportTxt
                    show={this.state.showExportTxtModal}
                    modalClosed={this.exportTxtClosedHandler}
                    exportHandler={this.exportTxt} //wykonanie eksportu txt
                />
            </div>
            </Hoc>
        );
    }
}

export default Geobaza;
