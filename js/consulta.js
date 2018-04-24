// JavaScript Document 20100030838
var code_usuario = "";
$(document).ready(function(e) {  
	//getProgramaciones();
	code_usuario = $.QueryString["user"];
	//code_usuario = window.localStorage.getItem("code");
	$("#actualizar").click(function(e) {
        getProgramaciones();
    });
	 $("form").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    }); 
	
 	getProgramaciones(); 
});	 

function alertDismissed(){
}
//

function getProgramaciones(){
	
	$.mobile.loading('show');
 	$("#listProgramacion").html(""); 
	$( "#panelTabs" ).tabs( "option", "active", 0 );
	var parametros = new Object();
	parametros.ESMASTER = $("input:radio[name='tipo']:checked").val();	
	parametros.BLMASTER = $("#bl").val();	
	parametros.BLHIJO = "";	
	parametros.KVJE = ( $("#nave").val() == "" ? 0 : 1);		
	parametros.CSNE = $("#cliente").val();	
	parametros.AGAD = $("#agente").val();		
	parametros.DESG = $("input:radio[name='desglose']:checked").val();
	parametros.ORD = "0";
	parametros.VISTO = $("input:radio[name='visto']:checked").val();
	//console.log(parametros);
	 
	$.ajax({
        url : "http://www.meridian.com.pe/MercatorPeru/Servicios/RecepcionBL/ServiceMobile.svc/rest/listarBusquedaBL",
        type: "GET",
		//crossDomain: true,
        dataType : "json",
        //data : '{"usuario":"' + code_usuario + '"}',
        data: { ESMASTER: parametros.ESMASTER, BLMASTER: parametros.BLMASTER, BLHIJO: parametros.BLHIJO, KVJE: parametros.KVJE, CSNE: parametros.CSNE, AGAD: parametros.AGAD, DESG: parametros.DESG, ORD: parametros.ORD },
           //contentType: "xml",
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
			resultado = data;//$.parseJSON(data.d);		
			console.log(data);
			$.mobile.loading('hide');
			if ( resultado.length > 0 ){
				$("#contentProgramaciones").find("h3").remove();
				//$("#contentProgramaciones #divTABS").fadeIn("fast");
				var count = 0;
				var FlagBL = $("input:radio[name='tipo']:checked").val(); 
				var FlagDESG = $("input:radio[name='desglose']:checked").val();
				for (var i = 0; i<resultado.length;i++){ 		
				
				if ( parametros.VISTO == 1 && resultado[i].OBSE == "No cuenta con liquidación de VB On Line pendiente de cerrar.")
					continue;
				
					href = 'href="detalle.html?KBLD='+resultado[i].KBLD+'&KVJE='+resultado[i].KVJE+'&KBL='+resultado[i].KBL + '&tipo='+ FlagBL +'&desglo='+ FlagDESG +'"'; 		
					$("#listProgramacion").append('<li data-kbl="'+resultado[i].KBL+'" data-viaje="'+resultado[i].KVJE+'"><a style="font-weight:normal;" '+href+' data-ajax="false">BL:' + (FlagBL == 0 ? resultado[i].BL2 : resultado[i].BL) + ' <br>' + resultado[i].DCSNE +'</a></li> ');					
				}
				$( "#listProgramacion" ).listview( "refresh"); 
			}
			else{
				$("#contentProgramaciones").find("h3").remove();
				$("#contentProgramaciones").append("<h3>No se encontraron programaci&oacute;nes para el dia de hoy</h3>").hide().fadeIn("fast");								
			}
			
			
        },

        error : function(jqxhr) 
        {
		   //console.log(jqxhr);	
           alerta('Error de conexi\u00f3n, contactese con sistemas!');
        }

    });		 
	
}


function alerta(mensaje){
	if ( navigator.notification == null ){
		alert(mensaje);
		return;
	}
	 navigator.notification.alert(
            mensaje,  // message
            alertDismissed,         // callback
           'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        	);
	
}
