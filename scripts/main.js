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
            var a = Number.parseFloat(firstElement.val());
            var b = Number.parseFloat(secondElement.val());
            var result = (a/b-1)*100;
			
			if(a<b){
				result = (b/a-1)*100;
			}

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
                url: "https://wallet.icon.foundation/api/v3",
                type: 'POST',
                data: JSON.stringify({
                    "jsonrpc": "2.0",
                    "method": "icx_call",
                    "params": {
                        "from": "hx23ada4a4b444acf8706a6f50bbc9149be1781e13",
                        "to": "cxa0af3165c08318e988cb30993b3048335b94af6c",
                        "dataType": "call",
                        "data": {
                            "method": "getSicxBnusdPrice"
                        }
                    },
                    "id":25
                }),
                dataType: "json",
                success: function (res) {

                    var price = parseInt(res.result, 16)/10**18;

                    firstElement.val(price);
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
