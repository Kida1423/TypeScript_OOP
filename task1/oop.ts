class tv {
    private currentChannel: number;
    private channelLimit: number = 50  
    constructor(currentChannel: number) {
        this.currentChannel = currentChannel;
    }

    public nextChannel() {
       this.currentChannel = this.currentChannel < this.channelLimit ? this.currentChannel + 1 : 1;
       return this.displayChannel()
    }

    public previousChannel() {
        this.currentChannel = this.currentChannel > 1 ? this.currentChannel - 1 : this.channelLimit
        return this.displayChannel()
    }

    public moveToChannel(channel: number) {
        this.currentChannel = channel
        return this.displayChannel()
    }

    public displayChannel() {
        console.log(`current channel : ${this.currentChannel}`);
        setTimeout(() => {
            tv3.handleInput();
        }, 500)    
    }

    public handleInput() {
        const input = prompt("change channel")
        if(input === ">"){
            this.nextChannel()
        }else if(input === "<"){
            this.previousChannel()
        } else {
                const channelNumber = parseInt(input || '1', 10);
                if (!isNaN(channelNumber)) {
                    this.moveToChannel(channelNumber);
                } else {
                    console.log("Неверный ввод. Попробуйте еще раз.");
                }    
        }
    }
}
let tv3: tv = new tv(10)

tv3.handleInput();

