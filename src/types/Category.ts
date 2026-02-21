export interface CategoryData {
	id: number,
	name: string;
}

export interface Category {
	id: number,
	name: string;
}

export function mapDataToCategory(data: CategoryData): Category {
	return {
		id: data.id,
		name: data.name
	};
}