import React, { PureComponent } from 'react';
import './DropdownHierarchyCheckbox.scss';
//const elementClosest = require("element-closest");

if (!Element.prototype.matches) {
	Element.prototype.matches =
		Element.prototype.msMatchesSelector ||
		Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;

		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}

class DropdownHierarchyCheckbox extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			items: [
				{ id: -1, parentId: -1, name: 'All', isChecked: false },
				...props.items,
			],
			onDropdownClosed: props.onDropdownClosed,
			selectedCount: '',
			selectedItems: [],
			isShowing: false,
		};
	}

	componentDidMount() {
		//get the selected items from local

		const storedSelectedItems = JSON.parse(
			localStorage.getItem('selectedItems'),
		);
		if (storedSelectedItems != null) {
			const updatedItems = this.state.items.map(i => {
				const isInLocalStorage =
					storedSelectedItems.filter(s => s.id === i.id).length > 0;
				if (isInLocalStorage) {
					i.isChecked = true;
				}
				return i;
			});

			this.setState({
				selectedItems: storedSelectedItems,
				items: updatedItems,
			});

			this.state.onDropdownClosed(storedSelectedItems);
		}
	}

	saveToLocalStorage() {
		this.setState(state => {
			localStorage.setItem(
				'selectedItems',
				JSON.stringify(state.selectedItems),
			);
		});
	}

	toggleAllItems(isChecked) {
		const allToggled = this.state.items.map(i => {
			return { ...i, isChecked };
		});
		this.setState({
			selectedItems: isChecked ? allToggled : [],
			items: allToggled,
			selectedCount: isChecked ? 'All' : '0',
		});
	}

	toggleParentItems(item, isChecked) {
		let childItems = this.state.items.filter(i => i.parentId === item.id);
		childItems.unshift(item);
		childItems = childItems.map(i => {
			return { ...i, isChecked };
		});

		const updatedItems = this.state.items.map(i => {
			//last condition will uncheck 'all'
			if (
				i.parentId === item.id ||
				i.id === item.id ||
				(i.id === -1 && !isChecked)
			)
				i.isChecked = isChecked;
			return i;
		});

		let nextSelectedItems = [];
		if (isChecked) {
			const newAdditions = childItems.filter(
				i => this.state.selectedItems.filter(s => s.id == i.id) >= 0,
			);
			nextSelectedItems = [...this.state.selectedItems, ...newAdditions];
		} else {
			const prevSelectedItems = [...this.state.selectedItems];
			nextSelectedItems = prevSelectedItems.filter(item => {
				//means you couldn't find previous item in the set of unchecked
				return childItems.filter(r => r.id === item.id).length === 0;
			});
		}
		this.setState({ selectedItems: nextSelectedItems, items: updatedItems });
	}

	toggleSingleItem(item, isChecked) {
		const updatedItems = this.state.items.map(i => {
			if (
				i.id === item.id ||
				(i.parentId === item.id && !isChecked) || //Region item
				(i.id === -1 && !isChecked) //All item
			)
				i.isChecked = isChecked;
			return i;
		});

		const updatedSelectedItems = [...this.state.selectedItems];

		if (isChecked) {
			updatedSelectedItems.push(item);
		} else {
			const index = this.state.selectedItems.map(i => i.id).indexOf(item.id);
			const indexOfParent = this.state.selectedItems
				.map(i => i.id)
				.indexOf(item.parentId);
			updatedSelectedItems.splice(index, 1);
			if (indexOfParent >= 0) updatedSelectedItems.splice(indexOfParent, 1);
		}
		this.setState({ items: updatedItems, selectedItems: updatedSelectedItems });
	}

	toggleItem(event) {
		const element = event.target;
		const isChecked = element.checked;
		const id = element.getAttribute('id') - 0; //magic
		const item = this.state.items.filter(x => x.id === id)[0];

		if (item.parentId === null && item.name !== 'All') {
			this.toggleParentItems(item, isChecked);
		} else {
			this.toggleSingleItem(item, isChecked);
		}

		if (item.name === 'All') {
			this.toggleAllItems(isChecked);
		}
		//this method guarantees we get the most recent version of state
		this.saveToLocalStorage();
	}

	turnOff(event, _this) {
		const result = event.target.closest('.dropdown__list');

		if (result != null) return;

		_this.setState({ isShowing: false });
		document.body.removeEventListener('click', e => this.turnOff(e, this));

		this.state.onDropdownClosed(this.state.selectedItems);
	}

	toggleList() {
		const nextShowState = !this.state.isShowing;
		const _this = this;

		const methodForRemoval = event => {
			const result = event.target.closest('.dropdown__list');

			if (result != null) return;
			_this.setState({ isShowing: false });
			document.body.removeEventListener('click', methodForRemoval);

			this.state.onDropdownClosed(this.state.selectedItems);
		};

		if (nextShowState === true) {
			document.body.addEventListener('click', methodForRemoval);
		}

		this.setState({ isShowing: nextShowState });
	}

	render() {
		return (
			<div className="dropdown">
				<div className="dropdown__selected" onClick={() => this.toggleList()}>
					Location ({this.state.selectedItems.length}) <i className="caret" />
				</div>
				<ul
					className={`dropdown__list ${
						this.state.isShowing ? 'dropdown__list--active' : ''
					}`}
				>
					{this.state.items.map(item => {
						return (
							<li className="dropdown__item" key={item.id}>
								<label
									htmlFor={item.id}
									className={`dropdown__item-label ${
										item.parentId === null
											? 'dropdown__item--parent'
											: 'dropdown__item--child'
									}`}
								>
									<input
										type="checkbox"
										id={item.id}
										name={item.id}
										onChange={e => this.toggleItem(e)}
										checked={item.isChecked}
										className={`dropdown__checkbox `}
									/>
									<span>
										{item.name
											.replace(/&nbsp;/g, ' ')
											.replace('<b>', '')
											.replace('</b>', '')}
									</span>
								</label>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default DropdownHierarchyCheckbox;
