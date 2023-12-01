/*
** El problema final **
Finalmente los hackers han conseguido acceder a la base de datos y la han dejado corrupta. Pero parece que han dejado un mensaje oculto en la base de datos. ¿Podrás encontrarlo?

Nuestra base de datos está en formato .csv. Las columnas son id, username, email, age, location.

Un usuario sólo es válido si:

- id: existe y es alfanumérica
- username: existe y es alfanumérico
- email: existe y es válido (sigue el patrón user@dominio.com)
- age: es opcional pero si aparece es un número
- location: es opcional pero si aparece es una cadena de texto
Ejemplos:

Entrada: 1a421fa,alex,alex9@gmail.com,18,Barcelona
Resultado: ✅ Válido

Entrada: 9412p_m,maria,mb@hotmail.com,22,CDMX
Resultado: ❌ Inválido (id no es alfanumérica, sobra el _)

Entrada: 494ee0,madeval,mdv@twitch.tv,,
Resultado: ✅ Válido (age y location son opcionales)
Entrada: 494ee0,madeval,twitch.tv,22,Montevideo
Resultado: ❌ Inválido (email no es válido)
** Cómo resolverlo **
1. Analiza la lista de entradas de la baes de datos y detecta los inválidos: https://codember.dev/data/database_attacked.txt

2. Encuentra el primer caracter (número o letra) del username de cada usuario inválido. Júntalos por orden de aparición y descubre el mensaje oculto. Luego envíalo con submit. Por ejemplo:
submit att4ck
*/

(async () => {
  const response = await fetch('https://codember.dev/data/database_attacked.txt')
  const data = await response.text()

  const users = data.split('\n').map(user => {
    const [id,username,email,age,location] = user.split(',')
    return {
      id,
      username,
      email,
      age,
      location
    }
  })
  const regexp = {
    ONLY_ALFANUM: /^[0-9a-zA-Z]+$/,
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    ONLY_NUMS: /^[0-9]+$/
  }
  
  const invalidUsers = users.filter(({id,username,email,age,location}) => {
    if(!regexp.ONLY_ALFANUM.test(id) || !id) {
      return true
    }
    if(!regexp.ONLY_ALFANUM.test(username) || !username){
      return true
    }
    if(!email || !regexp.EMAIL.test(email)) {
      return true
    }
    if(age && !regexp.ONLY_NUMS.test(age)) {
      return true
    }
    
    return false
  })

  console.log(invalidUsers.map(user => user.username[0]).join(''))
})()