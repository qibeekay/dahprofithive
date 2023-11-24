export interface InputProp {
	type: any;
	value?: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
	// textarea?: boolean;
	id: string;
	placeholder: string;
	// big?: boolean;
}

export interface FormProp {
	type: string;
	value?: string;
	name: string;
	id: string;
	placeholder?: string;
	accept?: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
