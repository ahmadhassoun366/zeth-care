import {
	flip,
	offset,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react';
import { useRef, useState } from 'react';

type Options = {
	id: number;
	label: string;
	value: string;
};

type DropdownProps = {
	className?: string;
	options: Options[];
	optionComponent?: any;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 *
 * @param {options} -> {id: number, label: string, value: string, ...rest}
 * @returns a dropdown component
 */

function defaultOption({ item }: { item: any }) {
	return <div>{item.label}</div>;
}

export default function Dropdown({
	className = '',
	options,
	optionComponent: Option = defaultOption,
	...rest
}: DropdownProps) {
	const selectRef = useRef<HTMLSelectElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const { value, disabled } = rest;

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			offset(10),
			flip(),

			// arrow({ element: arrowRef })
		],
	});

	const dismiss = useDismiss(context);
	const click = useClick(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

	function handleOptionClick(option: any) {
		// programatically select the option for the native select element
		// and dispatch a change event
		selectRef.current!.value = option.value;

		const event = new Event('change', { bubbles: true });
		selectRef.current!.dispatchEvent(event);

		setIsOpen(false);
	}

	const selectedOption = options.find((option) => option.value === value);

	// const handleKeyDown = (e) => {
	// 	if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
	// 		setIsOpen(true);
	// 		return;
	// 	}

	// 	if (isOpen) {
	// 		if (e.key === 'ArrowDown') {
	// 			e.preventDefault(); // Prevent scrolling
	// 			setHighlightedIndex((prevIndex) =>
	// 				prevIndex === options.length - 1 ? 0 : prevIndex + 1
	// 			);
	// 		} else if (e.key === 'ArrowUp') {
	// 			e.preventDefault();
	// 			setHighlightedIndex((prevIndex) =>
	// 				prevIndex === 0 ? options.length - 1 : prevIndex - 1
	// 			);
	// 		} else if (e.key === 'Enter') {
	// 			// Select the highlighted option on Enter key
	// 			console.log('Selected:', options[highlightedIndex]);
	// 			setOpen(false);
	// 		} else if (e.key === 'Escape') {
	// 			setOpen(false);
	// 		}
	// 	}
	// };

	return (
		<div className="dropdown-c relative space-y-2" ref={dropdownRef}>
			{/* HIDDEN NATIVE SELECT */}
			<select className="hidden" {...rest} ref={selectRef}>
				<option value=""></option>
				{options.map((option, idx) => (
					<option key={idx} value={option.value}>
						{option.label}
					</option>
				))}
			</select>

			{/* DROPDOWN BUTTON */}
			<button
				className={`dropdown_button colors flex justify-between items-center ${className}`}
				type="button"
				disabled={disabled}
				{...getReferenceProps()}
				ref={refs.setReference}
			>
				<div>{selectedOption ? <Option item={selectedOption} /> : 'Please select'}</div>
				<h6 className="text-agrey-500 dark:text-agrey-600">
					<i className={`fa-lg fa-solid fa-angle-${isOpen ? 'up' : 'down'} `} />
				</h6>
			</button>

			{isOpen && (
				<ul
					ref={refs.setFloating}
					{...getFloatingProps()}
					style={floatingStyles}
					className="shadow_dropdown rounded-xl bg-white dark:bg-abrandc-dark-blackish absolute top-11 left-0 w-full overflow-hidden z-[2] max-h-[200px] overflow-y-auto scroll scroll-sm "
				>
					<div className="">
						{options.map((option) => (
							<li key={option.id} onClick={() => handleOptionClick(option)}>
								<button
									type="button"
									className={`dropdown_option ${
										value === option.value ? 'active' : ''
									}`}
								>
									<Option item={option} />
								</button>
							</li>
						))}
					</div>
				</ul>
			)}
		</div>
	);
}
