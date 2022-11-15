# pronóstico del tiempo "weateher to time"

> https://user-images.githubusercontent.com/103513335/201820819-83ff3ddf-ccfb-46ec-ae37-0c34edc76a03.mp4

### este pronóstico del tiempo se especializa en el pronóstico del tiempo diario.

### esta realizado con la api free de openWeather 

## **Buscador**
---

![buscador](https://user-images.githubusercontent.com/103513335/201827874-6c5de7af-2387-49c0-8b71-540e6bd63ce7.png)
 >#### Para hacer una búsquedas mas precisa y teniendo en cuenta que para buscar un país con la api de openWeather  se requiere escribirlo con la normalización  ISO1366. Utilizo un json que convierte el país en su respectiva normalización


## **Hora de la búsqueda**
---
``` javaScript
setTimeZone(`${((date.getHours()) + 3) + (results.data.timezone / 3600) > 24 ?
          (((date.getHours()) + 3) + (results.data.timezone / 3600) - 24 < 10 ?
            `0${((date.getHours()) + 3) + (results.data.timezone / 3600) - 24}` :
            Math.ceil(((date.getHours()) + 3) + (results.data.timezone / 3600) - 24)) :

          ((date.getHours()) + 3) + (results.data.timezone / 3600) < 0 ?
            (((date.getHours()) + 3) + (results.data.timezone / 3600) + 24 < 10 ?
              `0${((date.getHours()) + 3) + (results.data.timezone / 3600) + 24}` :
              Math.ceil(((date.getHours()) + 3) + (results.data.timezone / 3600) + 24)) :

            (((date.getHours()) + 3) + (results.data.timezone / 3600) < 10 ?
              `0${((date.getHours()) + 3) + (results.data.timezone / 3600)}` :
              Math.ceil(((date.getHours()) + 3) + (results.data.timezone / 3600)))}

                    : ${(date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()} Hs`
        )
```

#### La mayor curiosidad de esta petición a la api es que la zona horaria (timezone) ,aparece en segundos es decir que 1hs = 3600s.
#### Entonces el valor de la petición se divide por 3600 para que quede expresado en horas, ya que la hora del objeto Date() esta expresado en horas. 
