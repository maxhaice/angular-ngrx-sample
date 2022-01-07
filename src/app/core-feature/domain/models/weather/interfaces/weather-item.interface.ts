import { WeatherItemPropertiesInterface } from "./weather-item-properties.interface";

export interface WeatherItemInterface<Point> {
  weatherItemProperties: WeatherItemPropertiesInterface,
  point: Point
}
