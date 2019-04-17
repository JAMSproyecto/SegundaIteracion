'use strict';

let buscar_centro_por_id = (id) => {
    let centro = [];
  
    let request = $.ajax({
      url: "http://localhost:4000/api/obtener_centro_por_id/" + id,
      type: "GET",
      data: {
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async: false
    });
  
    request.done(function (res) {
      centro = res.centro;
      
    });
    
    request.fail(function (jqXHR, textStatus) {
  
    });
    return centro;
  };