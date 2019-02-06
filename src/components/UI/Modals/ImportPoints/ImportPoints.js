import React, { Component } from "react";
import classes from "./ImportPoints.module.css";
import ReactDropzone from "react-dropzone";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import Hoc from "../../../../hoc/Hoc/Hoc";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import nl2br from "react-newline-to-break";
import Button from "../../../UI/Button/Button";

//const ImportPoints = (props) => {
class ImportPoints extends Component {
  state = {
    showInfoModal: false,
    InfoModalResponse: "brak odpowiedzi z serwera",
    dateChange: "",
    buttonEnabledValidate: false,
    validDateText: "Upuść tu plik lub kliknij",
    checkboxRemoveChecked: true,
    checkboxArchiveChecked: true
  };

  onDrop = files => {
    console.log(files);
    this.HandleShowInfoModalShow();
    console.log(this.state.showInfoModal);
    var data = this.state.dateChange;
    var formData = new FormData();
    const obj = {
      data: data,
      clearTable: this.state.checkboxRemoveChecked,
      copyTable: this.state.checkboxArchiveChecked
    };
    const json = JSON.stringify(obj);
    const blob = new Blob([json], { type: "application/json" });

    formData.append("file", files[0]);
    formData.append("document", blob);
    axios({
      method: "post",
      url: process.env.REACT_APP_URL+"/js/ajaxsend.php",
      responseType: "text",
      //  config: { headers: {'Content-Type': 'text/plain' }},
      data: formData
    }).then(response => {
      this.setState(() => {
        let resp = nl2br(response.data);
        return {
          InfoModalResponse: resp, //response.data,
          showInfoModal: true
        };
      });
    });
  };

  //zamykanie okna
  HandleShowInfoModalClose = () => {
    this.setState(() => {
      return { showInfoModal: false };
    });
    this.props.modalClosed();
  };

  HandleShowInfoModalShow = () => {
    this.setState(() => {
      return { showInfoModal: true };
    });
  };

  //sprawdzenie czy wpisano poprawną datę
  handleDateChange(event) {
    var i = event.target.value;

    if (isValidDate(i) || i === "") {
      this.setState({
        ...this.prevState,
        buttonEnabledValidate: false,
        dateChange: event.target.value,
        validDateText: "Upuść tu plik lub kliknij"
      });
    } else
      this.setState({
        ...this.prevState,
        buttonEnabledValidate: true,
        dateChange: event.target.value,
        validDateText: "Błędna data"
      });
  }

  //usuwanie tabeli roboczej przy wgraniu nowej
  checkboxRemoveHandler(event) {
    this.setState({
      ...this.prevState,
      checkboxRemoveChecked: event.target.checked
    });
  }

  //kopiowanie tabeli roboczej do archiwum
  checkboxArchiveHandler(event) {
    this.setState({
      ...this.prevState,
      checkboxArchiveChecked: event.target.checked
    });
  }

  render() {
    if (this.props.show) {
      return (
        <Hoc>
          <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
          <div className={classes.ImportPoints}>
            {this.state.showInfoModal && (
              <SweetAlert
                warning
                confirmBtnText="OK"
                confirmBtnBsStyle="default" //cancelBtnBsStyle="default"
                title="Plik wczytany"
                onConfirm={this.HandleShowInfoModalClose.bind(this)}
              >
                {this.state.InfoModalResponse}
              </SweetAlert>
            )}
            <div
              style={{
                textAlign: "center"
              }}
            >
              Import pikiet
            </div>
            <div>Plik tekstowy w formacie: nr x y k</div><br/>
            <div
              style={{
                textAlign: "center"
              }}
            >
              <ReactDropzone
                disabled={this.state.buttonEnabledValidate}
                onDrop={this.onDrop}
              >
                {this.state.validDateText}
              </ReactDropzone>
              Inna data (opcjonalnie) YYYY-MM-DD
              <form>
                <div>
                  <input
                    type="text"
                    value={this.state.dateChange}
                    onChange={this.handleDateChange.bind(this)}
                  />
                </div>
                <div>
                  Usuń poprzednie punkty z tabeli roboczej
                  <input
                    type="checkbox"
                    defaultChecked="true"
                    onChange={this.checkboxRemoveHandler.bind(this)}
                  />
                </div>
                <div>
                  Dodaj punkty również do archiwum
                  <input
                    type="checkbox"
                    defaultChecked="true"
                    onChange={this.checkboxArchiveHandler.bind(this)}
                  />
                </div>
              </form>
              <Button clicked={this.props.modalClosed}>Zamknij</Button>
            </div>
          </div>
        </Hoc>
      );
    } else return null;
  }
  /*
if(this.show)
    return(null)
else
    return(
    <Hoc>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.ImportPoints}>
                <div style={{textAlign: 'center'}}> Import pikiet </div>
                <div>
                   Plik tekstowy w formacie: nr x y k
                </div>
                <div style={{textAlign: 'center'}}>
                    <ReactDropzone
                        onDrop={this.onDrop}
                        >
                        Upuść plik tutaj
                    </ReactDropzone>
                </div>
            </div>

            </Hoc>
        )*/
}

function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return false; // Invalid date
  return d.toISOString().slice(0, 10) === dateString;
}

export default ImportPoints;
