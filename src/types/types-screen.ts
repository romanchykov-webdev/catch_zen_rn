interface Item {
	id: number | string;
	title: string;
	duration: string;
	color: string[];
	image?: string;
	sound?: string;
}

export interface CardListProps {
	data: Item[];
}
