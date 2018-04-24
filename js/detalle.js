// JavaScript Document 20100030838
var code_usuario = "WebMobile";
var KBL = "";
var KBLD = "";
var KVJE = "";
var ESMASTER = "";
var DESG = "";

$(document).ready(function(e) {  
	//getProgramaciones();
	
	console.log(window.localStorage);
	code_usuario = $.QueryString["user"];
	KBL = $.QueryString["KBL"];
	KBLD = $.QueryString["KBLD"];
	KVJE = $.QueryString["KVJE"];
	ESMASTER = $.QueryString["tipo"];
    DESG = $.QueryString["desglo"];
	if ( window.localStorage.getItem("user") != null )
	code_usuario = window.localStorage.getItem("user");
	$("#actualizar").click(function(e) {
        getProgramaciones();
    });
	 $("form").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	
	$("#guardar").click(function(e) {
        setGuardar();
    });
	//actualizarRutaBL(KBL,KBLD,KVJE,"NIPRIEMR.jpg");
 	getProgramaciones();
	 
	 
	
});	

function setGuardar(){
	 
	if ( $(".panelFoto").css("display") == "none" ){
		alerta("No cuenta con VBO Online"); 
		return;
	}
	if ( $("#foto").val() == "" ){
		alerta("Debe seleccionar una foto"); 
		return;
	}
	
	var BL = $("#bl").val();
	var DESGLOSE =  $("#desglose").val();
	$.mobile.loading('show'); 
    var files = $('input#foto')[0].files;//$("#foto").files;
    //var myID = 3; //uncomment this to make sure the ajax URL works
    if (files.length > 0) {
       if (window.FormData !== undefined) {
           var data = new FormData();
		   data.append("KBL", KBL);
		   data.append("KBLD", KBLD);
		   data.append("KVJE", KVJE);
		   data.append("BL", BL);
		   data.append("DESGLOSE", DESGLOSE);
		   
           for (var x = 0; x < files.length; x++){
               data.append("file" + x, files[x]);
           }
		  //console.log($("#IDPedido").val());
           $.ajax({
               type: "POST",
			   //crossDomain: true,
               //url: 'http://localhost:54097/CargarFotoBL.ashx?KBL=' + KBL + '&KBLD=' + KBLD + '&KVJE=' + KVJE+ '&BL=' + BL + '&DESGLOSE=' + DESGLOSE,
			   url: 'http://www.meridian.com.pe/MercatorPeru/Servicios/RecepcionBL/CargarFotoBL.ashx?KBL=' + KBL + '&KBLD=' + KBLD + '&KVJE=' + KVJE+ '&BL=' + BL + '&DESGLOSE=' + DESGLOSE,
               contentType: false,
               processData: false,
               data: data,
               success: function(result) {
                   resp = result.toString().split("|");
				   //alert(result);
				   if ( resp[0] == 0) {
				   		//alerta(resp[1]);
						//setFotosPedido($.QueryString["IDPedido"]);
						var NONFILE = resp[2]
						actualizarRutaBL(KBL,KBLD,KVJE,NONFILE);
				   }
					else
						alerta("Error, no se pudo subir la foto");
						
				   $.mobile.loading('hide'); 
				   $('#foto').val("");
               },
               error: function (xhr, status, p3, p4){
                   var err = "Error " + " " + status + " " + p3 + " " + p4;
                   if (xhr.responseText && xhr.responseText[0] == "{")
                       err = JSON.parse(xhr.responseText).Message;
                       
					   $('#file').val("");
					   console.log(xhr);
					    //console.log(status);
					   alerta("Error, no se pudo subir la foto");
					   $.mobile.loading('hide'); 
                    }
                });
        } else {
            alert("This browser doesn't support HTML5 file uploads!");
          }
     }
	
	//return; 
	
	
	/*var parametros = new Object();
	parametros.usu = code_usuario;	
	parametros.orden = $("#ordenes").val();	
	parametros.culmi = $("#concluido").val();	
	parametros.obs = $("#observacion").val();	
	parametros.servicio = $("#ordenes option:selected").text();
	parametros.cheque = $("#cheque").val();
	//console.log(parametros);
	//return;
	$.mobile.loading('show'); 
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosMovil/AntaresAduanas/Movil/WS_AuxDespacho.asmx/Grabar",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : JSON.stringify(parametros),
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
			//console
			resultado = $.parseJSON(data.d);
			$.mobile.loading('hide');
			 if ( resultado.code == 1){
				$("#observacion").val("")
				$("#cheque").val("")
				$("#concluido").val();	
				$("#ordenes").val(0);
				$("#ordenes").selectmenu('refresh', true);
				$("#concluido").selectmenu('refresh', true);
				getProgramaciones();
			 }			  
			 alerta(resultado.message);
			 
        },

        error : function(jqxhr) 
        { 
          alerta('Error de conexi\u00f3n, contactese con sistemas!');
        }

    });		
		*/
	
}

