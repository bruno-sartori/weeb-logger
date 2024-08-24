export declare interface IWeebLog {
  color: string;
  label: string;
  message: Array<string>;
  dateStr: string;
  date: Date;
  diff: string;
}

export declare interface IContainerStyle {
  width?: number;
  height?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  opacity?: number;
  lineHeight?: number;
}

export declare interface IWeebLoggerConfig {
  enabled?: boolean,
  visual?: boolean,
  containerStyle?: IContainerStyle,
  waifu?: 'alya' | 'mimori-biyakuya'
}
