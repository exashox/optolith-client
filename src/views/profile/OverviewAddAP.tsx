import * as React from 'react';
import * as ProfileActions from '../../actions/ProfileActions';
import { Dialog } from '../../components/Dialog';
import { TextField } from '../../components/TextField';
import { getLocale } from '../../stores/LocaleStore';
import { InputTextEvent } from '../../types/data.d';

interface Props {
	node?: HTMLDivElement;
}

interface State {
	value: string;
}

export class OverviewAddAP extends React.Component<Props, State> {
	state = {
		value: '',
	};

	onChange = (event: InputTextEvent) => this.setState({ value: event.target.value } as State);
	addAP = () => ProfileActions.addAdventurePoints(Number.parseInt(this.state.value));

	render() {

		const { value } = this.state;

		return (
			<Dialog
				id="overview-add-ap"
				title={getLocale()['addadventurepoints.title']}
				node={this.props.node}
				buttons={[
					{
						disabled: value === '' || !Number.isInteger(Number.parseInt(value)) || Number.parseInt(value) < 1,
						label: getLocale()['addadventurepoints.actions.add'],
						onClick: this.addAP,
					},
					{
						label: getLocale()['addadventurepoints.actions.cancel'],
					},
				]}
				>
				<TextField
					hint={getLocale()['addadventurepoints.options.adventurepoints']}
					value={value}
					onChange={this.onChange}
					fullWidth
					/>
			</Dialog>
		);
	}
}
