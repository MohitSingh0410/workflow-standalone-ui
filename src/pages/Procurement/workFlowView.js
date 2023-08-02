import * as React from 'react';
import WorkFlow from '../../components/WorkFlowCommonComponent';
import { ActorList } from '../../commonDS';
export class WorkFlowView extends React.Component {
	awsHelper;
	constructor(props) {
		super(props);
		this.state = {
			activeStage: 0,
			usecaseDevelopment: {
				specs: [],
				usecaseName: '',
				selectActors: ActorList,
				description: '',
				tigger: '',
				preConditions: '',
				postConditions: '',
				usecaseFlow: '',
				prototypeLink: '',

			},
			selectedUseCaseData: {},
			userList: [
				{ name: 'John', id: '1' },
				{ name: 'Smith', id: '2' },
				{ name: 'Rado', id: '3' },
				{ name: 'Smyten', id: '4' },
				{ name: 'Oliver', id: '5' },
				{ name: 'Harry', id: '6' },
				{ name: 'George', id: '7' },
				{ name: 'Jack', id: '8' }
			],
		};
	}

	setUseCaseData = (entireUseCaseData) => {
		const { usecaseDevelopment } = this.state
		if (entireUseCaseData.stepinput.stages && entireUseCaseData.stepinput.stages.length > 0) {
			if (entireUseCaseData.stepinput.stages[0] && !entireUseCaseData.stepinput.stages[0].usecaseDevelopment) {
				entireUseCaseData.stepinput.stages[0].usecaseDevelopment = usecaseDevelopment
			}
			this.setState({
				selectedUseCaseData: entireUseCaseData
			});
		}
	}

	updateStep = (selectedUseCaseData, activeStageIndex) => {
		selectedUseCaseData.stepinput.stages[activeStageIndex].index = selectedUseCaseData.stepinput.stages[activeStageIndex].index ?
			selectedUseCaseData.stepinput.stages[activeStageIndex].index : activeStageIndex;
		let useCaseStageAndName = {
			usecaseName: selectedUseCaseData.usecaseName,
			stageData: selectedUseCaseData.stepinput.stages[activeStageIndex]
		};

		this.setState({
			selectedUseCaseData
		});
		this.props.UpdateUseCaseStages(selectedUseCaseData);
		this.props.updateWorkflowSingleStage(useCaseStageAndName)
	};


	render() {
		const { selectedUseCaseData, activeStage } = this.state;
		return (<React.Fragment>
			<div className="workflow-content">

				<WorkFlow selectedUseCaseData={selectedUseCaseData} activeStage={activeStage} editFormData={false} updateStep={this.updateStep} meta={this.props.meta} />

			</div>
		</React.Fragment>
		);
	}
}

export default WorkFlowView;
