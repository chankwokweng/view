import React, { Component } from 'react';
import { Table, Row, Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { authMiddleWare } from '../util/auth';
import { questionaireOptions, consultation, ageGroupOptions, lifeStyleOptions } from '../util/consultation';
import { Link } from 'react-router-dom';

function formatDate(date) {
    console.log('formatDate=', date);
    var d = new Date(date);
    var result = '';

    try {
        // console.log('formatDate date.toDateString()=', d.toDateString());
        //     result = d.getDate() +
        //             "/" + (d.getMonth() + 1) +
        //             "/" + d.getFullYear();
        result = d.toDateString();
    } catch {result = ''};
    return (result);
}


class QuestionaireSection extends Component {
    constructor(props) {
        super(props);
        this.state = { dataChangeToggle : false};
        // console.log("consultations - questionaireSection props=", this.props);
    }

    handleQuestionOptionSelected = (event, section, row) => {
        // console.log("consultations - handleQuestionOptionSelected option=", 
        //     section, '/', row, '/', event.target.name, ':', event.target.value);
         this.props.onQuestionaireChange(event, section, row);
         this.setState({dataChangeToggle : !this.state.dataChangeToggle});
    }

    render() {
        const rows = [];
        var section_qn = '';
        // console.log("editClient - questionaireSection props=", this.props.section.questions);

        this.props.section.questions.map((q, index) => {
            // rows.push( <questionaireSectionQuestion question={question} />)});
            // console.log('question=', q);
            section_qn = this.props.section.sectionSeq + '-' + q.seq;
            rows.push(<tr onChange={(e) => this.handleQuestionOptionSelected(e, this.props.sectionIndex, index)}
                        value={q.selectedOption} >
                <td> {q.seq} </td>
                <td> {q.question} </td>
                <td> <input type="radio" value="1" name={section_qn} checked={q.selectedOption == "1"}/> </td>
                <td> <input type="radio" value="2" name={section_qn} checked={q.selectedOption == "2"}/> </td>
                <td> <input type="radio" value="3" name={section_qn} checked={q.selectedOption == "3"}/> </td>
                <td> <input type="radio" value="4" name={section_qn} checked={q.selectedOption == "4"}/> </td>
                <td> <input type="radio" value="5" name={section_qn} checked={q.selectedOption == "5"}/> </td>
            </tr>)
        });
        // console.log('rows=', rows);

        return (
            <div>
                <h2> {this.props.section.sectionSeq} . {this.props.section.sectionDesc} </h2>
                <h6> {this.props.section.sectionQuestion} </h6>
            <Table striped bordered hover>
                <thead >
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>{questionaireOptions[0]}</th>
                        <th>{questionaireOptions[1]}</th>
                        <th>{questionaireOptions[2]}</th>
                        <th>{questionaireOptions[3]}</th>
                        <th>{questionaireOptions[4]}</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            </div>
        )
    }
}

class Questionaire extends Component {
    constructor(props) {
        super(props);
        // console.log("Questionaire - questionaire props=", this.props);
    }
    render() {
        const sections = [];

        this.props.questionaire.map((s,index) => {
            // console.log("editClient - questionaire section=", s);
            sections.push(<QuestionaireSection section={s} sectionIndex={index}
                onQuestionaireChange={this.props.onQuestionaireChange}/>)});

        // console.log('sections=', sections);
        return (
            <div>
                {sections}
            </div>
        );

    }
}   

// =============== Consultation Details =======================
class ConsultationDetail extends React.Component {

    constructor(props) {
        // console.log("ConsultationDetail - constructor props=", props);
        super(props);
     
        this.state = {
            uiLoading: false,
            showBasicInfo: true,
            showQuestionaire: true,
            dataChangeToggle: true,
        }

        this.data = {
            gender: props.gender,
            clientId: props.clientId,
            consultationId: props.consultationId,
            consultationDetail: props.consultationDetail,
        };
    };

    componentDidMount = () => {
        // console.log("ConsultationDetail - consultationDetail=", this.consultationDetail);
    }

    handleCloseConsultationDetail = () => {
        console.log('ConsultationDetail handleCloseConsultationDetail');
        this.props.onConsultationDetailClose();
    }

    handleSaveConsultationDetail = (event) => {
        event.preventDefault();
        // console.log('handleSaveConsultationDetail data.basicInfo=', this.data);

        const newConsultationData = {
            basicInfo           : this.data.consultationDetail.basicInfo,
            personalConditions  : this.data.consultationDetail.personalConditions,
            questionaire        : this.data.consultationDetail.questionaire,
        };
        // console.log("handleSaveConsultationDetail this.data=", newConsultationData);
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };

        axios
            .post('/api/consultation/' + this.data.clientId + '/' + this.data.consultationId, newConsultationData)
            .then((response) => {
                console.log('handleSaveConsultationDetail submit success response:', response.data);
                // this.props.history.push('/clients');
                alert("Saved");
            })
            .catch((error) => {
                console.log('handleSaveConsultationDetail submit error:', error.response.data);
                this.setState({
                    errors: error.response.data,
                });
                this.props.history.push('/login');
            });
    };

    handleQuestionaireChange = (event, section, row) => {

        this.data.consultationDetail.questionaire[section].questions[row].selectedOption = event.target.value;
        
        console.log("consultations - handleQuestionaireChange=",
            section, '/', row, '/', event.target.name, ':', event.target.value, "=",
            this.data.consultationDetail.questionaire[section].questions[row]);
    }

    handleChangeBasicInfo = (event) => {
        // console.log('handleChange event.target.name=', event.target.name, ' / event.target.value=', event.target.value );
        this.data['consultationDetail']['basicInfo'][event.target.name] = event.target.value;
        // console.log('handleChange data=', this.data);
        switch (event.target.name){
            case 'height':
            case 'weight':
                const h = this.data.consultationDetail.basicInfo.height; 
                const w = this.data.consultationDetail.basicInfo.weight;
                // console.log('handleChangeBasicInfo calc BMI:', h, w, h>50, w>10);
                try {
                    if (h>50 && h<250 && w>10 && w<200)
                    {
                        const bmi = w / ((h / 100) * (h / 100));
                        // bmi = bmi.toFixed(2);
                        this.data.consultationDetail.basicInfo.bmi = bmi;
                        // console.log('handleChangeBasicInfo calc BMI:', bmi);
                        if (bmi<18.5)
                            this.data.consultationDetail.basicInfo.bmiResult = 'Too thin 太瘦';
                        else if (bmi < 22.9)
                            this.data.consultationDetail.basicInfo.bmiResult = '*Normal 正常';
                        else if (bmi < 26.9)
                            this.data.consultationDetail.basicInfo.bmiResult = '*Overweight 超重';
                        else 
                            this.data.consultationDetail.basicInfo.bmiResult = '*Obese 肥胖';
                    // console.log('handleChangeBasicInfo calc BMI:', h + '/', w + '/' + bmi + '/' + 
                    //     this.data.consultationDetail.basicInfo.bmiResult);
                    this.setState({ dataChangeToggle: !this.state.dataChangeToggle});
                    console.log("hello");
                }}
                catch
                {};
                break;
            case 'waist':
            case 'hip':
                const waist = this.data.consultationDetail.basicInfo.waist;
                const hip = this.data.consultationDetail.basicInfo.hip;
                try {
                    // console.log('handleChangeBasicInfo calc waist/hip:', waist + '/', hip);
                    if (waist>10 && hip>10)
                    {
                        const waistHipRatio = waist/hip;
                        this.data.consultationDetail.basicInfo.waistHipRatio = waistHipRatio;
                    
                        switch (this.data.gender)
                        {
                            case 'm', "M": 
                                if (waistHipRatio <0.85)
                                    this.data.consultationDetail.basicInfo.waistHipRatioResult = 'Normal (Low) 正常(低)';
                                else if (waistHipRatio < 0.9)
                                    this.data.consultationDetail.basicInfo.waistHipRatioResult = 'Normal 正常';
                                else if (waistHipRatio < 0.95)
                                    this.data.consultationDetail.basicInfo.waistHipRatioResult = 'Apple shape (high) 脂肪囤积于腰部(高)';
                                else
                                    this.data.consultationDetail.basicInfo.waistHipRatioResult = 'Apple shape (high risk) 脂肪囤积于腰部(超高)';
                                break;
                            case 'f', "F": 
                                if (waistHipRatio < 0.75)
                                    this.data.consultationDetail.basicInfo.waistHipRatioResult = 'Normal (Low) 正常(低)';
                                else if (waistHipRatio < 0.8)
                                    this.data.consultationDetail.basicInfo.waistHipRatioResult = 'Normal 正常';
                                else if (waistHipRatio < 0.85)
                                    this.data.consultationDetail.basicInfo.waistHipRatioResult = 'Apple shape (high) 脂肪囤积于腰部(高)';
                                else
                                    this.data.consultationDetail.basicInfo.waistHipRatioResult = 'Apple shape (high risk) 脂肪囤积于腰部(超高)';
                                break;
                            default: console.log ('Gender not defined', this.data.gender);
                        }
                        // console.log('handleChangeBasicInfo calc waistHipRatio:', waist + '/', hip + '/' + waistHipRatio + '/' +
                        // this.data.consultationDetail.basicInfo.waistHipRatioResult);

                        this.setState({ dataChangeToggle: !this.state.dataChangeToggle });
                    }
                }
                catch (e)
                    { console.log('waistHipRatio error=',e)};
                break;
        }
    };

    handleShowOrHideSection = (sectionName) => {
        switch (sectionName) {
            case 'BasicInfo': this.setState({ showBasicInfo: !this.state.showBasicInfo});
                                break;
            case 'Questionaire': this.setState({ showQuestionaire: !this.state.showQuestionaire });
                break;
            default:
        }
    }

    render() {
        // this.data = {
        //     clientId: this.props.clientId,
        //     consultationId: this.props.consultationId,
        //     consultationDetail: this.props.consultationDetail,
        // };
        // console.log('render state=', this.state);
        // console.log('render this.data=', this.data);

        if (this.state.uiLoading === true) {
            return (
                <div>
                    Loading ...
                </div>
            );
        } else { 
            // <h1> Id's: {this.props.clientId} / {this.props.consultationId}</h1>
            return(
            <Container component="main">
                <div className='p-2 my-2 border'>
                    <h2> {formatDate(this.data.consultationDetail.basicInfo.dateOfConsultation)}</h2>
                    <Row>
                        <Col> <h3>Basic info</h3> </Col>
                        <Col>
                            <Button variant="link" onClick={() => this.handleShowOrHideSection('BasicInfo')}>
                                {this.state.showBasicInfo ?
                                    'Hide' : 'Show'}
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="submit"
                                color="primary"
                                onClick={this.handleSaveConsultationDetail}
                            >
                                Save
                            </Button> 
                            <Button
                                type="submit"
                                color="primary"
                                onClick={this.handleCloseConsultationDetail}
                            >
                                Close
                            </Button>
                        </Col>
                    </Row>
                    {!this.state.showBasicInfo ?
                    null
                    :
                    <Form noValidate>
                        <Row>
                            <Form.Label>Age Group
                            <Form.Select aria-label="Default select example"
                                variant="outlined"
                                required
                                defaultValue={this.data.consultationDetail.basicInfo.ageGroup}
                                id="ageGroup"
                                name="ageGroup"
                                autoComplete="ageGroup"
                                onChange={(e) => this.handleChangeBasicInfo(e)}
                            >
                                <option disabled hidden value=''>Select an age group</option>
                                <option value={ageGroupOptions[0]}>{ageGroupOptions[0]}</option>
                                <option value={ageGroupOptions[1]}>{ageGroupOptions[1]}</option>
                                <option value={ageGroupOptions[2]}>{ageGroupOptions[2]}</option>
                                <option value={ageGroupOptions[3]}>{ageGroupOptions[3]}</option>
                                <option value={ageGroupOptions[4]}>{ageGroupOptions[4]}</option>
                                <option value={ageGroupOptions[5]}>{ageGroupOptions[5]}</option>
                            </Form.Select>
                            </Form.Label>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Height (in cm)</Form.Label>
                                    <Form.Control
                                        variant="outlined"
                                        required
                                        defaultValue={this.data.consultationDetail.basicInfo.height}
                                        id="height"
                                        name="height"
                                        onChange={(e) => this.handleChangeBasicInfo(e)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Weight (in kg)</Form.Label>
                                    <Form.Control
                                        variant="outlined"
                                        required
                                        defaultValue={this.data.consultationDetail.basicInfo.weight}
                                        id="weight"
                                        name="weight"
                                        onChange={(e) => this.handleChangeBasicInfo(e)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>BMI</Form.Label>
                                    <Form.Control
                                        readOnly
                                        variant="outlined"
                                        value={this.data.consultationDetail.basicInfo.bmi}
                                        id="bmi"
                                        name="bmi"
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>BMI Result</Form.Label>
                                    <Form.Control
                                        readOnly
                                        variant="outlined"
                                        value={this.data.consultationDetail.basicInfo.bmiResult}
                                        id="bmiResult"
                                        name="bmiResult"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Waist (in cm)</Form.Label>
                                    <Form.Control
                                        variant="outlined"
                                        required
                                        defaultValue={this.data.consultationDetail.basicInfo.waist}
                                        id="waist"
                                        name="waist"
                                        onChange={(e) => this.handleChangeBasicInfo(e)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Hip (in cm)</Form.Label>
                                    <Form.Control
                                        variant="outlined"
                                        required
                                        defaultValue={this.data.consultationDetail.basicInfo.hip}
                                        id="hip"
                                        name="hip"
                                        onChange={(e) => this.handleChangeBasicInfo(e)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Waist/Hip Ratio</Form.Label>
                                    <Form.Control
                                        readOnly
                                        variant="outlined"
                                        value={this.data.consultationDetail.basicInfo.waistHipRatio}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Waist/Hip Ratio Result</Form.Label>
                                    <Form.Control
                                        readOnly
                                        variant="outlined"
                                        value={this.data.consultationDetail.basicInfo.waistHipRatioResult}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Life style
                                    <Form.Select aria-label="Default select example"
                                        variant="outlined"
                                        required
                                        defaultValue={this.data.consultationDetail.basicInfo.lifeStyle}
                                        id="lifeStyle"
                                        name="lifeStyle"
                                        onChange={(e) => this.handleChangeBasicInfo(e)}
                                    >
                                        <option disabled hidden value=''>Select your lifestyle</option>
                                        <option value={lifeStyleOptions[0]}>{lifeStyleOptions[0]}</option>
                                        <option value={lifeStyleOptions[1]}>{lifeStyleOptions[1]}</option>
                                    </Form.Select>
                                </Form.Label>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Number of children</Form.Label>
                                    <Form.Control
                                        variant="outlined"
                                        required
                                        defaultValue={this.data.consultationDetail.basicInfo.numberOfChildren}
                                        id="numberOfChildren"
                                        name="numberOfChildren"
                                        onChange={(e) => this.handleChangeBasicInfo(e)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>                                
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Last visit to doctor</Form.Label>
                                    <Form.Control
                                        type="date"
                                        variant="outlined"
                                        required
                                        defaultValue={this.data.consultationDetail.basicInfo.lastVisitToDoctor}
                                        id="lastVisitToDoctor"
                                        name="lastVisitToDoctor"
                                        onChange={(e) => this.handleChangeBasicInfo(e)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>GP and Address</Form.Label>
                                    <Form.Control
                                        variant="outlined"
                                        required
                                        defaultValue={this.data.consultationDetail.basicInfo.GPAddress}
                                        id="GPAddress"
                                        name="GPAddress"
                                        onChange={(e) => this.handleChangeBasicInfo(e)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>                        
                    </Form>
                    }
                </div>
                <div>
                    <Row>
                        <Col> <h3>Questionaire</h3> </Col>
                        <Col>
                            <Button variant="link" onClick={() => this.handleShowOrHideSection('Questionaire')}>
                                {this.state.showQuestionaire ?
                                    'Hide' : 'Show'}
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="submit"
                                color="primary"
                                onClick={this.handleSaveConsultationDetail}
                            >
                                Save
                            </Button> 
                            <Button
                                type="submit"
                                color="primary"
                                onClick={this.handleCloseConsultationDetail}
                            >
                                Close
                            </Button>
                        </Col>
                    </Row>
                    {!this.state.showQuestionaire ?
                    null
                    :
                    <Questionaire questionaire={this.data.consultationDetail.questionaire}
                                    onQuestionaireChange={this.handleQuestionaireChange}/>
                    }
                </div>
            </Container>)
    }}

}

// =============== Consultation =======================
class ConsultationTable extends React.Component {
    constructor(props) {
        super(props);
        // console.log("ConsultationTableAndDetail - props=", this.props);
        this.state = {
            uiLoading: true,
            showConsultationDetail: false,
        };

        this.handleConsultationRowSelected = this.handleConsultationRowSelected.bind(this);
    };
    
    handleConsultationRowSelected(id) {
        // console.log('handleConsultationRowSelected e=', id);
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };

        axios
            .get('/api/consultation/' + this.props.clientId + '/' +id)
            .then((response) => {
                console.log('handleConsultationRowSelected success response:', response.data);
                this.props.onConsultationRowSelected(
                    {
                        clientId: this.props.clientId,
                        selectedConsultationId: id,
                        consultationDetail: response.data
                    }
                );
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    console.log('handleConsultationRowSelected error:', error.response.data);
                    this.props.history.push('/login');
                }
                console.log(error);
            });
        };

    render() {
        const rows = [];

        this.props.consultations.forEach((consultation) => {
            // console.log('ConsultationTable forEach', consultation);
        rows.push(
            <tr onClick={()=>this.handleConsultationRowSelected(consultation.consultationId)}
                key={consultation.consultationId}>
                <td> {formatDate(consultation.basicInfo.dateOfConsultation)} </td>
                <td> {consultation.basicInfo.ageGroup} </td>
                <td> {consultation.basicInfo.weight} </td>
                <td> {consultation.basicInfo.height} </td>
                <td> {consultation.basicInfo.bmiResult} </td>
                <td> {consultation.basicInfo.waistHipRatioResult} </td>
            </tr>
        );
    });

    return (
        <Container>
            <Table striped bordered hover>
                <thead >
                    <tr>
                        <th>Date </th>
                        <th>ageGroup</th>
                        <th>weight(kg)</th>
                        <th>heiht(cm)</th>
                        <th>BMI Result</th>
                        <th>Waist-Hip Result</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Container>
    )
    }
}



export class Consultations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uiLoading: true,
            selectedConsultationId: '',
        };
        // console.log("Consultations - props=", this.props);
        this.handleConsultationRowSelected = this.handleConsultationRowSelected.bind(this);
        this.handleConsultationDetailClose = this.handleConsultationDetailClose.bind(this);
    };

    handleConsultationRowSelected (result) {
        // console.log('handleConsultationRowSelected result=', result);
        this.setState( result );
        this.setState( {showConsultationDetail:true });
    }

    handleConsultationDetailClose (){
        // console.log('handleConsultationDetailClose state=', this.state);
        this.setState({ showConsultationDetail: false });
    }

    addConsultation = () => {
        const newConsultationData = consultation;
        newConsultationData.basicInfo.dateOfConsultation = Date.now();  //???? WHY THIS IS NOT WORKING ???
        // console.log("addConsultation newConsultationData=", newConsultationData);

        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };

        axios
            .post('/api/consultation/' + this.props.clientId, newConsultationData)
            .then((response) => {
                // console.log('addConsultation success response:', response.data);
                // this.props.history.push('/consultations');
            })
            .catch((error) => {
                console.log('addConsultation error:', error.response.data);
                this.setState({
                    errors: error.response.data,
                });
                // this.props.history.push('/consultations');
            });
    };

    //--- Retrieve client info
    componentDidMount = () => {
        this.setState({ uiLoading: true });
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };

        axios
            .get('/api/consultations/' + this.props.clientId)
            .then((response) => {
                // console.log('Consultations success response:', response.data);
                this.setState({ consultations: response.data,
                    uiLoading: false });
                // console.log('Consultations state:', this.state);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 403) {
                    console.log('Consultations error:', error.response.data);
                    this.props.history.push('/login');
                }
                // this.setState({
                //     uiLoading: false
                // });
            });
    };

    render() {
        if (this.state.uiLoading === true) {
            return (
                <div>
                    Loading ...
                </div>
            );
        } else {
            return (
                <Container component="main">
                    {!this.state.showConsultationDetail?
                        <div className='p-2 my-2 border'>
                            <h1> Consultations </h1>
                            <Button variant="primary" onClick={this.addConsultation} >Add Consultation</Button>

                            <ConsultationTable clientId={this.props.clientId}
                                consultations={this.state.consultations} 
                                onConsultationRowSelected={this.handleConsultationRowSelected}/>
                        </div>
                        :
                        <div>
                            { this.state.selectedConsultationId == ''?
                                <h2> Please select a consultation or create a new one </h2>
                                : 
                                <ConsultationDetail clientId={this.props.clientId}
                                    gender={this.props.gender}
                                    consultationId={this.state.selectedConsultationId} 
                                    consultationDetail={this.state.consultationDetail}
                                    onConsultationDetailClose={this.handleConsultationDetailClose}/>
                            }
                        </div>
                    }   
                </Container>
            );
        }
    }
}

export default Consultations;