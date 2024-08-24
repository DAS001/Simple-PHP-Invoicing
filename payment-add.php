<?php
include('header.php');
include('functions.php');


?>

<script type="text/javascript" src="./includes/ajaxrequest.js">
</script>
<script type="text/javascript">
function onchangeCust(field, value)
  {
    var req = new AjaxRequest();
    req.setMethod('POST');
    var params = "table=invoices&field=" + encodeURIComponent(field) + "&value=" + encodeURIComponent(value);
    req.loadXMLDoc("getInvoiceDets.php", params);

	// onchgEntryLists("idReceive");
	// onchgSubmitList("idSubmit");
	// onchgSubmitList(frmMain.selSubmit.value);
	
  }
</script>

<h2>Add a Payment</h2>
<hr>

<div id="response" class="alert alert-success" style="display:none;">
	<a href="#" class="close" data-dismiss="alert">&times;</a>
	<div class="message"></div>
</div>
<?php
// Connect to the database
	$mysqli = new mysqli(DATABASE_HOST, DATABASE_USER, DATABASE_PASS, DATABASE_NAME);

	// output any connection error
	if ($mysqli->connect_error) {
		die('Error : ('.$mysqli->connect_errno .') '. $mysqli->connect_error);
	}

	// the query
  //  $query = "SELECT * 
?>
						
<div class="row">
	<div class="col-xs-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h4>Payment Details</h4>
			</div>
			<div class="panel-heading">
				<a href="#" class="float-right select-customer1"> Select An Existing Invoice</a>
				<div class="clear"></div>
			</div>
			<div class="panel-body form-group form-group-sm">
				<form method="post" id="add_payment">
					<input type="hidden" name="action" value="add_payment">

					<div class="row">
					  <div class="col-xs-4">
						<tr>
							<td align="left"  valign="top" width="300px" >
							</td>
							<td width="750px">
									<?php
										
										$query = "SELECT * FROM customers  Order By name;";
										echo "<select autofocus name=\"selCust\"  onchange=\"onchangeCust(this.name, this.value)\" id=\"field_Cust\" >";	
											// mysqli select query
										$results = $mysqli->query($query);

										$count = 1;
										
										if ($results) {
											while($row = $results->fetch_assoc()) {	
										
										
											if ( $count == 1 )
											{   echo  "<option value='0' selected>" . "Select the Customer" . "</option>";
											    $count = 2;
											}
											$ad_id = $row["id"];
											$ad_Name = $row["name"];
											$ad_Invoice = $row["invoice"];
											echo  "<option value='" . $ad_id . "'>" . $ad_Name  . "</option>";
								
										}
									}

									echo "</select>";	 

									$results->free();

									// close connection 
									$mysqli->close();

										
									?>
									</td><td><select><option>Select the invoice to pay</option>
										     </select>
									</select></td></tr>
									<tr><td colspan="2" height="10px"><hr></td>
										</tr>
									</div>	
					  
			  			<div class="col-xs-4">

							<input type="text" class="form-control required" name="payment_name" placeholder="Enter Payment Name">
						</div>
						<div class="col-xs-4">
							<input type="text" class="form-control required" name="payment_desc" placeholder="Enter Payment Description">
						</div>
						<div class="col-xs-4">
							<div class="input-group">
								<span class="input-group-addon"><?php echo CURRENCY ?></span>
								<input type="number" name="payment_price" class="form-control required" placeholder="0.00" aria-describedby="sizing-addon1">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12 margin-top btn-group">
							<input type="submit" id="action_add_payment" class="btn btn-success float-right" value="Add Payment" data-loading-text="Adding...">
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
<div>

	<div id="insert_payment" class="modal fade">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">Select An Existing Invoice</h4>
		      </div>
		      <div class="modal-body">
				<?php // popInvoiceListforCustomer(); ?>
		      </div>
		      <div class="modal-footer">
				<button type="button" data-dismiss="modal" class="btn">Cancel</button>
		      </div>
		    </div><!-- /.modal-content -->
		  </div><!-- /.modal-dialog -->
		</div><!-- /.modal -->


<?php
	include('footer.php');
?>