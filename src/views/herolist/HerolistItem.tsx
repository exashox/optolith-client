import * as React from 'react';
import { AvatarWrapper } from '../../components/AvatarWrapper';
import { IconButton } from '../../components/IconButton';
import { ListItem } from '../../components/ListItem';
import { ListItemButtons } from '../../components/ListItemButtons';
import { ListItemName } from '../../components/ListItemName';
import { ListItemSeparator } from '../../components/ListItemSeparator';
import { VerticalList } from '../../components/VerticalList';
import { DependentInstancesState } from '../../reducers/dependentInstances';
import { get } from '../../selectors/dependentInstancesSelectors';
import { ProfessionInstance, UIMessages, User } from '../../types/data.d';
import { _translate } from '../../utils/I18n';

export interface HerolistItemProps {
	currentHeroId?: string;
	dependent: DependentInstancesState;
	id?: string;
	name: string;
	ap: {
		spent: number;
		total: number;
	};
	avatar?: string;
	c?: string;
	p?: string;
	player?: User;
	pv?: string;
	r?: string;
	professionName?: string;
	sex?: 'm' | 'f';
	locale: UIMessages;
	loadHero(id?: string): void;
	saveHeroAsJSON(id?: string): void;
	showHero(): void;
	deleteHero(id?: string): void;
	duplicateHero(id?: string): void;
}

export function HerolistItem(props: HerolistItemProps) {
	const { player, id, currentHeroId, dependent, locale, name, avatar, ap: { spent: apSpent, total: apTotal }, r, c, p, pv, sex, professionName, loadHero, saveHeroAsJSON, showHero, deleteHero, duplicateHero } = props;
	const isOpen = id === currentHeroId;

	const rcpElement = id !== null && (
		<VerticalList className="rcp">
			<span className="race">
				{(() => {
					const { name } = r && get(dependent, r) || { name: '' };
					return name;
				})()}
			</span>
			<span className="culture">
				{(() => {
					const { name } = c && get(dependent, c) || { name: '' };
					return name;
				})()}
			</span>
			<span className="profession">
				{(() => {
					if (p === 'P_0') {
						return professionName || _translate(locale, 'professions.ownprofession');
					}
					let { name, subname } = p && get(dependent, p) as ProfessionInstance || { name: '', subname: undefined };
					if (typeof name === 'object' && sex) {
						name = name[sex];
					}
					if (typeof subname === 'object' && sex) {
						subname = subname[sex];
					}
					let { name: vname } = pv && get(dependent, pv) || { name: '' };
					if (typeof vname === 'object' && sex) {
						vname = vname[sex];
					}
					return name + (subname ? ` (${subname})` : pv ? ` (${vname})` : '');
				})()}
			</span>
			<span className="totalap">
				{apSpent} / {apTotal} AP
			</span>
		</VerticalList>
	);

	return (
		<ListItem>
			<AvatarWrapper src={avatar} />
			<ListItemName name={name} addName={player && player.displayName} large>
				{rcpElement}
			</ListItemName>
			<ListItemSeparator/>
			<ListItemButtons>
				{id && <IconButton icon="&#xE907;" onClick={duplicateHero.bind(null, id)} />}
				{id && <IconButton icon="&#xE914;" onClick={saveHeroAsJSON.bind(null, id)} />}
				{id && <IconButton icon="&#xE90b;" onClick={deleteHero.bind(null, id)} />}
				{(() => isOpen ? (
					<IconButton icon="&#xE919;" onClick={showHero} />
				) : (
					<IconButton icon="&#xE90e;" onClick={loadHero.bind(null, id)} />
				))()}
			</ListItemButtons>
		</ListItem>
	);
}
