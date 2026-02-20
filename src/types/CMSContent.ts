export interface CMSContentItemData {
	element_id: string;
	text_content: string;
}

export interface CMSContentItem {
	elementId: string;
	textContent: string;
}

export function mapDataToCMSContentItem(data: CMSContentItemData): CMSContentItem {
	return {
		elementId: data.element_id,
		textContent: data.text_content,
	};
}