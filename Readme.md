[TOC]
# Aplicativos para socios CAI.
Se intenta replicar un aplicativo web para administracion de socios.

#### Acciones principales

- Vista Socio Si o No (Evento toggle);
- Asociarse (No socios);
- Consultar padron completo (socios historico actuales y bajas);
- Busqueda por Numero de socio y Nombre (socios);
- Comprar abonos (socios);
- Darse de baja (historico de socios en padron);
- API Clima (geolocalizacion con API incluida en objeto global);

#### Extensiones y librerias utilizadas

    editor.md/
            lib/ Sweet Alert, Bootstrap...
            css/ 
            scss/
			javascript/sincrono
			javascript/asincrono/API	https://openweathermap.org/api
Geolocalizacion obtenida del objeto global, para lograr funcionalidad, debe permitir ubicacion del navegador. El permiso solo comparte latitud y longitud al JS y luego se comparten variables con esa informacion en el GET, no se comparte directamente el permiso a la API. (la API de clima consumida es gratuita, por lo cual los parametros tomados sobre la latitud y la longitud de la aplicacion son analizados aproximados para evitar y puede tomar barrios aledaños).
			...