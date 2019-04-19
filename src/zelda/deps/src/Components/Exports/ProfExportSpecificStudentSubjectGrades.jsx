import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ProfExportSpecificStudentSubjectGrades extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-primary"
                    table="ProfExportSpecificStudentSubjectGrades-xls"
                    filename={gettext('All Student Number: ' + this.props.student + ' Grades of Subject ' + this.props.subject)}
                    sheet="tablexls"
                    buttonText={gettext('Export Student Number: ' + this.props.student + ' Grades')}/>
                <table hidden={true} id="ProfExportSpecificStudentSubjectGrades-xls" >
                    <thead>
                        <tr>
                            <th>{gettext('Evaluation')}</th>
                            <th>{gettext('Grade')}</th>
                            <th>{gettext('Percentage')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.results.map(result => {
                            return (
                                <tr key={result.tableEntryId}>
                                    <td>{result.designation}</td>
                                    <td>{result.grade}</td>
                                    <td>{result.percentage}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProfExportSpecificStudentSubjectGrades;