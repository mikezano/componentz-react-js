import React, { PureComponent } from "react";
import "./DropdownCheckboxes.scss";

if (!Element.prototype.matches) {
	Element.prototype.matches =
		Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
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

class DropdownCheckboxes extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			items: [{ id: -1, name: "All", isChecked: false }, ...props.items],
			onDropdownClosed: props.onDropdownClosed,
			selectedCount: "",
			selectedItems: [],
			isShowing: false
		};
	}

	componentDidMount() {
		//get the selected items from local

		const storedSelectedItems = JSON.parse(localStorage.getItem("selectedItems"));
		if (storedSelectedItems != null) {
			const updatedItems = this.state.items.map(i => {
				const isInLocalStorage = storedSelectedItems.filter(s => s.id === i.id).length > 0;
				if (isInLocalStorage) {
					i.isChecked = true;
				}
				return i;
			});

			this.setState({
				selectedItems: storedSelectedItems,
				items: updatedItems
			});

			this.state.onDropdownClosed(storedSelectedItems);
		}
	}

	saveToLocalStorage() {
		this.setState(state => {
			localStorage.setItem("selectedItems", JSON.stringify(state.selectedItems));
		});
	}

	toggleAllItems(isChecked) {
		const allToggled = this.state.items.map(i => {
			return { ...i, isChecked };
		});
		this.setState({
			selectedItems: isChecked ? allToggled : [],
			items: allToggled,
			selectedCount: isChecked ? "All" : "0"
		});
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
			const indexOfParent = this.state.selectedItems.map(i => i.id).indexOf(item.parentId);
			updatedSelectedItems.splice(index, 1);
			if (indexOfParent >= 0) updatedSelectedItems.splice(indexOfParent, 1);
		}
		this.setState({ items: updatedItems, selectedItems: updatedSelectedItems });
	}

	toggleItem(event) {
		const element = event.target;
		const isChecked = element.checked;
		const id = element.getAttribute("id") - 0; //magic
		const item = this.state.items.filter(x => x.id === id)[0];

		if (item.name !== "All") {
			this.toggleSingleItem(item, isChecked);
		}

		if (item.name === "All") {
			this.toggleAllItems(isChecked);
		}
		//this method guarantees we get the most recent version of state
		this.saveToLocalStorage();
	}

	turnOff(event, _this) {
		const result = event.target.closest(".drop-down-checkboxes__list");

		if (result != null) return;

		_this.setState({ isShowing: false });
		document.body.removeEventListener("click", e => this.turnOff(e, this));

		this.state.onDropdownClosed(this.state.selectedItems);
	}

	toggleList() {
		const nextShowState = !this.state.isShowing;
		const _this = this;

		const methodForRemoval = event => {
			const result = event.target.closest(".drop-down-checkboxes__list");

			if (result != null) return;
			_this.setState({ isShowing: false });
			document.body.removeEventListener("click", methodForRemoval);

			this.state.onDropdownClosed(this.state.selectedItems);
		};

		if (nextShowState === true) {
			document.body.addEventListener("click", methodForRemoval);
		}

		this.setState({ isShowing: nextShowState });
	}

	render() {
		const x = "drop-down-checkboxes";
		return (
			<div className={x}>
				<div className={`${x}__selected`} onClick={() => this.toggleList()}>
					Location ({this.state.selectedItems.length}) <i className="caret" />
				</div>
				<ul className={`${x}__list ${this.state.isShowing ? `${x}__list--active` : ""}`}>
					{this.state.items.map(item => {
						return (
							<li className={`${x}__item`} key={item.id}>
								<label htmlFor={item.id} className={`${x}__item-label`}>
									<input
										type="checkbox"
										id={item.id}
										name={item.id}
										onChange={e => this.toggleItem(e)}
										checked={item.isChecked}
										className={`${x}__checkbox `}
									/>
									<span>{item.name}</span>
								</label>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default DropdownCheckboxes;
