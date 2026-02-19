
export interface CheckboxListItem {
	id: number,
	label: string,
	checked: boolean,
}
interface CheckboxListProps {
	items: CheckboxListItem[],
	onChange?: (item: CheckboxListItem[]) => void;
}
export default function CheckboxList({ items, onChange }: CheckboxListProps) {
	//const [itemList, setItemList] = useState<CheckboxListItem[]>(items);

	function handleChange(item: CheckboxListItem, checked: boolean) {
		const newList = items.map(element => {
			if (element.id === item.id) {
				return { ...item, checked: checked };
			} else {
				return element;
			}
		});
		onChange!(newList);
	}

	if (items.length === 0) return null;

	return (
		<div className="w-full h-full border border-neutral-200 rounded-3xl px-5 py-2 bg-white overflow-y-auto overflow-x-hidden">
			<div className="flex flex-col gap-1">
				{
					items.map(item => (
						<div key={item.id} className="w-full flex p-1 gap-2">
							<input
								type="checkbox"
								checked={item.checked}
								// onChange={(e) => handleChange(item, e.target.checked)}
								name={item.label.replace(/\s+/g, "")}
								id={item.label.replace(/\s+/g, "")}
								className="w-4 accent-brand-primary cursor-pointer"
								onChange={(e) => handleChange(item, e.target.checked)}
							/>
							<label htmlFor={item.label.replace(/\s+/g, "")}>{item.label}</label>
						</div>
					))

				}
			</div>
		</div>
	);
}
