import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ProfExportSpecificStudentAttendances extends React.Component{
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-primary"
                    table="SubjectSpecificStudentAttendances-xls"
                    filename={gettext('All Student Number: ' + this.props.student + ' Attendances to ' + this.props.subject)}
                    sheet="tablexls"
                    buttonText={gettext('Export Student Number ' + this.props.student + ' Attendances')}/>
                <table hidden={true} id="SubjectSpecificStudentAttendances-xls" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{gettext('Class Type')}</th>
                            <th>{gettext('Date')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.studentAttendances.map(studentAttendance => {
                            return (
                                <tr key={studentAttendance.tableEntryId}>
                                    <td>{studentAttendance.tableEntryId}</td>
                                    <td>{studentAttendance.lesson_type}</td>
                                    <td>{studentAttendance.date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            )
    }
}

export default ProfExportSpecificStudentAttendances;