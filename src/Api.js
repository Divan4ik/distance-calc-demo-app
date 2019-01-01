export function getCityCoords(city) {
  return new Promise((resolve, reject) => {

    var myGeocoder = ymaps.geocode(city, {results: 1});

    myGeocoder.then(
      function (res) {
        if(res.geoObjects.get(0) === undefined) {
          reject('Адрес не найден')
        }
        resolve(res.geoObjects.get(0).geometry.getCoordinates())
      },
      function (err) {
        reject('error')
      }
    );
  })
}

export async function getDistanceBetween(fromStr, toStr) {
  try {
    let from = await getCityCoords(fromStr);
    let to = await getCityCoords(toStr);
    let distance = transformHumanReadableDistance(ymaps.coordSystem.geo.getDistance(from, to));
    return spellResponse(fromStr, toStr, distance);
  } catch(e) {
    throw new Error(e)
  }
}

export function transformHumanReadableDistance(rawDistance) {
  return `${(rawDistance/1000).toFixed(0)} км`
}

export function spellResponse(from, to, distance) {
  let d = new Date(),
      mm = d.toISOString().slice(5,7),
      dd = d.toISOString().slice(8,10),
      t = d.toISOString().slice(11,16);
  return `«${mm}/${dd} ${t}» «${from}» -> «${to}» = ${distance}`
}
