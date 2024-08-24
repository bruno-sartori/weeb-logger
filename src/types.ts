import { IWeebLoggerConfig, IWeebLoggerContainerStyle, IWeebLoggerWaifu } from "./interfaces";

export declare type LogType = 'log' | 'warn' | 'error';

// Tipo auxiliar para tornar todas as propriedades obrigatórias e profundas
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object 
    ? T[P] extends (...args: any[]) => any 
      ? T[P] 
      : DeepRequired<Required<T[P]>>
    : T[P];
};

declare type IRequiredContainerStyle = DeepRequired<IWeebLoggerContainerStyle>;
declare type IRequiriedWaifu = DeepRequired<IWeebLoggerWaifu>;

// Ajustando a configuração do logger para usar IRequiredContainerStyle para containerStyle
export declare type IWeebRequiredLoggerConfig = Omit<DeepRequired<IWeebLoggerConfig>, 'containerStyle' | 'waifu'> & {
  containerStyle: IRequiredContainerStyle;
  waifu: IRequiriedWaifu;
};
