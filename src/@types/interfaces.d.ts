interface IWeebLog {
  color: string;
  label: string;
  message: Array<string>;
  dateStr: string;
  date: Date;
  diff: string;
}

interface IContainerStyle {
  width: number;
  height: number;
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  opacity: number;
  lineHeight: number;
}

interface IWeebLoggerConfig {
  enabled?: boolean,
  visual?: boolean,
  containerStyle?: IContainerStyle,
  waifu?: 'alya' | 'mimori-biyakuya'
}
