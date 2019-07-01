import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import getCsrfToken from "../../functions/csrf.js";

class ProfExportSpecificStudentSubjectGrades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: null,
        }

        this.csrfmiddlewaretoken = getCsrfToken();
    }

    componentDidMount() {
        fetch(`/api/subject/${this.props.results[0]['subjectId']}/`, {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                this.setState({ subject: data.designations })
            })
        })
    }

    render () {
        return (
            <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-primary"
                    table="ProfExportStudentsSubjectGrades-xls"
                    filename={this.state.subject + gettext( ' - Students Grades')}
                    sheet="tablexls"
                    buttonText={this.state.subject + gettext(' - Export Students Grades')}/>
                <table hidden={true} id="ProfExportStudentsSubjectGrades-xls" >
                    <thead>
                        <tr>
                            <th>{gettext('Evaluation')}</th>
                            <th>{gettext('Grade')}</th>
                            <th>{gettext('Student First Name')}</th>
                            <th>{gettext('Student Last Name')}</th>
                            <th>{gettext('Student Number')}</th>
                            <th>{gettext('Student Email')}</th>
                            <th>{gettext('Observations')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.results.map(result => {
                            return (
                                <tr>
                                    <td>{result.evaluation}</td>
                                    <td>{result.grade}</td>
                                    <td>{result.studentFirstName}</td>
                                    <td>{result.studentLastName}</td>
                                    <td>{result.studentNumber}</td>
                                    <td>{result.sutdentInstitutionalEmail}</td>
                                    <td></td>
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
