class CPU {
	constructor(ram) {
		this.ram = ram;
		this.reset();
	}

	reset() {
		this.accumulator = 0;
		this.registry = 0;
		this.counter = 0;
		this.microcode = [];
	}

	exec(prog) {
		this.parse(prog);
		this.run();
	}

	run() {
		for(var i=1; i<this.microcode.length; i++) {
			this.counter = i;
			this.execCommand();
		}
	}

	execCommand() {
		var command = this.microcode[this.counter];
		if (command.instruction == 'TAKE') {
			this.accumulator = this.ram.get(command.argument);
		} else if (command.instruction == 'ADD') {
			this.accumulator += this.ram.get(command.argument);
		} else if (command.instruction == 'SAVE') {
			this.ram.set(command.argument, this.accumulator);
		} else if (command.instruction == 'HLT') {
			this.reset();
		}
	}

	parse(prog) {
		var lines = prog.split("\n");
		for(var i=0; i<lines.length; i++) {
			var line = lines[i];
			if (line == '') continue;

			var parts = line.split("\t");
			if (parts.length != 3) {
				throw new Error('Invalid command: ' + line);
			}

			var index = parseInt(parts[0].replace(':', ''));
			var instruction = parts[1];
			var argument = parseInt(parts[2]);

			this.microcode[index] = {
				instruction,
				argument
			}
		}
	}
}

module.exports = CPU;
