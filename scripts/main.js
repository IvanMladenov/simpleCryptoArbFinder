$(document).ready(function(){
        $('textarea').val('');

        var firstElement = $('textarea[name="dex"]');
        var secondElement = $('textarea[name="exchange"]');
        var outputElement = $('#otuputElement');

        $('#calculateBtn').on("click", calculate);
        $('#getQuotes').on("click", getQuotes);
        $('#clearBtn').on("click", function(){
            $('textarea').val(''); 
            outputElement.text('');
        });

        firstElement.keydown(check);
        secondElement.keydown(check);

        function calculate(){
            var a = firstElement.val();
            var b = secondElement.val();
            var result = 100*(b-a)/a;

            outputElement.text(result.toFixed(2));
        }

        function check(event) {
            if (event.shiftKey == true) {
                event.preventDefault();
            }

            if ((event.keyCode >= 48 && event.keyCode <= 57) || 
                (event.keyCode >= 96 && event.keyCode <= 105) || 
                event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 ||
                event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190 || event.keyCode == 110) {

            } else {
                event.preventDefault();
            }

            if($(this).val().indexOf('.') !== -1 && (event.keyCode == 190 || event.keyCode == 110))
                event.preventDefault(); 
            //if a decimal has been added, disable the "."-button

        }

        function getQuotes(){
            $.ajax({
            url: "https://balanced.rhizome.dev/api/v2/dex/quote/",
            type: 'GET',
            success: function(res){
                    firstElement.val(res.sicx_bnusd_quote);
                    firstElement.next('span').show().fadeOut(1500);
                }
            });

            $.ajax({
            url: "https://api.binance.com/api/v3/ticker/price?symbol=ICXUSDT",
            type: 'GET',
            success: function(res){
                    secondElement.val(res.price);
                    secondElement.next('span').show().fadeOut(1500);
                }
            });
        }
        
    });