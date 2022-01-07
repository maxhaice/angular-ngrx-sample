const weatherDataUrlPayload = `exclude=current,minutely,alerts`;
export const WEATHER  = {
    weatherGeoUrlPayload: 'limit=1',
    weatherDayDataUrlPayload: `${weatherDataUrlPayload},daily`,
    weatherWeekDataUrlPayload: `${weatherDataUrlPayload},hourly`
}
