import React from 'react';
import SimpleBar from 'simplebar-react';
import CommonMatrixViewComponent from '../CommonMatrixViewComponent';
import { StageStatus } from '../../commonDS';
import 'simplebar/dist/simplebar.min.css';
class AssetOverViewReusableComp extends React.Component{
    matrixDataName;
    constructor(props) {
        super(props)
        this.state = {
            AssetOverViewPropsData: {
                usecaseStageList: [],
                usecasename: "",
                matrixView: false
            },

            activeModelName: '',
        }
        this.matrixDataName = [
            "Create Usecase Document",
            "Create Screen Design"
        ]
    }
    componentDidMount() {
        const { AssetOverViewPropsData } = this.state
        Object.keys(this.props.AssetOverViewPropsData).map((key, index) => {
            AssetOverViewPropsData[key] = this.props.AssetOverViewPropsData[key] ? this.props.AssetOverViewPropsData[key] : ''
        })
        this.setState({ AssetOverViewPropsData })
    }
    componentDidUpdate(prevProps, prevState) {
        const { AssetOverViewPropsData } = this.state
        if (this.props.AssetOverViewPropsData !== prevProps.AssetOverViewPropsData) {
            Object.keys(this.props.AssetOverViewPropsData).map((key, index) => {
                AssetOverViewPropsData[key] = this.props.AssetOverViewPropsData[key] ? this.props.AssetOverViewPropsData[key] : ''
            })
            this.setState({ AssetOverViewPropsData })
        }
    }
    handleDisplayMatrixView = (modelName) => {
        let { activeModelName, matrixView } = this.state;
        this.props.toggleMatrixView()
        activeModelName = modelName ? modelName : ''
        this.setState({
            matrixView: !matrixView, activeModelName
        })
    }

    checkValuesValidation = (value) => {
        let valuesPresent = 0
        let retdata;
        if (value.length <= 0) {
            retdata = <React.Fragment />
        } else if (value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                let obj = value[i]
                let res = 0
                for (const objKey of Object.keys(obj)) {

                    if (obj[objKey]) {
                        res++
                    }

                }
                if (Object.keys(obj).length === res) {
                    valuesPresent++
                }
            }
        }
        if (valuesPresent === value.length) {
            retdata = StageStatus.COMPLETED;
        }
        else if (valuesPresent > 0 && valuesPresent < value.length) {
            retdata = StageStatus.INPROGRESS;
        }
        else {
            retdata = StageStatus.TODO;
        }
        return retdata;
    }
    displayUsecaseList = (stageList) => {
        let retData = [];
        if (stageList && stageList.length > 0) {
            for (let i = 0; i < stageList.length; i++) {
                let row = stageList[i];
                retData.push(
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4" key={`${i}_stage_list`}>
                        <div
                            className={
                                `receive-rfq-box  ${this.checkValuesValidation(row.workflowCheckList)}`
                            }
                        >
                            <div className="receive-number">{i + 1}</div>
                            <div className="heading">
                                <h5>{row.name}</h5>
                            </div>
                            <SimpleBar style={{ maxHeight: 145 }}>
                                <ul>{this.displaySteps(row.details)}</ul>
                            </SimpleBar>
                        </div>
                    </div>
                );
            }
        }
        return retData;
    };

    displaySteps = (step) => {
        const retStepData = [];
        if (step && step.length > 0) {
            for (let i = 0; i < step.length; i++) {
                retStepData.push(
                    <React.Fragment key={`${i}_workflow_checklist_step`}>
                        {/* <Link to="/a/xformation-workflow-engine/matrixView"> */}
                        {this.matrixDataName.includes(step[i].subStageName) ? <li
                            onClick={() => { this.handleDisplayMatrixView(step[i].subStageName === "Create Usecase Document" ? "usecaseDevelopment" : "designSpecs") }}
                            className={step[i].link !== '' ? 'active' : ''}>{step[i].subStageName}</li> : <li className={step[i].link !== '' ? 'active' : ''}>{step[i].subStageName}</li>}
                        {/* </Link> */}
                    </React.Fragment>
                );
            }
        }
        return retStepData;
    };

    render() {
        const { AssetOverViewPropsData, activeModelName } = this.state
        return (
            <React.Fragment>
                {!AssetOverViewPropsData.matrixView ? <React.Fragment>

                    {this.displayUsecaseList(AssetOverViewPropsData.usecaseStageList)}
                </React.Fragment> :
                    <CommonMatrixViewComponent activeModelName={activeModelName} usecasename={AssetOverViewPropsData.usecasename}
                        activeMatrixData={AssetOverViewPropsData.usecaseStageList[0].usecaseDevelopment} handleDisplayMatrixView={this.handleDisplayMatrixView} />
                }

            </React.Fragment>
        )
    }
}

export default AssetOverViewReusableComp;