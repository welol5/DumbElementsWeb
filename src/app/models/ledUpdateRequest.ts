export class LedUpdateRequest {
    public name: String;
    public ledsToUpdate: BulkLEDUpdate;

    constructor(name: String, ledsToUpdate: BulkLEDUpdate) {
        this.name = name;
        this.ledsToUpdate = ledsToUpdate;
    }
}

export class BulkLEDUpdate {
    public status: LEDUpdate[];

    constructor(status: LEDUpdate[]) {
        this.status = status;
    }
}

export class LEDUpdate {
    public ledStart: number;
    public ledEnd: number;
    public r: number;
    public g: number;
    public b: number;

    constructor(ledStart = 0, ledEnd = 0, r = 0, g = 0, b = 0) {
        this.ledStart = ledStart;
        this.ledEnd = ledEnd;
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

export class LEDAnimation {
    public r = '';
    public g = '';
    public b = '';

    constructor(r: string, g: string, b: string){
        this.r = r;
        this.g = g;
        this.b = b;
    }
}