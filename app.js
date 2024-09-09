$(function() {

    $(".salario").on("input", function(){

        horasTrabajas = document.getElementById("horas").value;
        salarioXHora = document.getElementById("salarioHora").value;
        
        var sBruto = horasTrabajas * salarioXHora;
    
        document.getElementById("sBruto").value = sBruto;
    
        calcularSalarioNeto();

    });

    function calcularSalarioNeto(){
        var sBruto = document.getElementById("sBruto").value;
    
        var i = sBruto * 0.0975;
        const seguroSocial = parseFloat(i.toFixed(2));
        document.getElementById("sSocial").value = seguroSocial;   
        
        var i = sBruto * 0.0125;
        const seguroEducativo = parseFloat(i.toFixed(2));
        document.getElementById("sEducativo").value = seguroEducativo;
        
        var sAnual = sBruto *13 ;
        let impuestoRenta = 0; 
        
        if(iR > 50000){
            var i = ((50000 - 11000) * 0.15 ) + ((sAnual - 50000) * 0.25);
            const impuestoRenta = parseFloat(i.toFixed(2));
            var mensual = impuestoRenta / 12;
            document.getElementById("iRenta").value = mensual.toFixed(2);
            console.log("Paga 25%");
        } else{
            var i = (sAnual - 11000) * 0.15;
            var mensual = impuestoRenta / 12;
            document.getElementById("iRenta").value = mensual.toFixed(2);
            console.log("Paga 15%");
        }

        const sNeto = sBruto - (seguroSocial + seguroEducativo);
        document.getElementById("sNeto").value = sNeto.toFixed(2); // Convertir sNeto a decimal con 2 dígitos
    }

});
