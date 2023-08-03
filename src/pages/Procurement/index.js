import * as React from 'react';
// import { Breadcrumbs } from '../Breadcrumbs';
import { AssetView } from './assetView';
import { OverView } from './overView';
import WorkFlowView from './workFlowView';
import headerIcon from '../../img/header-icon.png';
import 'react-circular-progressbar/dist/styles.css';
import 'simplebar/dist/simplebar.min.css';
import { Link } from 'react-router-dom';
import { AwsHelper } from '../AwsHelpers';
import AlertMessage from '../../components/AlertMessage';
import { meta } from "../../commonDS";
import withRouter from '../../components/withRoute';

class ProcurementDetail extends React.Component {
  breadCrumbs;
  stepper;
  awsHelper;
  overViewRef;
  workFlowRef;
  assetViewRef;
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      useCaseName: this.props.params.id,
      useCase: {},
      isAlertOpen: false,
      message: '',
      severity: ''
    };
    this.breadCrumbs = [
      {
        label: 'Home',
        route: `/`,
      },
      {
        label: 'Kubernetes | Overview',
        isCurrentPage: true,
      },
    ];
    this.awsHelper = new AwsHelper({ meta: meta });
    this.overViewRef = React.createRef();
    this.workFlowRef = React.createRef();
    this.assetViewRef = React.createRef();
    this.stepper = [
      { title: "Over View", key: 0, component: <OverView meta={props.meta} id={this.state.useCaseName} key={1} ref={this.overViewRef} /> },
      { title: "Workflow View", key: 1, component: <WorkFlowView id={this.state.useCaseName} key={2} ref={this.workFlowRef} updateWorkflowSingleStage={this.updateWorkflowSingleStage} UpdateUseCaseStages={this.UpdateUseCaseStages} meta={props.meta} /> },
      { title: "Asset View", key: 2, component: <AssetView id={this.state.useCaseName} key={3} ref={this.assetViewRef} /> }
    ]
  }

  async componentDidMount() {
    const { useCaseName } = this.state;
    this.awsHelper.getUsecaseInputData(this.props.params.id, (getUseCase) => {
      if (getUseCase) {
        this.setState({ useCase: getUseCase })
      }
    }, (err) => { if (err) { console.log(err) } })
  }

  componentDidUpdate() {
    const { useCase } = this.state;
    if (useCase) {
      if (useCase?.stepinput?.stages?.length > 0) {
        this.passValuesToChildWithRef(useCase)
      }
      else {
        this.props.history.push('/dashboard')
      }
    }

  }

  activeTab = (key) => {
    this.setState({ activeTab: key });
  }

  passValuesToChildWithRef = (selectedUseCase) => {
    if (this.overViewRef.current) {
      this.overViewRef.current.setUseCaseData(selectedUseCase);
    }
    if (this.workFlowRef.current) {
      this.workFlowRef.current.setUseCaseData(selectedUseCase);
    }
    if (this.assetViewRef.current) {
      this.assetViewRef.current.setUseCaseData(selectedUseCase);
    }
  }

  UpdateUseCaseStages = (data) => {
    this.setState({
      useCase: {
        ...data
      }
    });
  };

  updateWorkflowSingleStage = (usecaseData) => {
    let updateUseCaseStage = {
      usecaseName: usecaseData.usecaseName,
      stepinput: usecaseData.stageData
    };
    this.awsHelper.updateStageToDB(updateUseCaseStage, (err) => { console.log(err) }, (res) => {
      if (res) {
        this.setState({
          isAlertOpen: true,
          message: res.message,
          severity: 'success'
        })
      }
    })
  }
  handleCloseAlert = () => {
    this.setState({
      isAlertOpen: false,
      message: '',
      severity: ''
    })
  }

  render() {
    const { activeTab, useCase, isAlertOpen, severity, message } = this.state;
    return (
      <div className="owrkflow-procument-container">
        {/* <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="Usecase 1" /> */}
        <div className="procument-page-container">
          <div className="project-wise-page-heading">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <div className="heading-content-left">
                  <div className="heading-icon"><img src={headerIcon} alt="" /></div>
                  <div className="heading-content">
                    <h3>Xformation Platform</h3>
                    <span>Last updated by Siddhesh D 24 min ago</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <div className="heading-content-right">
                  <Link to={`/projectoverview`} className="btn-primary pro-overview-btn">Project Overview</Link>
                  <Link to="/projectwise" className="btn-primary pro-overview-btn"><i className="fa fa-chevron-left"></i> Back</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="procurement-details">
            <ul>
              {useCase && Object.keys(useCase).length > 0 &&
                this.stepper.map(({ title, key }, index) => {
                  return (
                    <li key={index} onClick={() => this.activeTab(key)} className={key === activeTab ? "active col-4 " : 'col-4'}>{title}</li>
                  )
                })
              }
            </ul>
          </div>
          <div className="tebs-inner-content">
            {useCase && Object.keys(useCase).length > 0 &&
              this.stepper.map(({ key, component }, index) => {
                return (
                  <div key={index}>
                    {activeTab === key ?
                      <>{component}</>
                      : <></>}
                  </div>
                )
              })
            }
          </div>
        </div>
        <AlertMessage
          handleCloseAlert={this.handleCloseAlert}
          open={isAlertOpen}
          severity={severity}
          msg={message}
        />
      </div>
    );
  }
}

export default withRouter(ProcurementDetail)