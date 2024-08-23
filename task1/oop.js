var tv = /** @class */ (function () {
    function tv(currentChannel) {
        this.channelLimit = 50;
        this.currentChannel = currentChannel;
    }
    tv.prototype.nextChannel = function () {
        this.currentChannel = this.currentChannel < this.channelLimit ? this.currentChannel + 1 : 1;
        return this.displayChannel();
    };
    tv.prototype.previousChannel = function () {
        this.currentChannel = this.currentChannel > 1 ? this.currentChannel - 1 : this.channelLimit;
        return this.displayChannel();
    };
    tv.prototype.moveToChannel = function (channel) {
        this.currentChannel = channel;
        return this.displayChannel();
    };
    tv.prototype.displayChannel = function () {
        console.log("current channel : ".concat(this.currentChannel));
        setTimeout(function () {
            tv3.handleInput();
        }, 500);
    };
    tv.prototype.handleInput = function () {
        var input = prompt("change channel");
        if (input === ">") {
            this.nextChannel();
        }
        else if (input === "<") {
            this.previousChannel();
        }
        else {
            var channelNumber = parseInt(input || '1', 10);
            if (!isNaN(channelNumber)) {
                this.moveToChannel(channelNumber);
            }
            else {
                console.log("Неверный ввод. Попробуйте еще раз.");
            }
        }
    };
    return tv;
}());
var tv3 = new tv(10);
tv3.handleInput();
