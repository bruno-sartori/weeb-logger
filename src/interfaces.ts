export declare interface IWeebLog {
  color: string;
  label: string;
  message: Array<string>;
  dateStr: string;
  date: Date;
  diff: string;
}

type TWeebLoggerContainerPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
type TWeebLoggerWaifuName = 'akeno' | 'alya' | 'aqua' | 'ayano' | 'darkness' | 'koneko' | 'masha' | 'megumin' | 'tohka' | 'yuki' | 'zerotwo';

export declare interface IWeebLoggerContainerStyle {
  width?: number;
  height?: number;
  position?: TWeebLoggerContainerPosition;
  opacity?: number;
  lineHeight?: number;
}

export declare interface IWeebLoggerWaifu {
  showWaifu: boolean;
  name?: TWeebLoggerWaifuName;
  useTheme?: boolean;
}

export declare interface IWeebLoggerConfig {
  enabled?: boolean;
  visual?: boolean;
  formatStackTrace?: boolean;
  containerStyle?: IWeebLoggerContainerStyle;
  waifu?: IWeebLoggerWaifu;
}
