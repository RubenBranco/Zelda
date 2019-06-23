import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ProfExportAllShiftLessStudentSubject extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-primary export_student"
                    table="ProfExportAllShiftLessStudentSubject-xls"
                    filename={gettext('All Shiftless Students of ' + this.props.subject)}
                    sheet="tablexls"
                    buttonText={gettext("Export Shiftless Students Data")} />
                <table hidden={true} id="ProfExportAllShiftLessStudentSubject-xls" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{gettext('Student Number')}</th>
                            <th>{gettext('Student Name')}</th>
                            <th>{gettext('Student Email')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.results.map(result => {
                            return (
                                <tr key={result.tableEntryId}>
                                    <td>{result.tableEntryId}</td>
                                    <td>{result.student_number}</td>
                                    <td>{result.name}</td>
                                    <td>{result.institutional_email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProfExportAllShiftLessStudentSubject;