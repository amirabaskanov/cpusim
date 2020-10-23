class RAM {
	constructor() {
		this.data = [];
		for(var i=0; i<1000; i++) {
			this.data[i] = 0;
		}
	}

	get(address) {
		return this.data[address];
	}

	set(address, value) {
		this.data[address] = value;
	}
}

module.exports = RAM;