function actualizarRutaBL(KBL,KBLD,KVJE,NONFILE){
	 
        console.log("Ingreso BL");
        var Digital = new Date()
        var date = Digital.getDate();
        var month = Digital.getMonth();
        var montharr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        month = montharr[month];
        var year = Digital.getFullYear();
        if (date <= 9)
            date = "0" + date
        var _FechaEnvio = year + "" + month + "" + date;       
		var parametro = new Object();
        parametro.KBL = KBL;
        parametro.KBLD = KBLD;
        parametro.KVJE =KVJE;
        parametro.FechaEnvio= _FechaEnvio;
        parametro.UsuarioEnvio = code_usuario;
        //self.recepcion.Foto('\\10.93.1.234\app1$\SIM\MercatorPeru\Recepcion_BL');
        parametro.Foto = "\\10.93.1.234\\app1$\\SIM\\MercatorPeru\\Recepcion_BL\\"+NONFILE;
 		//parametro.Foto =NONFILE;
		var paramRecepcion = {recepcion: parametro};

        $.ajax({
             
            url: 'http://www.meridian.com.pe/MercatorPeru/Servicios/RecepcionBL/ServiceMobile.svc/rest/ActualizarRecepcion_',
            //data: ko.toJSON(recepcion),
           	type: "GET",
			crossDomain: true,
			dataType : "json",
			//data : '{"sUsuario" : "' + $("#usuario").val() + '", "sClave" : "' + $("#clave").val() + '"}',
			data: { KBL:  parametro.KBL, KBLD:  parametro.KBLD, KVJE:  parametro.KVJE, FechaEnvio:  parametro.FechaEnvio, UsuarioEnvio:  parametro.UsuarioEnvio, Foto: parametro.Foto },
			contentType: "application/json; charset=utf-8",
            success: function (result) {
                
               alerta(result.ErrorMessage); 
			   location.href = "programacion.html";           
            },
            error: function (result) {
                 alerta('Error de conexi\u00f3n, contactese con sistemas!');
            },
        });
	
	}
function alertDismissed(){
}
//

function getProgramaciones(){
	 
	$.mobile.loading('show'); 
	
	var parametros = new Object();
	parametros.ESMASTER = ESMASTER;	
	parametros.BLMASTER = "";	
	parametros.BLHIJO = "";	
	parametros.KVJE = 0;		
	parametros.CSNE = "";	
	parametros.AGAD = "";		
	parametros.DESG = DESG;
	parametros.ORD = "0";
	 
	$.ajax({
        url : "http://www.meridian.com.pe/MercatorPeru/Servicios/RecepcionBL/ServiceMobile.svc/rest/listarBusquedaBL",
        type: "GET",
        dataType : "json",
		contentType: "application/json; charset=utf-8",
		data: { ESMASTER: parametros.ESMASTER, BLMASTER: parametros.BLMASTER, BLHIJO: parametros.BLHIJO, KVJE: parametros.KVJE, CSNE: parametros.CSNE, AGAD: parametros.AGAD, DESG: parametros.DESG, ORD: parametros.ORD },
        success : function(data, textStatus, jqXHR) {
			resultado = data;//$.parseJSON(data.d);		
			//console.log(data);
			$.mobile.loading('hide');
			if ( resultado.length > 0 ){
				 
				var count = 0; 
				for (var i = 0; i<resultado.length;i++){ 		
					//href = 'href="detalle.html?KBLD='+resultado[i].KBLD+'&KVJE='+resultado[i].KVJE+'&KBL='+resultado[i].KBL + '"'; 		
					//$("#listProgramacion").append('<li data-kbl="'+resultado[i].KBL+'" data-viaje="'+resultado[i].KVJE+'"><a style="font-weight:normal;" '+href+' data-ajax="false">BL:' + (FlagBL == 0 ? resultado[i].BL2 : resultado[i].BL) + ' <br>' + resultado[i].DCSNE +'</a></li> ');
					if ( resultado[i].KBL == KBL && resultado[i].KBLD == KBLD && resultado[i].KVJE == KVJE ){
						if ( ESMASTER == 0 ){
							$("#bl").val(resultado[i].BL2);
							$("#desglose").val(resultado[i].BL);
						}
						else{
							$("#bl").val(resultado[i].BL);
							$("#desglose").val(resultado[i].BL2);
						}
						
						
						$("#consignatario").val(resultado[i].DCSNE);
						$("#agente").val(resultado[i].DAGAD);
						$("#observacion").val(resultado[i].OBSE);
						
						if (  resultado[i].OBSE == "No cuenta con liquidación de VB On Line pendiente de cerrar."){
							$(".panelFoto").hide();
						}
					 
					
					} 
										
				} 
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
