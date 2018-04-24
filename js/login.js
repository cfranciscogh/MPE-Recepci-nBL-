$(document).ready(function(e) {
    	$("#ingresar").click(function(e) {
            e.preventDefault();
			$.mobile.loading('show');
			setTimeout(loginValidar, 100);
        });
});

var loginValidar = function(){
	
	  if ( $("#usuario").val() == "" && $("#clave").val() == "" )
   	{
		 $.mobile.loading('hide');
		  if ( navigator.notification == null ){
			  alert('Complete los campos');
					return;
				}
	   navigator.notification.alert(
            'Complete los campos',  // message
            alertDismissed,         // callback
            'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        	);
	   return;
   	} 
	 
	$.ajax({
        url : "http://www.meridian.com.pe/MercatorPeru/Servicios/RecepcionBL/ServiceMobile.svc/rest/validarUsuario",
        type: "GET",
		crossDomain: true,
        dataType : "json",
        //data : '{"sUsuario" : "' + $("#usuario").val() + '", "sClave" : "' + $("#clave").val() + '"}',
		data: { sUsuario: $("#usuario").val(), sClave: $("#clave").val() },
        contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
		  //console.log(data);
          resultado = data;//$.parseJSON(data.d);
		  //console.log(resultado);
		  if ( resultado.length > 0){			  
			  	var recordar = ( $('input#recordar').is(':checked') ? 1 : 0);
			    window.localStorage.setItem("user", $("#usuario").val());
				window.localStorage.setItem("pass",$("#clave").val());
				window.localStorage.setItem("entidad", resultado[0].Ent_Codi);				
				window.localStorage.setItem("recordar", recordar);
			  	location.href = "programacion.html";;
		  }
		  else{
			   $.mobile.loading('hide');
			   var message = "Usuario y/o clave son incorrectos";//resultado.message;
			   
			   if ( navigator.notification == null ){
					alert(message);
					return;
				}
				else
			   navigator.notification.alert(
					message,  // message
					alertDismissed,         // callback
					'Informaci\u00f3n',            // title
					'Aceptar'                  // buttonName
				);
			   $("#usuario").val("");
			   $("#clave").val("");
			   $("#usuario").focus();
			   $(".loadLogin").fadeOut("fast");
		  }
        },

        error : function(jqxhr) 
        {
			$.mobile.loading('hide');
			
			 if ( navigator.notification == null ){
			  alert('Error de conexi\u00f3n, contactese con sistemas!');
					return;
				}
				
           navigator.notification.alert(
            'Error de conexi\u00f3n, contactese con sistemas!',  // message
            alertDismissed,         // callback
            'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        	);
        }

    });	
	

};

function alertDismissed(){
}