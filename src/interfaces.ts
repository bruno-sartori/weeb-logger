export declare interface IWeebLog {
  color: string;
  label: string;
  message: Array<string>;
  dateStr: string;
  date: Date;
  diff: string;
}

export declare interface IWeebLoggerContainerStyle {
  width?: number;
  height?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  opacity?: number;
  lineHeight?: number;
}

export declare interface IWeebLoggerWaifu {
  showWaifu: boolean;
  name?: 'akeno' | 'alya' | 'aqua' | 'ayano' | 'darkness' | 'koneko' | 'masha' | 'megumin' | 'tohka' | 'yuki' | 'zerotwo';
  useTheme?: boolean;
  size?: 'small';
}

export declare interface IWeebLoggerConfig {
  enabled?: boolean;
  visual?: boolean;
  containerStyle?: IWeebLoggerContainerStyle;
  waifu?: IWeebLoggerWaifu;
}
