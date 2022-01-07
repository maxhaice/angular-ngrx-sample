import { DayWeatherDTO, WeekWeatherDTO } from "../../dto/weather.dto";
import { WeatherDayInterface, WeatherWeekInterface } from "../../../domain/models/weather/interfaces/weather.interface";
import {DaysEnum} from "../../enums/days.enum";
import { WeatherItemInterface } from "../../../domain/models/weather/interfaces/weather-item.interface";
import { Serializer } from "../serializer";


export class WeatherSerializer implements Serializer<WeekWeatherDTO | DayWeatherDTO, WeatherWeekInterface | WeatherDayInterface> {
  serialize(item: WeekWeatherDTO | DayWeatherDTO): WeatherWeekInterface | WeatherDayInterface {
      if(Object.keys(item)[4] === 'daily') {
        return this.WeatherByWeekToDAO(item as WeekWeatherDTO);
      }
      else{
        return this.WeatherByDayToDAO(item as DayWeatherDTO);
      }
    }

  WeatherByDayToDAO = (weatherDTO: DayWeatherDTO)
    : WeatherDayInterface => {

    let weatherItems: WeatherItemInterface<number>[] = [];
    weatherDTO.hourly.forEach((item, index) => {
      let temperature = item.temp;
      let numberOfHour = index++;

      weatherItems.push({
        weatherItemProperties: {temperature: temperature},
        point: numberOfHour
      })
    });
    return {weatherItems};
  };

  WeatherByWeekToDAO = (weatherDTO: WeekWeatherDTO)
    : WeatherWeekInterface => {

    let weatherItems: WeatherItemInterface<DaysEnum>[] = [];
    weatherDTO.daily.forEach((item, index) => {
      let temperature = item.temp.day;
      let numberOfDay = index++
      if(index <= 7) {
        weatherItems.push({
          weatherItemProperties: {temperature: temperature},
          point: numberOfDay
        })
      }
    });
    return {weatherItems};
  };
}
