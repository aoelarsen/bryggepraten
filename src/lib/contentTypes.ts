export interface Nyhet {
	id: string;
	tittel: string;
	image?: string;
	dato: string;
	body: string;
}

export interface Bok {
	tittel: string;
	slug?: string;
	image?: string;
	sjanger?: string;
	forfattere: string[];
	utgivelsesdato?: string;
	pris?: string;
	status?: string;
	body?: string;
}

export interface Kalender {
	tittel: string;
	tilvirkere?: string[];
	utgivelsesdato?: string;
	pris?: string;
	status?: string;
}

export interface UtgivelserData {
	utgivelser: {
		bryggepraten: Bok[];
		kalendere: Kalender[];
		andre_forfattere: Bok[];
	};
}

export type BokKategori = 'bryggepraten' | 'andre_forfattere';
