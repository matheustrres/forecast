import { Beach } from '@src/shared/infra/mongo/models/beach.model';

export interface StormGlassPointSource {
  [key: string]: number;
}

export interface StormGlassPoint {
  readonly time: string;
  readonly waveHeight: StormGlassPointSource;
  readonly waveDirection: StormGlassPointSource;
  readonly swellDirection: StormGlassPointSource;
  readonly swellHeight: StormGlassPointSource;
  readonly swellPeriod: StormGlassPointSource;
  readonly windDirection: StormGlassPointSource;
  readonly windSpeed: StormGlassPointSource;
}

export interface StormGlassForecastResponse {
  hours: StormGlassPoint[];
}

export interface NormalizedForecastPoint {
  time: string;
  waveHeight: number;
  waveDirection: number;
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  windDirection: number;
  windSpeed: number;
}

export interface BeachForecast extends Omit<Beach, 'user'>, NormalizedForecastPoint {}

export interface TimeForecast {
  time: string;
  forecast: BeachForecast[];
}

export interface ApiErrorProps {
  code: number;
  message: string;
  codeAsString?: string;
  description?: string;
  documentation?: string;
}

export interface ApiErrorResponse extends Omit<ApiErrorProps, 'codeAsString'> {
  error: string;
}
