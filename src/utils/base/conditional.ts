interface conditionalProps {
	condition: boolean;
	whenTrue: React.ReactNode;
	whenFalse: React.ReactNode;
}

export const conditional = ({ condition, whenTrue, whenFalse }: conditionalProps) => (condition ? whenTrue : whenFalse);
