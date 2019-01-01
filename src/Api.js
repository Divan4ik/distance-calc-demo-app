export function getCityCoords(city) {
  return new Promise((resolve, reject) => {

    var myGeocoder = ymaps.geocode(city, {results: 1});

    myGeocoder.then(
      function (res) {
        resolve(res.geoObjects.get(0).geometry.getCoordinates())
      },
      function (err) {
        reject('error')
      }
    );
  })
}

export async function getDistanceBetween(fromStr, toStr) {
  let from = await getCityCoords(fromStr);
  let to = await getCityCoords(toStr);

  return transformHumanReadableDistance(ymaps.coordSystem.geo.getDistance(from, to))
}

export function transformHumanReadableDistance(rawDistance) {
  return `${(rawDistance/1000).toFixed(0)} км`
}
