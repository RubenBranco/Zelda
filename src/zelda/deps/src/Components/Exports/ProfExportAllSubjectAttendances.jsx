import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ProfExportAllSubjectAttendances extends React.Component{
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-primary"
                    table="SubjectAllAttendances-xls"
                    filename={gettext(this.props.subject + ' All Students Attendances')}
                    sheet="tablexls"
                    buttonText="Export Attendances"/>
                <table hidden={true} id="SubjectAllAttendances-xls" >
                    <thead>
                        <tr>
                            <th>{gettext('Student Number')}</th>
                            <th>{gettext('Student Name')}</th>
                            <th>{gettext('Total Attendances')}</th>
                            <th>{gettext('Student Email')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.results.map(result => {
                            return (
                                <tr>
                                    <td>{result.student_number}</td>
                                    <td>{result.name}</td>
                                    <td>{result.attendances}</td>
                                    <td>{result.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProfExportAllSubjectAttendances;