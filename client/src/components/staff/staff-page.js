import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { fetchCheckins, deleteCheckin, updateCheckin } from '../../actions/user-actions';



class StaffPage extends React.Component {
  constructor(props) {
    super(props);    
    this.renderMeCrazy = this.renderMeCrazy.bind(this);
    this.deleteCheckIn = this.deleteCheckIn.bind(this);
    this.updateCheckIn = this.updateCheckIn.bind(this);
  }
  deleteCheckIn(e,d) {
    this.props.deleteCheckin(d.original._id)
  }
  updateCheckIn(id, data) {
    console.log(id, data)
    this.props.updateCheckin(id,data);
  }
  componentDidMount() {
    this.props.fetchCheckins()
  } 
  renderMeCrazy(cellInfo) {    
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const checkins = [...this.props.checkins];
          checkins[cellInfo.index].checkInDetails[cellInfo.column.id] = e.target.innerHTML;           
          let id = checkins[cellInfo.index]._id;
          let param1 = cellInfo.column.id;
          let param2 = checkins[cellInfo.index].checkInDetails[cellInfo.column.id];
          console.log(param1);
          let data;
          if(param1==='roomSize') {
            data ={ $set: { "checkInDetails.roomSize": param2 } }
          } else if(param1==='startDate') {
            data ={ $set: { "checkInDetails.startDate": param2 } }
          } else if(param1==='endDate') {
            data ={ $set: { "checkInDetails.endDate": param2 } }
          }
          this.updateCheckIn(id, data)    
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.checkins[cellInfo.index].checkInDetails[cellInfo.column.id]
        }}
      />
    );
  }  
  render() {
    const data  = this.props.checkins;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              id: 'firstName',
              Header: "First Name",
              accessor: d => d.guestDetails.firstName
            },
            {
              id: 'lastName',
              Header: "Last Name",
              accessor: d => d.guestDetails.lastName

            },
            {
              id: 'startDate',
              Header: 'Check In Date',
              accessor: d => d.checkInDetails.startDate,
              Cell: this.renderMeCrazy

            },
            {
              id: 'endDate',
              Header: 'Check Out Date',
              accessor: d => d.checkInDetails.endDate,
              Cell: this.renderMeCrazy

            },
            {
              id: 'roomSize',
              Header: 'Room Size',
              accessor: d => d.checkInDetails.roomSize,
              Cell: this.renderMeCrazy
            },
            {
              id: 'staffActions',
              Header: 'Staff Action',
              Cell: d => (
                <button
                  onClick={((e) => this.deleteCheckIn(e, d))}
                >
                Delete Entry
                </button>)
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userState: state.userStore,
    checkins: state.userStore.checkins,
    formState: state.form
  }
}

export default withRouter(connect(mapStateToProps, { fetchCheckins, deleteCheckin, updateCheckin })(StaffPage));
