class Tool{
    protected strength: number = 100;
    public action(): void{
        if( this.strength>0){
            this.strength -= 10
            console.log(`Инструмент используется. Прочность: ${this.strength}`);
        } else {
            console.log("Инструмент сломан и не может быть использован.");            
        }
    }
    public isBroken(): boolean{
        return this.strength <= 0
    }
}
class Saw extends Tool{
    public action(): void{
        if(!this.isBroken()){
            super.action();
            console.log("Пила: ZZZZZZZZZZ");
        }
    }
}
class Axe  extends Tool{
    public action(): void{
        if(!this.isBroken()){
            super.action();
            console.log("Топор: Чик-Чик");
        }
    }
}
class Drill  extends Tool{
    public action(): void{
        if(!this.isBroken()){
            super.action();
            console.log("Дрель: Вжжжжж");
        }
    }
}
class Hammer  extends Tool{
    public action(): void{
        if(!this.isBroken()){
            super.action();
            console.log("Молоток: Бах-Бах");
        }
    }
}
class Screwdriver  extends Tool{
    public action(){
        if(!this.isBroken()){
            super.action();
            console.log("Шуруповёрт: Винт-Винт");
        }
    }
}


class Robot {
    public tool: Tool | null = null
    public setupTool(tool: Tool): void{
        this.tool = tool
        console.log("Инструмент установлен на робота.");
    }
    public drop_tool(): void{
        if(this.tool){
            console.log("Инструмент снят с робота.");
            this.tool = null
        }else{
            console.log("На роботе нет инструмента.");
        }
    }
    public action(): void {
        if (!this.tool) {
            console.log("Робот не оснащен инструментом.");
        } else if (this.tool.isBroken()) {
            console.log("Инструмент сломан и не может быть использован.");
        } else {
            this.tool.action();
        }
    }
}


const robot = new Robot();
const saw = new Saw();
const hammer = new Hammer();

robot.setupTool(saw);
robot.action(); 
robot.action(); 

robot.drop_tool(); 
robot.setupTool(hammer); 
robot.action(); 

robot.drop_tool(); 
robot.action(); 