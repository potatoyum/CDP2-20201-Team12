import React from 'react';
import DatePicker from 'react-datepicker';
import { Row, Col } from 'reactstrap';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class DatePickerInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.func = this.func.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.startDate)
    }

    func(){
        alert('helloooooo');
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <form onSubmit={this.onFormSubmit}>
                        <Row>
                            <Col>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    dateFormat="MMMM d, yyyy"
                                    className="form-control"
                                />
                                <button className="btn btn-primary" style={{marginLeft: 10 + 'px'}} onClick={this.func}>선택</button>
                            </Col>
                        </Row>
                        

                    </form>
                </div>
            </div>
        );
    }

}

export default DatePickerInput; 