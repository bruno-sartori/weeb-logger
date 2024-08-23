import chalk from 'chalk';
import { formatDate, getTimeDiff, isUndefined, isValidString, pxToRem } from './utils';
import { BORDER_RADIUS, CONTAINER_POSITION, SCROLLBAR_WIDTH } from './constants';
import WeebLoggerCanvasHandler from './CanvasHandler'

const isNode = typeof process === 'object' && `${process}` === '[object process]';

const initialConfig: IWeebLoggerConfig = {
  enabled: true,
  visual: false,
  containerStyle: {
    position: 'bottom-right',
    width: 800,
    height: 800,
    opacity: 1,
    lineHeight: 20,
  },
  waifu: 'alya'
}

class WeebLogger {
  private config: IWeebLoggerConfig = initialConfig;
  private logs: Array<IWeebLog> = [];

  private resizable?: HTMLDivElement;
  private container?: HTMLDivElement;
  private resizers?: HTMLDivElement;
  private canvas?: HTMLCanvasElement;

  private canvasHandler?: WeebLoggerCanvasHandler;

  private isLeftSide() {
    return this.config.containerStyle!.position === 'bottom-left' || 
    this.config.containerStyle!.position === 'top-left';
  }

  public configure(newConfig: IWeebLoggerConfig) {
    const config = {
      ...initialConfig,
      ...newConfig,
      containerStyle: {
        ...initialConfig.containerStyle!,
        ...newConfig.containerStyle || {}
      }
    };

    this.config = config;

    if (this.config.enabled && this.config.visual && document.getElementById('log-container') === null) {
      const css = `
        /* width */
        #log-container::-webkit-scrollbar {
          width: ${SCROLLBAR_WIDTH}px;
        }

        /* Track */
        #log-container::-webkit-scrollbar-track {
          background: #ccc; 
        }
        
        /* Handle */
        #log-container::-webkit-scrollbar-thumb {
          background: #888; 
        }

        /* Handle on hover */
        #log-container::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
        
        .resizable {
          overflow: hidden;
          backdrop-filter: blur(10px);
          position: fixed;
          width: ${pxToRem(this.config.containerStyle!.width)}; 
          height: ${pxToRem(this.config.containerStyle!.height)}; 
          z-index: 99999999;
          ${CONTAINER_POSITION[this.config.containerStyle!.position]}
        }

        #log-container {
          display: flex;
          align-items: flex-start;
          opacity: ${this.config.containerStyle!.opacity};
          overflow-y: scroll;
          direction: ${this.isLeftSide() ? 'rtl' : 'ltr'};
          background-color: rgba(0, 0, 0, 0.5);
          flex: 1;
          width: 100%;
          height: 100%;
          box-sizing: border-box;

          ${BORDER_RADIUS[this.config.containerStyle!.position]}
        }

        #log-canvas {
          direction: ltr;
          margin: 20px;
          z-index: 9999999999;
        }

        #weeb-logger-waifu {
          position: fixed;
          bottom: 0;
          right: 0;
          opacity: 0.5;
          z-index: 999999999;
        }

        .resizable .resizer {
          width: 20px;
          height: 20px;
          background: transparent;
          position: absolute;
          z-index: 99999999999;
        }

        .resizable .resizer.top-left {
          left: 0;
          top: 0;
          cursor: nwse-resize; /*resizer cursor*/
        }
        .resizable .resizer.top-right {
          right: 0;
          top: 0;
          cursor: nesw-resize;
        }
        .resizable .resizer.bottom-left {
          left: 0;
          bottom: 0;
          cursor: nesw-resize;
        }
        .resizable .resizer.bottom-right {
          right: 0;
          bottom: 0;
          cursor: nwse-resize;
        }
      `;

      const style = document.createElement('style');
      style.type = 'text/css';

      // @ts-ignore
      if (style?.styleSheet) { // This is required for IE8 and below.
        // @ts-ignore
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      const head = document?.head || document?.getElementsByTagName('head')?.[0];
      head.appendChild(style);

      const resizable = document.createElement('div');
      resizable.className = 'resizable';
      this.resizable = resizable;

      if (this.config.waifu == 'alya') {
        const img = document.createElement('img');
        img.src = new URL('assets/images/pixchan.webp', import.meta.url).toString();
        img.width = 200;
        img.height = 200;
        img.id = 'weeb-logger-waifu';

        this.resizable.appendChild(img);
      }

      switch (this.config.containerStyle!.position) {
        case 'top-right':
          const resizerBottomLeft = document.createElement('div');
          resizerBottomLeft.className = 'resizer bottom-left';
          this.resizable.appendChild(resizerBottomLeft);
          break;
        case 'top-left':
          const resizerBottomRight = document.createElement('div');
          resizerBottomRight.className = 'resizer bottom-right';
          this.resizable.appendChild(resizerBottomRight);
          break;
        case 'bottom-right':
          const resizerTopLeft = document.createElement('div');
          resizerTopLeft.className = 'resizer top-left';
          this.resizable.appendChild(resizerTopLeft);
          break;
        case 'bottom-left':
          const resizerTopRight = document.createElement('div');
          resizerTopRight.className = 'resizer top-right';
          this.resizable.appendChild(resizerTopRight);
          break;
      }

      const container = document.createElement('div');
      container.id = 'log-container';
      container.className = 'resizers';
      this.container = container;

      const canvas = document.createElement('canvas');
      canvas.id = 'log-canvas';
      canvas.width = this.config.containerStyle!.width - SCROLLBAR_WIDTH - 40;
      canvas.height = 20;
      this.canvas = canvas;

      this.container.appendChild(this.canvas);
      this.resizable.appendChild(this.container);

      const ctx = this.canvas.getContext('2d');

      if (!ctx) {
        this.warn('Weeb Logger', 'Unable to initialize WebGL. Your browser or machine may not support it.')
      } else {
        this.canvasHandler = new WeebLoggerCanvasHandler(this.config, this.canvas, ctx);
      }

      document.body.appendChild(this.resizable);

      this.makeResizableDiv();
    }
  }

  private makeResizableDiv() {
    if (this.resizable !== null) {
      const resizers: NodeListOf<HTMLDivElement> = document.querySelectorAll('.resizable .resizer')
      const minimum_size = 400;
      let original_width = 0;
      let original_height = 0;
      let original_x = 0;
      let original_y = 0;
      let original_mouse_x = 0;
      let original_mouse_y = 0;
      for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];
        currentResizer.addEventListener('mousedown', (e: MouseEvent) => {
          e.preventDefault()
          original_width = parseFloat(getComputedStyle(this.resizable!, null).getPropertyValue('width').replace('px', ''));
          original_height = parseFloat(getComputedStyle(this.resizable!, null).getPropertyValue('height').replace('px', ''));
          original_x = this.resizable!.getBoundingClientRect().left;
          original_y = this.resizable!.getBoundingClientRect().top;
          original_mouse_x = e.pageX;
          original_mouse_y = e.pageY;
          window.addEventListener('mousemove', resize)
          window.addEventListener('mouseup', stopResize)
        })

        const resize = (e: any) => {
          if (currentResizer.classList.contains('bottom-right')) {
            const width = original_width + (e.pageX - original_mouse_x);
            const height = original_height + (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              this.resizable!.style.width = width + 'px'
              this.canvas!.width = width - 10 - 40;
            }
            if (height > minimum_size) {
              this.resizable!.style.height = height + 'px'
            }

          }
          else if (currentResizer.classList.contains('bottom-left')) {
            const height = original_height + (e.pageY - original_mouse_y)
            const width = original_width - (e.pageX - original_mouse_x)
            if (height > minimum_size) {
              this.resizable!.style.height = height + 'px'
              this.canvas!.width = width - 10 - 40;
            }
            if (width > minimum_size) {
              this.resizable!.style.width = width + 'px'
              this.resizable!.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }

          }
          else if (currentResizer.classList.contains('top-right')) {
            const width = original_width + (e.pageX - original_mouse_x)
            const height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              this.resizable!.style.width = width + 'px'
              this.canvas!.width = width - 10 - 40;
            }
            if (height > minimum_size) {
              this.resizable!.style.height = height + 'px'
              this.resizable!.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }

          }
          else {
            const width = original_width - (e.pageX - original_mouse_x)
            const height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              this.resizable!.style.width = width + 'px'
              this.resizable!.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
              this.canvas!.width = width - 10 - 40;
            }
            if (height > minimum_size) {
              this.resizable!.style.height = height + 'px'
              this.resizable!.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
            
          }

          this.logOnContainer();
        }


        const stopResize = () => {
          window.removeEventListener('mousemove', resize)
        }
      }
    }
  }

  private log(color: any, label: string, message: any, logType: LogType = 'log') {
    if (this.config.enabled) {
      if (!isValidString(message)) {
        message = JSON.stringify(message, null, 2);
      }

      const date = new Date();
      const diff = this.logs.length === 0 ? '0ms' : getTimeDiff(this.logs[this.logs.length - 1].date, date);
      const dateStr = `[${formatDate(date)}] ${diff} `;
      message = ` - ${message}`;

      this.logs.push({ color, label, message: message.split('\n'), date, dateStr, diff });

      if (this.config.visual && !isUndefined(this.canvasHandler)) {
        this.logOnContainer();
      }

      const logFn = logType === 'log' ? console.log : logType === 'warn' ? console.warn : console.error;

      if (isNode) {
        const chalkColor = chalk.hex(color);
        // @ts-ignore
        return logFn(dateStr, `${chalkColor(label)}`, message);
      } else {
        logFn(
          `%c ${dateStr} %c ${label} %c ${message}`,
          `background-color: inherit; color: inherit`,
          `background-color: ${color}; color: #FFFFFF`,
          `background-color: inherit; color: inherit`
        );
      }
    }
  }

  private logOnContainer() {
    this.canvasHandler?.render(this.logs);
    this.container?.scrollTo?.({ top: this.container.scrollHeight });
  }

  public clear() {
    this.logs = [];
    this.logOnContainer();
  }

  public info(label: string, message: any) {
    return this.log('#1b81a8', label, message);
  };

  public highlight(label: string, message: any) {
    return this.log('#993d99', label, message);
  };

  public success(label: string, message: any) {
    return this.log('#108327', label, message);
  };

  public warn(label: string, message: any) {
    return this.log('#e7f531', label, message, 'warn');
  };

  public error(label: string, message: any) {
    return this.log('#ba1e18', label, message, 'error');
  };
}


/*
(function () {
  if (REACT_APP_LOG_CONTAINER === 'true') {
    let oldLog = console.log;
    console.log = function (...message) {
      logger.info('CONSOLE', message);
      // DO MESSAGE HERE.
      oldLog.apply(console, arguments);
    };

    let oldWarn = console.warn;
    console.warn = function (...message) {
      logger.warn('CONSOLE', message);
      // DO MESSAGE HERE.
      oldWarn.apply(console, arguments);
    };

    let oldError = console.error;
    console.error = function (...message) {
      logger.error('CONSOLE', message);
      // DO MESSAGE HERE.
      oldError.apply(console, arguments);
    };
  }
})();

*/

export default new WeebLogger();
