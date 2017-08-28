$(document).ready(function($) {
    var conect = 0;
        $.ajax({
            url : 'http://pokeapi.co/api/v2/pokemon/',
            type : 'GET',
            datatype : 'json',
            data : {'limit': '40'}
        })
        .done(function(answer){
            console.log("successe");
            nombrePokemones(answer);
        })
        .fail(function(){
            console.log("error");
        })

        function nombrePokemones(data){
            data.results.forEach(function(val){
                
                var pokemon = val.name;
                var urlPoke = val.url;
                var namePokemon = $("<p>").text(pokemon);                          

                $.ajax({
                    url : urlPoke,
                    type : 'GET',
                    datatype : 'json'
                    
                })

                .done(function(answer){
                    console.log("successe");
                    console.log(answer);
                    imagenPK(answer);
                })

                .fail(function(){
                    console.log("error");
                })

                function imagenPK(datos){
                    var idPokemon = datos.id;
                    var nombrePokemon = datos.name;
                    var tipo = datos.types;
                    var habilidad = datos.abilities;
                    var tipoDato = "";
                    var tipoHabilidad = "";
                    for(i=0; i<tipo.length; i++){
                        tipoDato += "<li><p>" + tipo[i].type.name + "</p></li>";
                    }
                    for(i=0; i<tipo.length; i++){
                        tipoHabilidad += "<li><p>" + habilidad[i].ability.name + "</p></li>";
                    }
                    var picture = $("<img>").attr("src","http://pokeapi.co/media/img/" + idPokemon + ".png");
                    var cajaPicture =$("<div>");
                    var poke = $("<div>");
                    cajaPicture.attr("class", "cajaPicture");
                    poke.attr("class", "contenedores");
                    poke.attr('data-toggle', 'modal');
                    poke.attr('data-target', '#myModal' + idPokemon);
                    cajaPicture.append(picture);
                    poke.append(cajaPicture);
                    poke.append(namePokemon);
                    var losPoke = $('<div class="modal fade" id="myModal' + idPokemon + '" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h1 class="modal-title">' + nombrePokemon + '</h1></div><div class="modal-body"> <img src="http://pokeapi.co/media/img/'+idPokemon+ '.png" alt="" class="imagModal"> <div class="tipoClass"><h3>Tipo de Pokemón</h3><ul>'+ tipoDato + '</ul></div> <div class="habilidadClass"><h3>Habilidad</h3><ul>'+ tipoHabilidad + '</ul></div></div> </div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');
                    $(".modal").on("shown.bs.modal", function () {
                        if ($(".modal-backdrop").length > 1) {
                            $(".modal-backdrop").not(':first').remove();
                            $("body").attr('style', 'padding-right: 0'); 
                        }
                    });
                    
                    poke.append(losPoke);
                    $(".items").append(poke);
                                        
                }   
            });         
        }

        $(".siguiente").on("click", function(e){
                    $(".items").empty();
                    conect += 20;
                    $.ajax({
                        url : 'http://pokeapi.co/api/v2/pokemon/',
                        type : 'GET',
                        datatype : 'json',
                        data : {'offset':conect}
                    })

                    .done(function(answer){
                        console.log("successe");
                        nombrePokemones(answer);
                    })

                    .fail(function(){
                        console.log("error");
                    })
                });

        $(".antes").on("click", function(e){
                    $(".items").empty();
                    if(conect > 0){
                        conect -= 20;
                    }

                    $.ajax({
                        url : 'http://pokeapi.co/api/v2/pokemon/',
                        type : 'GET',
                        datatype : 'json',
                        data : {'offset':conect}
                    })

                    .done(function(answer){
                        console.log("successe");
                        nombrePokemones(answer);
                    })

                    .fail(function(){
                        console.log("error");
                    })
                });

});


$(document).ready(function(){
    $(".push_menu").click(function(){
         $(".wrapper").toggleClass("active");
    });
});


