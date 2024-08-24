/*******************************************************************************
* Simplified PHP Invoice System                                                *
*                                                                              *
* Version: 1.1.1	                                                               *
* Author:  James Brandon                                    				   *
*******************************************************************************/


$(document).ready(function() {

	// Invoice Type
	$('#invoice_type').change(function() {
		var invoiceType = $("#invoice_type option:selected").text();
		$(".invoice_type").text(invoiceType);
	});

	// Load dataTables
	$("#data-table").dataTable();

	// add product
	$("#action_add_product").click(function(e) {
		e.preventDefault();
	    actionAddProduct();
	});

	// password strength
	var options = {
        onLoad: function () {
            $('#messages').text('Start typing password');
        },
        onKeyUp: function (evt) {
            $(evt.target).pwstrength("outputErrorList");
        }
    };
    $('#password').pwstrength(options);

	// add user
	$("#action_add_user").click(function(e) {
		e.preventDefault();
	    actionAddUser();
	});

	// update customer
	$(document).on('click', "#action_update_user", function(e) {
		e.preventDefault();
		updateUser();
	});

	// delete user
	$(document).on('click', ".delete-user", function(e) {
        e.preventDefault();

        var userId = 'action=delete_user&delete='+ $(this).attr('data-user-id'); //build a post data structure
        var user = $(this);

	    $('#delete_user').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function() {
			deleteUser(userId);
			$(user).closest('tr').remove();
        });
   	});

   	// delete customer
	$(document).on('click', ".delete-customer", function(e) {
        e.preventDefault();

        var userId = 'action=delete_customer&delete='+ $(this).attr('data-customer-id'); //build a post data structure
        var user = $(this);

	    $('#delete_customer').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function() {
			deleteCustomer(userId);
			$(user).closest('tr').remove();
        });
   	});

	// update customer
	$(document).on('click', "#action_update_customer", function(e) {
		e.preventDefault();
		updateCustomer();
	});

	// update product
	$(document).on('click', "#action_update_product", function(e) {
		e.preventDefault();
		updateProduct();
	});

	// login form
	$(document).bind('keypress', function(e) {
		e.preventDefault;
		
        if(e.keyCode==13){
            $('#btn-login').trigger('click');
        }
    });

	$(document).on('click','#btn-login', function(e){
		e.preventDefault;
		actionLogin();
	});

	// download CSV
	$(document).on('click', ".download-csv", function(e) {
		e.preventDefault;

		var action = 'action=download_csv'; //build a post data structure
        downloadCSV(action);

	});

	// email invoice
	$(document).on('click', ".email-invoice", function(e) {
        e.preventDefault();

        var invoiceId = 'action=email_invoice&id='+$(this).attr('data-invoice-id')+'&email='+$(this).attr('data-email')+'&invoice_type='+$(this).attr('data-invoice-type')+'&custom_email='+$(this).attr('data-custom-email'); //build a post data structure
		emailInvoice(invoiceId);
   	});

	// delete invoice
	$(document).on('click', ".delete-invoice", function(e) {
        e.preventDefault();

        var invoiceId = 'action=delete_invoice&delete='+ $(this).attr('data-invoice-id'); //build a post data structure
        var invoice = $(this);

	    $('#delete_invoice').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function() {
			deleteInvoice(invoiceId);
			$(invoice).closest('tr').remove();
        });
   	});

	// delete product
	$(document).on('click', ".delete-product", function(e) {
        e.preventDefault();

        var productId = 'action=delete_product&delete='+ $(this).attr('data-product-id'); //build a post data structure
        var product = $(this);

	    $('#confirm').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function() {
			deleteProduct(productId);
			$(product).closest('tr').remove();
        });
   	});

	// create customer
	$("#action_create_customer").click(function(e) {
		e.preventDefault();
	    actionCreateCustomer();
	});

	$(document).on('click', ".item-select", function(e) {

   		e.preventDefault;

   		var product = $(this);

   		$('#insert').modal({ backdrop: 'static', keyboard: false }).one('click', '#selected', function(e) {

		    var itemText = $('#insert').find("option:selected").text();
		    var itemValue = $('#insert').find("option:selected").val();
	

		    $(product).closest('tr').find('.invoice_product').val(itemText);
			$(product).closest('tr').find('.invoice_product_save').val(itemText);
		    $(product).closest('tr').find('.invoice_product_price').val(itemValue);
		//	$(product).closest('tr').find('.invoice_product_item_no').val(itemValue);
			 console.log ('text = ' . itemText);
		  //  $(product).closest('tr').find('.invoice_product_price').val(itemText);

		    updateTotals('.calculate_amt');
		    calculateTotal();
  

   		});

		updateTotals('.calculate_amt');
		calculateTotal();

   		return false;

   	});

	   $(document).on('click', ".item-input", function(e) {

		e.preventDefault;

		var product = $(this);

		$('#insert').modal({ backdrop: 'static', keyboard: false }).one('click', '#selected', function(e) {

		 var itemText = $('#insert').find("option:selected").text();
		 var itemValue = $('#insert').find("option:selected").val();

		 $(product).closest('tr').find('.invoice_product').val(itemText);
		 $(product).closest('tr').find('.invoice_product_save').val(itemText);
		 $(product).closest('tr').find('.invoice_product_price').val(itemValue);
		 
	   //  $(product).closest('tr').find('.invoice_product_price').val(itemText);
	     updateTotals('.calculate_amt');
	     calculateTotal();

		});

	 	updateTotals('.calculate_amt');
	 	calculateTotal();

		return false;

	});

	$(document).on('click', ".item-select-prod", function(e) {

	e.preventDefault;

	var product = $(this);

	$('#insert').modal({ backdrop: 'static', keyboard: false }).one('click', '#selected', function(e) {

		var itemText = $('#insert').find("option:selected").text();
		var itemValue = $('#insert').find("option:selected").val();

		$(product).closest('tr').find('.invoice_product').val(itemText);
		$(product).closest('tr').find('.invoice_product_save').val(itemText);
		$(product).closest('tr').find('.invoice_product_price').val(itemValue);
		// console.log ('text = ' . val(itemText));
	//  $(product).closest('tr').find('.invoice_product_price').val(itemText);

		updateTotals('.calculate');
		calculateTotal();

	});

	 updateTotals('.calculate');
	 calculateTotal();

	return false;

	});

   	$(document).on('click', ".select-customer", function(e) {

   		e.preventDefault;

   		var customer = $(this);

   		$('#insert_customer').modal({ backdrop: 'static', keyboard: false });

   		return false;

   	});

   	$(document).on('click', ".customer-select", function(e) {

		    var customer_name = $(this).attr('data-customer-name');
		    var customer_email = $(this).attr('data-customer-email');
		    var customer_phone = $(this).attr('data-customer-phone');

		    var customer_address_1 = $(this).attr('data-customer-address-1');
		    var customer_address_2 = $(this).attr('data-customer-address-2');
		    var customer_town = $(this).attr('data-customer-town');
		    var customer_county = $(this).attr('data-customer-county');
		    var customer_postcode = $(this).attr('data-customer-postcode');

		    var customer_name_ship = $(this).attr('data-customer-name-ship');
		    var customer_address_1_ship = $(this).attr('data-customer-address-1-ship');
		    var customer_address_2_ship = $(this).attr('data-customer-address-2-ship');
		    var customer_town_ship = $(this).attr('data-customer-town-ship');
		    var customer_county_ship = $(this).attr('data-customer-county-ship');
		    var customer_postcode_ship = $(this).attr('data-customer-postcode-ship');

		    $('#customer_name').val(customer_name);
		    $('#customer_email').val(customer_email);
		    $('#customer_phone').val(customer_phone);

		    $('#customer_address_1').val(customer_address_1);
		    $('#customer_address_2').val(customer_address_2);
		    $('#customer_town').val(customer_town);
		    $('#customer_county').val(customer_county);
		    $('#customer_postcode').val(customer_postcode);


		    $('#customer_name_ship').val(customer_name_ship);
		    $('#customer_address_1_ship').val(customer_address_1_ship);
		    $('#customer_address_2_ship').val(customer_address_2_ship);
		    $('#customer_town_ship').val(customer_town_ship);
		    $('#customer_county_ship').val(customer_county_ship);
		    $('#customer_postcode_ship').val(customer_postcode_ship);

		    $('#insert_customer').modal('hide');

	});
	
	  	$(document).on('click', ".select-customer1", function(e) {

   		e.preventDefault;

   		var customer = $(this);

   		$('#insert_product').modal({ backdrop: 'static', keyboard: false });

   		return false;

   	});

   	$(document).on('click', ".customer-select1", function(e) {

		    var customer_name = $(this).attr('data-customer-name');
		  

		    $('#customer_name').val(customer_name);
		   
		    $('#insert_customer').modal('hide');

	});

	// create a product
	$("#action_create_product").click(function(e) {
		e.preventDefault();
		actionCreateProduct();
	});

	// create invoice
	$("#action_create_invoice").click(function(e) {
		e.preventDefault();
	    actionCreateInvoice();
	});

	// update invoice
	$(document).on('click', "#action_edit_invoice", function(e) {
		e.preventDefault();
		updateInvoice();
	});

	$('#btn_recalc_total').click(function (e) {
		alert ("recalc3");
	    e.preventDefault();
        updateTotals('.calculate_amt');
		calculateTotal();
	});

	// enable date pickers for due date and invoice date
	var dateFormat = $(this).attr('data-vat-rate');
	$('#invoice_date, #invoice_due_date').datetimepicker({
		showClose: false,
		format: dateFormat
	});

	// copy customer details to shipping
    $('input.copy-input').on("input", function () {
        $('input#' + this.id + "_ship").val($(this).val());
    });
    
    // remove product row
    $('#invoice_table').on('click', ".delete-row", function(e) {
    	e.preventDefault();
       	$(this).closest('tr').remove();
        calculateTotal();
    });

    // add new product row on invoice
   
	$('#invoice_table tbody tr').each(function() {
		var item_no = $('[name="invoice_product_item_no[]"]', this).val(),
		item_no = item_no + 1 ;
		// alert ("Item No1:" + item_no);
		
	//	$('#invoice_product_item_no[]').val(item_no.toFixed(0));
	//	$('#invoice_vat').val(((vat / 100) * finalTotal).toFixed(2));
		
		// item_nos = item_nos + 1;
	  });

	  $(document).ready(function() {
		  // Clone the last row of the table initially
		  var cloned = $('#invoice_table tr:last').clone();
	  
		  $(".add-row").click(function(e) {
			  e.preventDefault();
	  
			  // Clone the row and append it to the table
			  var newRow = cloned.clone();
			  console.log ("clone row 2");
			  newRow.appendTo('#invoice_table');
	  
			  // Iterate through each row in the table body to set unique item numbers
			  $('#invoice_table tbody tr').each(function(index) {

				 var itemText = $('#add-row').find("option:selected").text();
				  // Get the item number from the input field
				  var item_no = $(this).find('[name="invoice_product_qty[]"]').val();
				  console.log ("item no is " . item_no);
				  
				  // Increment item_no if it is zero or not a number
				//  if (!item_no || parseInt(item_no) === 1) {
					  item_no = index + 1;
				//  }
	  
				  // Set the value for 'invoice_product_item_no[]' field
				  $(this).find('[name="invoice_product_item_no[]"]').val(item_no);
				  $(this).find('[name="invoice_product[]"]').val();

				// --  $(this).closest('tr').find('.invoice_product').val(itemText);

				  // having cloned the line, set the amount to the correct value
	  
				  // Log the item number for debugging
				  console.log('Item number set to ' + item_no);
				  updateTotals(this);
				  calculateTotal();
			  });
		  });
	  });


    calculateTotal();
    
    $('#invoice_table').on('input', '.calculate_amt', function () {
	    updateTotals(this);
	    calculateTotal();
	});

	$('#invoice_totals').on('input', '.calculate_amt', function () {
	    calculateTotal();
	});

	$('#invoice_product').on('input', '.calculate_amt', function () {
	    calculateTotal();
	});

	$('#invoice_shipping').on('input', '.calculate_amt', function () {
	    calculateTotal();
	});

	$('#invoice_table').on('input', '.calculate', function () {
	    updateTotals(this);
	    calculateTotal();
	});



	

	$('.remove_vat').on('change', function() {
        calculateTotal();
    });

	function updateTotals(elem) {

		var percent_amt = 0;
		var subtotal = 0;

        var tr = $(elem).closest('tr'),
		    product = $('[name="invoice_product[]"]', tr).val(),
            quantity = $('[name="invoice_product_qty[]"]', tr).val(),
	        price = $('[name="invoice_product_price[]"]', tr).val(),
            isPercent = $('[name="invoice_product_discount[]"]', tr).val().indexOf('%') > -1,
            percent = $.trim($('[name="invoice_product_discount[]"]', tr).val().replace('%', '')),
	        subtotal = parseInt(quantity) * parseFloat(price);
            $('[name="invoice_product[]"]', tr).val(product);
			subtotalnodisc = parseInt(quantity) * parseFloat(price);

			console.log ("***************");
			console.log ("price = ", price);
			console.log ("qty = ", quantity);
			console.log ("subtotal = ", subtotal);
			console.log ("subtotalnodisc = ", subtotalnodisc);
			console.log ("***************");

        if(percent && $.isNumeric(percent) && percent !== 0) {
            if(isPercent){
                subtotal = subtotalnodisc - ((parseFloat(percent) / 100) * subtotalnodisc);
				percent_amt = (parseFloat(percent) / 100) * subtotalnodisc;
				$('[name="invoice_product_discount_amt[]"]', tr).val(percent_amt);
				//$('[name="invoice_product_discount_amt[]"]', tr).val(subtotal(2));
            } else {
                subtotal = subtotalnodisc - parseFloat(percent);
				//$('[name="invoice_product_discount_amt[]"]', tr).val(subtotal(2));
				percent_amt = (subtotal - parseFloat(percent));
				$('[name="invoice_product_discount_amt[]"]', tr).val(percent_amt);
            }
        } else {
            $('[name="invoice_product_discount[]"]', tr).val('');
        }

	    $('.calculate-sub', tr).val(subtotal.toFixed(2));
	}

	function calculateTotal() {
	    
	    console.log ("----------------------");
		var grandTotal = 0,
	    	disc = 0,
	    	c_ship = parseInt($('.invoice_shipping').val()) || 0;
		var fullT = 0;
		var total_fullT = 0;
		var percent_amt = 0;
		var shipping = 0;
		var disc_amt1 = 0;
		var discount_Total = 0;

	
	    $('#invoice_table tbody tr').each(function() {
          //  var c_sbt = $('.calculate_sub', this).val(),
		       var c_sbt = $('.calculate', this).val(),
                quantity = $('[name="invoice_product_qty[]"]', this).val(),
	            price = $('[name="invoice_product_price[]"]', this).val() || 0,
				disc_qty = $('[name="invoice_product_amt[]"]', this).val() || 0,
				

				fullT = quantity * price;
				total_fullT = total_fullT + fullT;

                subtotal = parseInt(quantity) * parseFloat(price);

				console.log ("fullT = ", fullT);
				console.log ("c_sbt = ", c_sbt);
				console.log ("qty = ", quantity);
				console.log ("subtotal = ", subtotal);
				console.log ("shipping = ", c_ship);
				
				$('[name="invoice_product_sub[]"]', this).val(quantity * price), //dasnz

				isPercent = $('[name="invoice_product_discount[]"]', this).val().indexOf('%') > -1,
                percent = $.trim($('[name="invoice_product_discount[]"]', this).val().replace('%', '')); // maybe a value instead of a %

				console.log ("isPercent = ", isPercent);
				console.log ("percent = ", percent);

				if(percent && $.isNumeric(percent) && percent !== 0) {
					if(isPercent){
						// subtotal = subtotal - ((parseFloat(percent) / 100) * subtotal);
						percent_amt = (parseFloat(percent) / 100) * subtotal;
						$('[name="invoice_product_discount_amt[]"]', this).val(percent_amt.toFixed(2));
					} else {
						disc_amt1 = $.trim($('[name="invoice_product_discount[]"]', this).val().replace('%', ''));
						// $('[name="invoice_product_discount_amt[]"]', this).val(subtotal);
					//	percent_amt = (subtotal - parseFloat(percent));
						$('[name="invoice_product_discount_amt[]"]', this).val(disc_amt1)  ;
					}
					console.log ("subtotal% = ", subtotal);
				    console.log ("percent_amt = ", percent_amt);
				} else {
					$('[name="invoice_product_discount[]"]', this).val('');
				}
            
                grandTotal += parseFloat(c_sbt);

               // disc += (subtotal - parseFloat(disc_qty));
				console.log ("disc = ", percent_amt);

				disc_amt1 = $('[name="invoice_product_discount_amt[]"]', this).val() || 0,

                discount_Total = discount_Total + parseFloat(disc_amt1);


	    });

        // VAT, DISCOUNT, SHIPPING, TOTAL, SUBTOTAL:
	    var subT = parseFloat(grandTotal),
		    
	    	finalTotal = parseFloat(grandTotal + c_ship),
	    	vat = parseInt($('.invoice-vat').attr('data-vat-rate'));

			console.log ("Discount Total = ", discount_Total );
			console.log ("GST Rate = ", vat);
			console.log ("Grand Total = ", grandTotal);
			console.log ("final Total = ", finalTotal);

	    
			
		$('.invoice-full-total').text(total_fullT.toFixed(2));
		$('#invoice_fulltotal').val(total_fullT.toFixed(2));

	    $('.invoice-discount').text(discount_Total);
        $('#invoice_discount').val(discount_Total);

		subT = parseFloat(total_fullT) - parseFloat(discount_Total);


		// subT = fullT - disc;
	    $('.invoice-sub-total').text(subT.toFixed(2));
	    $('#invoice_subtotal').val(subT.toFixed(2));


      //  vat = 3/23;  // New Zealand
	    vat = parseInt(vat) / 100;

		
		//shipping = $('[name="invoice_shipping[]"]', ),
		
		// shipping = _sdForm[0].invoice_shipping.value;
		try {
		   const input1 = document.getElementById("invoice_shipping");
		   if (typeof input1.value !== 'undefined')
		       shipping = input1.value;
		    else
		       shipping = 0.00;
            }
		catch (e)
		   { 
			shipping = 0.00;
		   }	

		
		if ( isNaN(shipping) )
			shipping = 0.00;

		
        if($('.invoice-vat').attr('data-enable-vat') === '1') {

	        if($('.invoice-vat').attr('data-vat-method') === '1') {
		        $('.invoice-vat').text(((vat) * subT).toFixed(2));
		        $('#invoice_vat').val(((vat) * subT).toFixed(2));
				$Grand_Total = subT + ((vat) * subT);

				if ( !isNaN(shipping) ) 
				    $Grand_Total = parseFloat(shipping) + $Grand_Total;
		        $('.invoice-total').text(($Grand_Total).toFixed(2));
		        $('#invoice_total').val(($Grand_Total).toFixed(2));
				console.log ("Final Total1 = ", subT);
	        } else {
	            $('.invoice-vat').text(((vat) * subT).toFixed(2));
	            $('#invoice_vat').val(((vat) * subT).toFixed(2));
				$Grand_Total = subT + ((vat) * subT);

				if ( !isNaN(shipping) ) 
				    $Grand_Total = parseFloat(shipping) + $Grand_Total;
		        $('.invoice-total').text(($Grand_Total).toFixed(2));
		        $('#invoice_total').val(($Grand_Total).toFixed(2));
				console.log ("Final Total2 = ", $Grand_Total);
	        }
		} else {

			$Grand_Total = subT + ((vat) * subT);

			if ( !isNaN(shipping) ) 
				$Grand_Total = parseFloat(shipping) + $Grand_Total;
			$('.invoice-total').text(($Grand_Total).toFixed(2));
			$('#invoice_total').val(($Grand_Total).toFixed(2));
			console.log ("Final Total3 = ", subT);
		}

		// remove vat
    	if($('input.remove_vat').is(':checked')) {
	        $('.invoice-vat').text("0.00");
	        $('#invoice_vat').val("0.00");
            $('.invoice-total').text((subT).toFixed(2));
            $('#invoice_total').val((subT).toFixed(2));
			console.log ("Final Total4 = ", subT);
	    }

		// subT = parseFloat(shipping) + subT;

	}

	
	function actionAddUser() {

		var errorCounter = validateForm();

		if (errorCounter > 0) {
		    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
		    $("#response .message").html("<strong>Error</strong>: It appear's you have forgotten to complete something!");
		    $("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
		} else {

			$(".required").parent().removeClass("has-error");

			var $btn = $("#action_add_user").button("loading");

			$.ajax({

				url: 'response.php',
				type: 'POST',
				data: $("#add_user").serialize(),
				dataType: 'json',
				success: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				},
				error: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				}

			});
		}

	}

	function actionAddProduct() {

		var errorCounter = validateForm();

		if (errorCounter > 0) {
		    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
		    $("#response .message").html("<strong>Error</strong>: It appear's you have forgotten to complete something!");
		    $("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
		} else {

			$(".required").parent().removeClass("has-error");

			var $btn = $("#action_add_product").button("loading");

			$.ajax({

				url: 'response.php',
				type: 'POST',
				data: $("#add_product").serialize(),
				dataType: 'json',
				success: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				},
				error: function(data){
				    $("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				}

			});
		}

	}

	function Recalc_Total()
	{
		alert ("recalc1");
		updateTotals();
		calculateTotal();
	}


	function actionCreateCustomer(){

		var errorCounter = validateForm();

		if (errorCounter > 0) {
			$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
			$("#response .message").html("<strong>Error</strong>: It appear's you have forgotten to complete something!");
			$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
		} else {

			var $btn = $("#action_create_customer").button("loading");

			$(".required").parent().removeClass("has-error");

			$(document).ready(function () {
			

			var datastring = $("#create_customer").serialize();

			$.ajax({
				url: 'response.php',
				type: 'POST',
				data: datastring,
				dataType: 'json',
			
			success: function(data) {
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$("#create_customer").before().html("<a href='./customer-add.php' class='btn btn-primary'>Add New Customer</a>");
				$("#create_customer").remove(); // Corrected typo: "create_cuatomer" to "create_customer"
				$btn.button("reset");
			},
			error: function(jqXHR, textStatus, errorThrown) {
					// Handle HTTP error response
					var errorMessage = "An error occurred. Please refer to the error file.";
					if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
						errorMessage = jqXHR.responseJSON.message;
					}

				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");

					// Log error details to the server
					jQuery.ajax({
						url: 'log_error.php',
						type: 'POST',
						dataType: 'application/json',
						data: JSON.stringify({
							status: jqXHR.status,
							message: errorMessage,
							responseText: jqXHR.responseText,
							errorThrown: errorThrown
						}),
						success: function(response) {
							console.log('Error details logged successfully');
						},
						error: function() {
							console.log('Failed to log error details');
						}
				}); 

			},
			
			});

			});

		
	}
	
}	
	


	function actionCreateInvoice(){

		var errorCounter = validateForm();

		if (errorCounter > 0) {
		    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
		    $("#response .message").html("<strong>Error</strong>: It appear's you have forgotten to complete something!");
		    $("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
		} else {

			var $btn = $("#action_create_invoice").button("loading");

			$(".required").parent().removeClass("has-error");
			$("#create_invoice").find(':input:disabled').removeAttr('disabled');

			$.ajax({

				url: 'response.php',
				type: 'POST',
				data: $("#create_invoice").serialize(),
				dataType: 'json',
				success: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$("#create_invoice").before().html("<a href='../invoice-add.php' class='btn btn-primary'>Create new invoice</a>");
					$("#create_invoice").remove();
					$btn.button("reset");
				},
				error: function(jqXHR, textStatus, errorThrown) {
					// Handle HTTP error response
					var errorMessage = "A " + textStatus + " occurred. Please refer to the error file.";
					if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
						errorMessage = jqXHR.responseJSON.message;
					}
					
					$("#response .message").html("<strong>HTTP Status Code: " + jqXHR.status + "</strong><br>" + errorMessage);
					$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");

					// Log error details to the server
					jQuery.ajax({
						url: 'log_error.php',
						type: 'POST',
						dataType: 'application/json',
						data: JSON.stringify({
							status: jqXHR.status,
							message: errorMessage,
							responseText: jqXHR.responseText,
							errorThrown: errorThrown
						}),
						success: function(response) {
							console.log('Error details logged successfully');
							$("#response .message").html("<strong>Details of error</strong>: " + errorThrown);
							$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
						},
						error: function() {
							console.log('Failed to log error details');
							$("#response .message").html("<strong>Details of error</strong>: " + errorThrown);
							$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
						}
				}); 
				} 

			});
		}

	}

   	function deleteProduct(productId) {



		jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: productId,
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			} 
    	});

   	}

   	function deleteUser(userId) {

        var $btn = $("#action_delete_user").button("loading");
        
        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: userId,
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			} 
    	});

   	}

	function deleteCustomer(userId) {

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: userId,
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			} 
    	});

   	}

   	function emailInvoice(invoiceId) {

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: invoiceId,
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			} 
    	});

   	}

   	function deleteInvoice(invoiceId) {

		var $btn = $("#action_delete_invoice").button("loading");

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: invoiceId,
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			} 
    	});

   	}

   	function updateProduct() {

   		var $btn = $("#action_update_product").button("loading");

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: $("#update_product").serialize(),
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			} 
    	});

   	}

   	function updateUser() {

   		var $btn = $("#action_update_user").button("loading");

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: $("#update_user").serialize(),
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			} 
    	});

   	}

   	function updateCustomer() {

   		var $btn = $("#action_update_customer").button("loading");

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: $("#update_customer").serialize(),
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// Handle HTTP error response
				var errorMessage = "An error occurred. Please refer to the error file.";
				if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
					errorMessage = jqXHR.responseJSON.message;
				}

				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");

				// Log error details to the server
				jQuery.ajax({
					url: 'log_error.php',
					type: 'POST',
					dataType: 'application/json',
					data: JSON.stringify({
						status: jqXHR.status,
						message: errorMessage,
						responseText: jqXHR.responseText,
						errorThrown: errorThrown
					}),
					success: function(response) {
						console.log('Error details logged successfully');
					},
					error: function() {
						console.log('Failed to log error details');
					}
			}); 
		}

   	});

}

   	function updateInvoice() {
   		
   		var errorCounter = validateForm();

		if (errorCounter > 0) {
		    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
		    $("#response .message").html("<strong>Error</strong>: It appear's you have forgotten to complete something!");
		    $("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			}
			else
			{  
		         
				var $btn = $("#action_update_invoice").button("loading");

				jQuery.ajax({
					url: 'response.php',
					type: 'POST', 
					data: $("#update_invoice").serialize(),
					dataType: 'json', 
					success: function(data){
						if (data.status === 0) {
							// Handle successful response
							$("#response .message").html("<strong>Success</strong>: " + data.message);
							$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
						} else {
							// Handle API error response
							$("#response .message").html("<strong>Success</strong>: " + data.message);
							$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
						}
						$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
						$btn.button("reset");
					},
					error: function(jqXHR, textStatus, errorThrown) {
						// Handle HTTP error response
						var errorMessage = "A " + textStatus + " occurred. Please refer to the error file.";
						if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
							errorMessage = jqXHR.responseJSON.message;
						}
				
						// Display HTTP status code and message
						$("#response .message").html("<strong>HTTP Status Code: " + jqXHR.status + "</strong><br>" + errorMessage);
						$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
						$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
						$btn.button("reset");
				
						// Log error details to the server
						jQuery.ajax({
							url: 'log_error.php',
							type: 'POST',
							dataType: 'application/json',
							data: JSON.stringify({
								status: jqXHR.status,
								message: errorMessage,
								responseText: jqXHR.responseText,
								errorThrown: errorThrown
							}),
							success: function(response) {
								console.log('Error details logged successfully');
								$("#response .message").html("<strong>Details of error</strong>: " + errorThrown);
							    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
							},
							error: function() {
								console.log('Failed to log error details');
								$("#response .message").html("<strong>Details of error</strong>: " + errorThrown);
							    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
							}
							
						});
					}
				});
			}
		}
			

   	

   	function downloadCSV(action) {

   		jQuery.ajax({

   			url: 'response.php',
   			type: 'POST',
   			data: action,
   			dataType: 'json',
   			success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			} 
   		});

   	}

   	// login function
	function actionLogin() {

		var errorCounter = validateForm();

		if (errorCounter > 0) {

		    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
		    $("#response .message").html("<strong>Error</strong>: Missing login credentials? Please enter and try again!");
		    $("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);

		} else {

			var $btn = $("#btn-login").button("loading");

			jQuery.ajax({
				url: 'response.php',
				type: "POST",
				data: $("#login_form").serialize(), // serializes the form's elements.
				dataType: 'json',
				success: function(data){
					window.location = "dashboard.php";
				//	$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				//	$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				//	$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				//	$btn.button("reset");

				},
				error: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				}

			});

		}
		
	}

   	function validateForm() {
	    // error handling
	    var errorCounter = 0;

	    $(".required").each(function(i, obj) {

	        if($(this).val() === ''){
	            $(this).parent().addClass("has-error");
	            errorCounter++;
	        } else{ 
	            $(this).parent().removeClass("has-error"); 
	        }


	    });

	    return errorCounter;
	}

});