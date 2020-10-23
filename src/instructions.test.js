const CPU = require('./cpu.js');
const RAM = require('./ram.js');

test('Sum two numbers', () => {
	const prog = 
`
001:	TAKE	010
002:	ADD	011
003:	SAVE	012
004:	HLT	000
`;

	var ram = new RAM();
	var cpu = new CPU(ram);

	ram.set(10, 1);
	ram.set(11, 2);
	cpu.exec(prog);
	result = ram.get(12);

	expect(result).toBe(3);
});
