import { SCROLLBAR_WIDTH, WAIFU_THEME } from "./constants";
import { IWeebLog } from "./interfaces";
import { IWeebRequiredLoggerConfig } from "./types";

class WeebLoggerCanvasHandler {
  private config: IWeebRequiredLoggerConfig;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private y: number;

  constructor(config: IWeebRequiredLoggerConfig, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.config = config;
    this.y = config.containerStyle.lineHeight;

    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // @description: wrapText wraps HTML canvas text onto a canvas of fixed width
  // @param ctx - the context for the canvas we want to wrap text on
  // @param text - the text we want to wrap.
  // @param x - the X starting point of the text on the canvas.
  // @param y - the Y starting point of the text on the canvas.
  // @param maxWidth - the width at which we want line breaks to begin - i.e. the maximum width of the canvas.
  // @param lineHeight - the height of each line, so we can space them below each other.
  // @returns an array of [ lineText, x, y ] for all lines

  private wrapText(text: string, x: number, maxWidth: number) {
    let y = this.y;
    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
    let words = text.split(' ');
    let line = ''; // This will store the text of the current line
    let testLine = ''; // This will store the text when we add a word, to test if it's too long
    let lineArray: Array<{ line: string, x: number, y: number }> = []; // This is an array of lines, which the function will return

    // Lets iterate over each word
    for (var n = 0; n < words.length; n++) {
      // Create a test line, and measure it..
      testLine += `${words[n]} `;
      let metrics = this.ctx.measureText(testLine);
      let testWidth = metrics.width;
      // If the width of this test line is more than the max width
      if (testWidth > maxWidth && n > 0) {
        // Then the line is finished, push the current line into "lineArray"
        lineArray.push({ line: n === words.length -1 ? line.slice(0, -1) : line, x, y });
        // Increase the line height, so a new line is started
        y += this.config.containerStyle.lineHeight;
        // Update line and test line to use this word as the first word on the next line
        line = `${words[n]} `;
        testLine = `${words[n]} `;
      }
      else {
        // If the test line is still less than the max width, then add the word to the current line
        line += `${words[n]} `;
      }
      // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
      if (n === words.length - 1) {
        lineArray.push({ line: line.slice(0, -1), x, y });
      }
    }

    // Return the line array
    return lineArray;
  }

  private resizeCanvasToDisplaySize() {
    const { width, height } = this.canvas!.getBoundingClientRect()

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = this.config.containerStyle.width - SCROLLBAR_WIDTH - 40; // 40 margin
      this.canvas.height = height;
      return true // here you can return some usefull information like delta width and delta height instead of just true
      // this information can be used in the next redraw...
    }

    return false
  }

  private predraw() {
    this.ctx.save();
    this.resizeCanvasToDisplaySize();
    const { width, height } = this.ctx.canvas
    this.ctx.clearRect(0, 0, width, height)
  };

  private postdraw() {
    this.ctx.restore()
  };

  private getCanvasHeight(logs: Array<IWeebLog>) {
    this.y = this.config.containerStyle.lineHeight;
    let height = 40;
    const width = this.canvas.width;
    this.ctx.font = "14px Consolas";
    for (let i = 0; i < logs.length; i++) {
      const log = logs[i];
      for (let j = 0; j < log.message.length; j++) {
        const wrappedText = this.wrapText(j === 0 ? `${log.dateStr}${log.label}${log.message[j]}` : log.message[j], 5, width - 30); // -30: scrollbar 10, padding: 20
        for (let k = 0; k < wrappedText.length; k++) {
          height += this.config.containerStyle.lineHeight;
        }
      }
    }
    return height;
  }

  private drawLog(log: IWeebLog) {
    const textColor = WAIFU_THEME[this.config.waifu.name].textColor;
    this.ctx.font = "14px Consolas";
    this.ctx.fillStyle = textColor;
    this.ctx.save();
    const width = this.canvas.width;
    
    for (let i = 0; i < log.message.length; i++) {
      const wrappedText = this.wrapText(i === 0 ? `${log.dateStr}${log.label}${log.message[i]}` : log.message[i], 5, width - 30); // -30: scrollbar 10, padding: 20
      for (let j = 0; j < wrappedText.length; j++) {
        const line = wrappedText[j].line;
        let x = wrappedText[j].x;
        const y = wrappedText[j].y;
        const text = line.split(log.label);
      
        this.ctx.fillStyle = textColor;
        this.ctx.fillText(text[0], x, y);
        x += this.ctx.measureText(text[0]).width;

        if (text.length > 1) {
          this.ctx.fillStyle = log.color;
          this.ctx.fillText(log.label, x, y);
          x += this.ctx.measureText(log.label).width;
          
          this.ctx.fillStyle = textColor;
          this.ctx.fillText(text[1], x, y);
        }
        
        this.y += this.config.containerStyle.lineHeight;
      }
    }

    this.ctx.restore();
  }

  private draw(logs: Array<IWeebLog>) {
    this.y = this.config.containerStyle.lineHeight;

    for (let i = 0; i < logs?.length; i++) {
      this.drawLog(logs[i]);
    }
  };

  public render(logs: Array<IWeebLog>) {
    this.canvas.height = this.getCanvasHeight(logs);
    
    this.predraw();
    this.draw(logs);
    this.postdraw();
  };
}

export default WeebLoggerCanvasHandler;
