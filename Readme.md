# Aplicativos para socios CAI.
Se intenta replicar un aplicativo web para administracion de socios.

Menu:
#### 1 -- Acciones principales
#### 2 -- Extensiones y librerias utilizadas

--------------------------------------------------


#### Acciones principales

- Vista Socio Si o No (Evento toggle);
- Asociarse (No socios);
- Consultar padron completo (socios historico con categoria y abono);
- Busqueda por Numero de socio y Nombre (socios);
- Comprar abonos (socios);
- Darse de baja (socios: solo puede hacer la solicitud, la baja efectiva debe darla un administrador del club);
- Funcion de administrador: se ingresa desde el candado del footer. Debe ingresar la contraseña. desde el aplicativo puede efectivizar las solicitudes de los socios y consultar el padron de socios dados de baja. Desde la funcion admin, puede desconectarse manualmente desde el candado o bien se desconectara al terminar la sesion activa.
- API Clima (geolocalizacion con API incluida en objeto global);

#### Extensiones y librerias utilizadas

    editor.md/
            	lib/ Sweet Alert, Bootstrap...
            	css/ 
            	scss/
		javascript/sincrono
		javascript/asincrono/API	https://openweathermap.org/api
Geolocalizacion obtenida del objeto global, para lograr funcionalidad, debe permitir ubicacion del navegador. El permiso solo comparte latitud y longitud al JS y luego se comparten variables con esa informacion en el GET, no se comparte directamente el permiso a la API. (la API de clima consumida es gratuita, por lo cual los parametros tomados sobre la latitud y la longitud de la aplicacion son analizados aproximados y puede tomar barrios aledaños.).
			...
