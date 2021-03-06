var serviceURL = "http://demo.bluapps.in/services_v2/";
//var serviceURL = "http://localhost/h_app_api/services_v2/";

var appname = "H App";
var version = "1.0";
localStorage.setItem("session_version", version);

function Login()
{
	if(localStorage.getItem("session_id_admin") == undefined)
	{
		$.mobile.changePage( "#login",null, true, true);
	}else
	{
		$.mobile.changePage( "#main",null, true, true);
	}
}

function LogOut()
{
	localStorage.removeItem("session_id_admin");
	localStorage.removeItem("session_name");
	localStorage.removeItem("session_org_name");
	localStorage.removeItem("session_validity");
	localStorage.removeItem("session_id_email_id");
	
	$.mobile.loading( 'show', {
		text: 'Logging Out ...',
		textVisible: true,
		theme: 'a',
		html: ""
	});	
	
	$.mobile.changePage( "#login",null, true, true);
	$("#app-status-ul").html('');
	$("#app-status-ul2").html('');
}

function ShowHome()
{	
	if(localStorage.session_id_admin == undefined)
	{
		$.mobile.changePage( "#login",null, true, true);
	}else
	{
		//alert('test');
		//name = localStorage.session_name;
		//balance = localStorage.session_id_balance;
		//alert(name);
		$.mobile.changePage( "#main",null, true, true);	
		$("#welcome_message").html('');
		//$("#welcome_message").append("<li>Welcome " + name + "</li>").listview("refresh");
		//$("#welcome_message").append("<li>Balance: Rs " + balance + "</li>").listview("refresh");				
		//$("#welcome_message").append("<li>Validity: " + dt2 + "</li>").listview("refresh");
		//$("#welcome_message").append('').listview("refresh");
	}
}

function ShowHome2()
{	
	if(localStorage.session_id_admin == undefined)
	{
		$.mobile.changePage( "#beforelogin",null, true, true);
	}else
	{
		//alert('test');
		name = localStorage.session_name;
		balance = localStorage.session_id_balance;
		//alert(name);
		$.mobile.changePage( "#main",null, true, true);	
		$("#welcome_message").html('');
		$("#welcome_message").append("<li>Welcome " + name + "</li>").listview("refresh");
		//$("#welcome_message").append("<li>Balance: Rs " + balance + "</li>").listview("refresh");				
		//$("#welcome_message").append("<li>Validity: " + dt2 + "</li>").listview("refresh");
		//$("#welcome_message").append('').listview("refresh");
	}
}

$(document).on('pageinit', '#beforelogin', function()
{  
	$(document).on('click', '#submit_login', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			username = document.getElementById("username").value;
			//password = document.getElementById("password").value;
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(username);
			//alert(password);

			//return false;
		  
			//if($('#username').val().length > 0 && $('#password').val().length > 0)
			if($('#username').val().length > 0)
			{
					//alert(localStorage.getItem("session_id_admin"));
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Checking Login ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
					
					//alert(serviceURL);
					url = serviceURL + 'pre_login/1';
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {membership_id: username, device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status == 'success') 
							{
								$.mobile.loading( "hide" );
								//alert('ok');
								//alert(result.status);
								//alert(result.message);
								$.mobile.changePage( "#login",null, true, true);
								//return false;
								//alert(username);
								$('#username2').val(username);
								showMessage(result.message,null,appname,'OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,appname,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					
					$.fixedToolbars.show();
					//$.mobile.loading( "show" );
						
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

$(document).on('pageinit', '#login', function()
{  
	$(document).on('click', '#submit_login2', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);
			  //document.getElementById("l_device_platform").value = localStorage.device_platform;
			  //document.getElementById("l_device_uuid").value = localStorage.device_uuid;
			  //document.getElementById("l_device_browser").value = localStorage.device_browser;		
			  
			 // alert($('#lform').serialize());
			username = document.getElementById("username2").value;
			password = document.getElementById("password").value;
			
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(username);
			//alert(password);

			//return false;
		  
			selected_club = $('#club_select').val();
			
			//alert(username);
			//alert(selected_club);
			
			if(selected_club == null)
			{
				alert('Please select Club'); return false;
			}
			if(username.length == 0)
			{
				alert('Enter User ID'); return false;
			}			
			if(password.length ==0)
			{
				alert('Please Enter Password'); return false;
			}		
			
			club_info = $("#club_select :selected").text();
			//alert(club_info); return false;
			localStorage.setItem("session_club_info", club_info);
			
			if($('#username2').val().length > 0 && $('#password').val().length > 0)
			{
					//alert(localStorage.getItem("session_id_admin"));
					// Send data to server through the Ajax call
					// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Checking Admin Login ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
					
					//alert(serviceURL);
					//url = serviceURL + 'adm_login/1';
					url = serviceURL + 'adm_login/' + selected_club;
					//alert(url);//return false;
					
					$.ajax({url: url,
						data: {user_id: username, pass: password, device_id: device_id, device_platform: device_platform, device_browser: device_browser, ver: session_version},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status == 'success') 
							{
								$.mobile.loading( "hide" );
								//alert('ok');
								//alert(result.status);
								//alert(result.message);
								//alert(result.data.name);
								//alert(result.data.email);
								//alert(result.data.mobileno);
								//alert(result.data.mem_validity);
								//alert(result.data.balance);
								session_id = result.data.session_id;
								//alert(result.data.session_id);
								//alert(Object.keys(result.data.session_id).length);
								//docname = result[0].tender_doc_file[j].doc_type;
								
								//alert(result.name);
								//alert(dt2);return false;
								
								//$.mobile.changePage( "#beforelogin",null, true, true);
								//return false;
								localStorage.setItem("session_id_username", username);
								localStorage.setItem("session_id_admin", session_id);
								localStorage.setItem("session_name", result.data.name);
								localStorage.setItem("session_mobileno", result.data.mobileno);
								localStorage.setItem("session_member_id", result.data.member_id);
								//localStorage.setItem("session_validity", result.data.mem_validity);
								localStorage.setItem("session_id_email_id", result.data.email);
								localStorage.setItem("session_id_club_id", selected_club);
								//localStorage.setItem("session_id_balance", result.data.balance);
								
								//alert(result.email_id);
								//$.mobile.changePage("#second");                         
								
								//alert(result.message);

								$.mobile.changePage( "#main",null, true, true);
								$("#welcome_message").html('');
								$("#welcome_message").append("<li>Welcome " + result.data.name + "</li>").listview("refresh");
								//$("#welcome_message").append("<li>Validity: " + dt2 + "</li>").listview("refresh");
								//$("#welcome_message").append("<li>Balance: Rs " + result.data.balance + "</li>").listview("refresh");								
								if(diff2>0 && diff2<=30)
								{
									username = localStorage.session_id_username;
									//alert('<li><a href="#" onclick="Renew(' + "'" + username + "'" + ');return false;">' + "Renew Subscription" +'</a> </li>');
									//$("#welcome_message").append('<li><a href="#" onclick="Renew(' + "'" + username + "'" + ');return false;">' + "Renew Subscription" +'</a> </li>').listview("refresh");
								}									
								showMessage(result.message,null,'Welcome','OK');
								
							} else 
							{
								//alert(result.message);
								$.mobile.loading( "hide" );								
								showMessage(result.message,null,appname,'OK');
								//alert('Logon unsuccessful!');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
							$.mobile.loading( "hide" );	
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					
					$.fixedToolbars.show();
					//$.mobile.loading( "show" );
						
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function ValidateStart()
{
   cordova.plugins.barcodeScanner.scan(
      function (result)
	  {
          //alert("We got a barcode\n" +
           //     "Result: " + result.text + "\n" +
           //     "Format: " + result.format + "\n" +
           //     "Cancelled: " + result.cancelled);
		   
		   //alert("Result: " + result.text);
		   if(result.text != '')
		   {
				//alert("Got Data");
				
				//showMessage("Got Data "+ result.text,null,appname,'OK');
				//CheckTicket(result.text);
				TicketShow(result.text)
				
				//$.mobile.changePage( "#barcode",null, true, true);
				//$("#barcodeid").val(result.text);
				
				//CheckTicket(result.text);
		   }else
		   {
			   //alert("Scanning failed - no data collected ");
			   showMessage("Scanning failed - no data collected ",null,appname,'OK');
		   }
	
      }, 
      function (error) {
          //alert("Scanning failed: " + error);
		  showMessage("Scanning failed: " + error,null,appname,'OK');
      }
   );
   
}   

function ValidateStart1()
{
	ticket = "3-Tb3c4e2b45f58f856d368e5957bea23";
   	$.mobile.changePage( "#barcode",null, true, true);
	$("#barcodeid").val(ticket);
	//$("#barcodeid").val(localStorage.session_id_admin);
	
   
} 

$(document).on('pageinit', '#barcode', function()
{  
	$(document).on('click', '#submit_barcode', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');
			//alert(localStorage.device_uuid);

			 // alert($('#lform').serialize());
			barcodeid = document.getElementById("barcodeid").value;
			//alert(barcodeid);
			//CheckTicket(barcodeid);
			TicketShow(barcodeid);
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function CheckTicket(barcodeid)
{		

	device_id= localStorage.device_uuid;
	device_platform= localStorage.device_platform;
	device_browser= localStorage.device_browser;
	session_version= localStorage.session_version;
	
	//alert(password);

	//return false;
  
	//if($('#barcodeid').val().length > 0 && $('#password').val().length > 0)
	//if($('#barcodeid').val().length > 0)
	//alert(barcodeid);
	//alert(barcodeid.val().length);
	
	if(barcodeid != '')
	{
		//alert(localStorage.getItem("session_id_admin"));
		// Send data to server through the Ajax call
		// action is functionality we want to call and outputJSON is our data

		$.mobile.loading( 'show', {
			text: 'Checking Barcode ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});	
		
		//alert(serviceURL);
		url = serviceURL + 'barcode/' + localStorage.session_id_club_id;;
		//alert(url);//return false;
		var session = localStorage.session_id_admin;
		//alert(session);
		
		$.ajax({url: url,
			data: { barcode: barcodeid, session: session, member_id: localStorage.session_member_id, device_id: device_id, device_platform: device_platform, ver: session_version, device_browser: device_browser},
			type: 'post',                   
			async: 'true',
			dataType: 'json',
			beforeSend: function() {
				// This callback function will trigger before data is sent
				//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
				$.mobile.loading( "show" );
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
			   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
				$.mobile.loading( "hide" );
			},
			success: function (result) {
				if(result.status == 'success') 
				{
					$.mobile.loading( "hide" );
					//alert('ok');
					//alert(result.status);
					//alert(result.message);
					$.mobile.changePage( "#main",null, true, true);
					//return false;
					//alert(username);
					//$('#username2').val(username);
					showMessage(result.message,null,appname,'OK');
					//ShowHome();
					
				} else 
				{
					//alert(result.message);
					$.mobile.loading( "hide" );								
					showMessage(result.message,null,appname,'OK');
					//alert('Logon unsuccessful!');
				}
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action                
				//alert('Please check your data connection!');
				showMessage('Please check your data connection!',null,'Error','OK');
				$.mobile.loading( "hide" );	
			}
		});                   
	}
}

function TicketShow(barcodeid)
{
	//Showmyid(1, 'Anil', '10 jan 2017', 'O', 'Mishra', 'EMP Kandivali', '191199', '818181', '2525 2255 2662 8181', 'http://localhost/push/h/clientkk/images/anil.png', '0', 'template1');
	
		//alert(serviceURL);
		url = serviceURL + 'barcode/' + localStorage.session_id_club_id;;
		//barcodeid = '115-1-GSJNH';
		device_id= localStorage.device_uuid;
		device_platform= localStorage.device_platform;
		device_browser= localStorage.device_browser;
		session_version= localStorage.session_version;
		//alert(url);//return false;
		var session = localStorage.session_id_admin;
		var details = '';
		//alert(session);
		
		$.ajax({url: url,
			data: { barcode: barcodeid, session: session, member_id: localStorage.session_member_id, device_id: device_id, device_platform: device_platform, ver: session_version, device_browser: device_browser},
			type: 'post',                   
			async: 'true',
			dataType: 'json',
			beforeSend: function() {
				// This callback function will trigger before data is sent
				//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
				$.mobile.loading( "show" );
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
			   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
				$.mobile.loading( "hide" );
			},
			success: function (result) {
				if(result.status == 'success') 
				{
					$.mobile.loading( "hide" );
					//alert('ok');
					//alert(result.status);
					//alert(result.message);
					details += result.data.service_name + '<br>';
					details += 'Booking Date: ' + result.data.datec + '<br>';
					if(result.data.ticket_type == 'M')
					{
						ticket_type = 'Member';
					}
					if(result.data.ticket_type == 'G')
					{
						ticket_type = 'Guest';
					}					
					details += 'Ticket Type: ' + ticket_type + ' (' + result.data.no_of_member +  ')<br>';
					details += 'Service Date: ' + result.data.service_date + ' (' + result.data.timing +  ')<br>';
					//details += 'Booking Date: ' + result.data.datec + '<br>';
					if(result.data.court_name.length>0)
					{
							details += 'Court: ' + result.data.court_name + '<br>';
					}					
					Showmyid(result.data.name, result.data.mem_photo, details, result.data.membership_id, result.data.mem_validity, '0', 'template1');
					//$.mobile.changePage( "#main",null, true, true);
					//return false;
					//alert(username);
					//$('#username2').val(username);
					//showMessage(result.message,null,appname,'OK');
					//ShowHome();
					
				} else 
				{
					//alert(result.message);
					$.mobile.loading( "hide" );								
					showMessage(result.message,null,appname,'OK');
					//alert('Logon unsuccessful!');
				}
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action                
				//alert('Please check your data connection!');
				showMessage('Please check your data connection!',null,'Error','OK');
				$.mobile.loading( "hide" );	
			}
		});        
}

function Showmyid(name, image, details, cardno, validity, val_status, template)
{
		//alert(id);
		//alert(name);
		name = urldecode(name);
		cardno = urldecode(cardno);
			
		var v_class = '';
		
		//myidcard =' <a href="#" onclick="ClosePopup();" class="ncp-popup-close">X</a>	';	
		myidcard =' <a href="#" data-rel="back" class="ncp-popup-close">X</a>	';	
		myidcard +='			<div class="ncp-popup-container ' + v_class + '">';
		//myidcard += '			<img width="50" height="50" src="images/' + typeimage + '" class="premium" align="right">';
		myidcard += '		 <div class="clear"></div>';
		myidcard += '		<div class="ncp-popup-content roundinner spopup" align="center">';
		myidcard += '		<img width="120" height="120" src="' + image + '" align="center">';
		myidcard += '			<h1 class="stitle1">' + name +'</h1>';
		
		// if(m_type != 'O')
		// {
			// myidcard += '			<h5 class="h5">Valid upto : ' + validity + '</h5>';
		// }
		myidcard += '			<p class="showid">';
		//myidcard += '			 <span id="myidshow">';
		myidcard += details + '<br/><br/>';
	
		myidcard += '				<strong class="cardnumber">' + cardno + '</strong>';
		//myidcard += '			 </span>';
					 
		myidcard += '			</p>';
		myidcard += '		</div>';
		myidcard += '	</div>';
		//alert(myidcard);
		console.log(myidcard);
		
		//alert(template);
		if(template == 'template1')
		{
			$("#myidshow1").html(myidcard);
			$("#ShowmyID1").popup( "open" );
		}
		
		//alert(myidcard);return false;
		
}

function TicketHistory()
{
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_admin;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/history_ticket/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	url = serviceURL + 'history_ticket/' + localStorage.session_id_club_id;
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Ticket ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_admin);
			
			$.mobile.changePage( "#search_result_afterlogin_list",null, true, true);
			$("#sum_list_afterlogin_list").html('');
			
			for(i=0; i<Object.keys(result.data.service).length; i++)
			{
				service_id = result.data.service[i].service_id;
				service_name = result.data.service[i].service_name;
				service_logo = result.data.service[i].ticket_logo;
				s_validity = result.data.service[i].s_validity;
				sticket_id = result.data.service[i].sticket_id;
				ticket_no = result.data.service[i].ticket_no;
				ticket_type = result.data.service[i].ticket_type;
				no_of_member = result.data.service[i].no_of_member;
				mu_id = result.data.service[i].mu_id;
				member_id = result.data.service[i].member_id;
				chargeable = result.data.service[i].chargeable;
				//charges = result.data.service[i].charges;
				comments = result.data.service[i].comments;
				datec = result.data.service[i].datec;
				used_time = result.data.service[i].used_time;
				name = result.data.service[i].name;
				
				ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
				//ticket_url = '';
				img = '<img src="' + ticket_url + '" >';
				console.log(service_name);
				console.log(img);
				//service_name,datec,s_validity
				//console.log("<li><a href=\"#\" onclick=\"TicketID(" + "'" + ticket_no + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "'" + ");return false;\">" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "</a></li>");
				
				$("#sum_list_afterlogin_list").append("<li><a href=\"#\">Service: " + service_name + "<br>Member: " + name + "<br>Booking Date: " + datec + "<br>Checking Date: " + used_time + "<br>No of Member: " + no_of_member + "<br>Validity: " + s_validity + "</a></li>").listview("refresh");
				//$("#sum_list_afterlogin_list").append("<li>" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "<br>" + "</li>").listview("refresh");
									
				//console.log(result[0][i].Location);
				
				//$("#sum_list_afterlogin_list").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
			}
			if(i == 0)
			{
				//alert('no ticket');
				$("#sum_list_afterlogin_list").append("<li><center>Active Ticket is not available.</center></li>").listview("refresh");
			}
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}
	
function ListServices()
{	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_admin;
	//alert(searchparam);
	//return false;
	//http://localhost/h_app/services/list_services/1?session=HA2762630b44f339a768eacc488029ef4d4943a83d
	url = serviceURL + 'list_services/1'
	
	//alert(url);
	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Getting Service List ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_admin);
			
			$.mobile.changePage( "#search_result_afterlogin_book",null, true, true);
			$("#sum_list_afterlogin_book").html('');
			
				for(i=0; i<Object.keys(result.data.service).length; i++)
				{
					service_id = result.data.service[i].service_id;
					service_name = result.data.service[i].service_name;
					service_logo = result.data.service[i].service_logo;
					s_validity = result.data.service[i].s_validity;
					chargeable = result.data.service[i].chargeable;
					charges = result.data.service[i].charges;
					comments = result.data.service[i].comments;
					
					img = '<img src="' + service_logo + '" height="50">';
					console.log(service_name);
					console.log(img);
					console.log(charges);
					
					console.log("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>");
					$("#sum_list_afterlogin_book").append("<li><a href=\"#\" onclick=\"SetBookID(" + service_id + ",'" + service_name + "','" + chargeable + "'," + charges + ");return false;\">" + img + " " + service_name + "<br> Rs " + charges  + "</a></li>").listview("refresh");
					//$("#sum_list_afterlogin_book").append("<li>" +  img + " " + service_name + "<br> Rs " + charges + "</li>").listview("refresh");
										
					//console.log(result[0][i].Location);
					
					//$("#sum_list_afterlogin_book").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
				}

		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function SetBookID(service_id,service_name,chargeable,charges)
{
	//alert(service_id);
	//alert(service_name);
	//alert(chargeable);
	//alert(charges );
	$("#priceid").html('Rs ' + charges);
	$("#service_id").val(service_id);
	$("#service_name").val(service_name);
	$("#chargeable").val(chargeable);
	$("#charges").val(charges);
}

function BookServices()
{		
	service_id = $("#service_id").val();
	charges = $("#charges").val();
	chargeable = $("#chargeable").val();
	service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_admin + "&service_id="+ service_id;
	//alert(searchparam);
	
	if(charges == '')
	{
		//alert('Please select service before clicking on book');
		showMessage('Please select service before clicking on book',null,'Error','OK');
		return false;
	}else
	{
		alert('Booking ' + service_name);
	}
	//return false;
	//http://localhost/h_app/services/deduct_wallet/1?session=HA2762630b44f339a768eacc488029ef4d4943a83d&service_id=1

	url = serviceURL + 'deduct_wallet/1'
	
	//alert(url);
	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Loading Services ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			alert(result.message);
			//alert(result.data.balance);
			console.log(result.message);
			localStorage.setItem("session_id_balance", result.data.balance);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			ListTicket(1);
	
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_admin);
			
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function ListTicket(last)
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_admin;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/list_ticket/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	url = serviceURL + 'list_ticket/1'
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Ticket ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_admin);
			
			$.mobile.changePage( "#search_result_afterlogin_list",null, true, true);
			$("#sum_list_afterlogin_list").html('');
			
			if(last == '1')
			{
					service_id = result.data.service[0].service_id;

					service_name = result.data.service[0].service_name;
					sticket_id = result.data.service[0].sticket_id;
					ticket_no = result.data.service[0].ticket_no;
					service_logo = result.data.service[0].ticket_logo;
					s_validity = result.data.service[0].s_validity;
					chargeable = result.data.service[0].chargeable;
					//charges = result.data.service[0].charges;
					datec = result.data.service[0].datec;
					comments = result.data.service[0].comments;

					ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
					//ticket_url = '';
					img = '<img src="' + ticket_url + '" >';
					console.log(service_name);
					console.log(img);
					//alert(img);
					//console.log(charges);
					//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
					
					//alert('generating qr code');
					//TicketID(ticket_no);
					
					$("#sum_list_afterlogin_list").append("<li><center>Service: " +  service_name + "<br>Date of Booking: <br>" + datec + "<br>Validity: " + s_validity + "<br><br>" + img + "</center></li>").listview("refresh");
			}
			else
			{
				for(i=0; i<Object.keys(result.data.service).length; i++)
				{
					service_id = result.data.service[i].service_id;
					service_name = result.data.service[i].service_name;
					service_logo = result.data.service[i].ticket_logo;
					s_validity = result.data.service[i].s_validity;
					sticket_id = result.data.service[i].sticket_id;
					ticket_no = result.data.service[i].ticket_no;
					chargeable = result.data.service[i].chargeable;
					//charges = result.data.service[i].charges;
					comments = result.data.service[i].comments;
					datec = result.data.service[i].datec;
					
					ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
					//ticket_url = '';
					img = '<img src="' + ticket_url + '" >';
					console.log(service_name);
					console.log(img);
					//service_name,datec,s_validity
					console.log("<li><a href=\"#\" onclick=\"TicketID(" + "'" + ticket_no + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "'" + ");return false;\">" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "</a></li>");
					
					$("#sum_list_afterlogin_list").append("<li><a href=\"#\" onclick=\"TicketID(" + "'" + ticket_no + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "'" + ");return false;\">" + service_name + "<br>Date of Booking: <br>" + datec + "<br>Validity: " + s_validity + "</a></li>").listview("refresh");
					//$("#sum_list_afterlogin_list").append("<li>" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "<br>" + "</li>").listview("refresh");
										
					//console.log(result[0][i].Location);
					
					//$("#sum_list_afterlogin_list").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
				}
				if(i == 0)
				{
					//alert('no ticket');
					$("#sum_list_afterlogin_list").append("<li><center>Active Ticket is not available.</center></li>").listview("refresh");
				}
			}

		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function TransTicket()
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_admin;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/trans_history/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	url = serviceURL + 'trans_history/1'
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Ticket ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_admin);
			
			$.mobile.changePage( "#search_result_afterlogin_list",null, true, true);
			$("#sum_list_afterlogin_list").html('');
			
			for(i=0; i<Object.keys(result.data.service).length; i++)
			{
				service_id = result.data.service[i].service_id;
				service_name = result.data.service[i].service_name;
				service_logo = result.data.service[i].ticket_logo;
				s_validity = result.data.service[i].s_validity;
				sticket_id = result.data.service[i].sticket_id;
				ticket_no = result.data.service[i].ticket_no;
				chargeable = result.data.service[i].chargeable;
				//charges = result.data.service[i].charges;
				comments = result.data.service[i].comments;
				datec = result.data.service[i].datec;
				
				ticket_url = serviceURL + 'genqr?ticket_no=' + sticket_id;
				//ticket_url = '';
				img = '<img src="' + ticket_url + '" >';
				console.log(service_name);
				console.log(img);
				//service_name,datec,s_validity
				console.log("<li><a href=\"#\" onclick=\"TicketID(" + "'" + ticket_no + "'," + "'" + service_name + "'," + "'" + datec + "'," + "'" + s_validity + "'" + ");return false;\">" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "</a></li>");
				
				$("#sum_list_afterlogin_list").append("<li>" + service_name + "<br>Date of Booking: <br>" + datec + "<br>Validity: " + s_validity + "</li>").listview("refresh");
				//$("#sum_list_afterlogin_list").append("<li>" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "<br>" + "</li>").listview("refresh");
									
				//console.log(result[0][i].Location);
				
				//$("#sum_list_afterlogin_list").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
			}
			if(i == 0)
			{
				//alert('no ticket');
				$("#sum_list_afterlogin_list").append("<li><center>Active Ticket is not available.</center></li>").listview("refresh");
			}
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function TicketID(ticket_no, service_name,datec,s_validity )
{
	//alert('test' + ticket_no);
		//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
		ticket_url = serviceURL + 'genqr?ticket_no=' + ticket_no;
		//ticket_url = '';
		img = '<img src="' + ticket_url + '" >';
		console.log(service_name);
		console.log(img);
		//alert(img);
		//console.log(charges);
		//$("#sum_list_afterlogin").append("<li><a href=\"#\" onclick=\"ShowDetail(" + result[0][i].site_tender_id + ");return false;\">" + result[0][i].site_tender_id  + " Detail</a></li>").listview("refresh");
		
		//alert('generating qr code');
		//TicketID(ticket_no);
		
		$.mobile.changePage( "#search_result_afterlogin_list",null, true, true);
		$("#sum_list_afterlogin_list").html('');
			
		$("#sum_list_afterlogin_list").append("<li><center>Service: " + service_name + "<br>Date of Booking: <br>" + datec + "<br>Validity: " + s_validity + "<br><br>" + img + "</center><li>").listview("refresh");
}

function RechargeHistory()
{		
	//service_id = $("#service_id").val();
	//charges = $("#charges").val();
	//chargeable = $("#chargeable").val();
	//service_name = $("#service_name").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_admin;
	//alert(searchparam);
	
	//return false;
	//http://localhost/h_app/services/trans_history/1?session=HA8ca047471e1c0810733849d1a3d13a013be6986d		
	url = serviceURL + 'recharge_history/1'
	//alert(url);

	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Listing Recharges ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//return false;
			//alert(result.data.balance);
			console.log(result.message);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//return false;
			//alert(result.S_ID);
			//alert(result.Offset);
			//alert(result.Total);
			//alert(newtotal);
			//return false;
			
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_admin);
			
			$.mobile.changePage( "#search_result_recharge_history",null, true, true);
			$("#sum_list_recharge_history").html('');
			
			for(i=0; i<Object.keys(result.data.service).length; i++)
			{
				tran_amt = result.data.service[i].tran_amt;
				aval_bal = result.data.service[i].aval_bal;
				datec = result.data.service[i].datec;
				comments = result.data.service[i].comments;

				$("#sum_list_recharge_history").append("<li>Source: " + comments + "<br>Date of Recharge: <br>" + datec + "<br>Amount: " + tran_amt + "</li>").listview("refresh");
				//$("#sum_list_recharge_history").append("<li>" + service_name + "<br>Date of Booking: " + datec + "<br>Validity: " + s_validity + "<br>" + "</li>").listview("refresh");
									
				//console.log(result[0][i].Location);
				
				//$("#sum_list_recharge_history").append("<li style='padding-top: 10px; padding-bottom: 10px'></li>").listview("refresh");
			}
			if(i == 0)
			{
				//alert('no ticket');
				$("#sum_list_recharge_history").append("<li><center>Recharge History not available.</center></li>").listview("refresh");
			}
		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        
}

function Recharge()
{	
		charges = 100;
		service_id =1;

		$.mobile.changePage("#search_result_afterlogin_recharge",null, true, true);
		$("#sum_list_afterlogin_recharge").html('');
		
		//alert('aa');
		console.log("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>");
		$("#sum_list_afterlogin_recharge").append("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>").listview("refresh");

		charges = 500;

		$("#sum_list_afterlogin_recharge").append("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>").listview("refresh");
		
		charges = 1000;
		$("#sum_list_afterlogin_recharge").append("<li><a href=\"#\" onclick=\"RecharegAmt(" + charges + ");return false;\">" + "<br> Rs " + charges  + "</a></li>").listview("refresh");

}

function RecharegAmt(charges)
{
		$("#priceid_recharge").html('Rs ' + charges);

		$("#rechargeamt").val(charges);
		//alert("recharge with " + charges);
		showMessage("Recharging with " + charges,null,'App','OK');
}

function RechargeFinal()
{		
	rechargeamt = $("#rechargeamt").val();
	
	searchparam = "device_id=" + localStorage.device_uuid + "&device_platform=" +localStorage.device_platform + "&device_browser=" + localStorage.device_browser + "&session="+ localStorage.session_id_admin + "&amt="+ rechargeamt;
	//alert(searchparam);
	
	if(rechargeamt == '')
	{
		//alert('Please select amount before clicking on recharge');
		showMessage("Please select amount before clicking on recharge",null,'App','OK');
		return false;
	}else
	{
		alert('Recharging ');
		//showMessage("Recharging Wallet ",null,'App','OK');
	}
	//return false;
	//http://localhost/h_app/services/add_wallet/1?session=HA2762630b44f339a768eacc488029ef4d4943a83d&amt=100

	url = serviceURL + 'add_wallet/1'
	
	//alert(url);
	//return false;
	$.ajax({url: url ,
	data: searchparam,
	type: 'get',                   
	async: 'true',
	dataType: 'json',
	beforeSend: function() {
		// This callback function will trigger before data is sent
		//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
		//$.mobile.loading( "show" );
		$.mobile.loading( 'show', {
			text: 'Recharging ...',
			textVisible: true,
			theme: 'a',
			html: ""
		});
			
	},
	complete: function() {
		// This callback function will trigger on data sent/received complete
	   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
		$.mobile.loading( "hide" );
	},
	success: function (result) {
		if(result.status == 'success') 
		{		
			$.mobile.loading( "hide" );	
			//alert(result.message);
			//alert(result.data.balance);
			//showMessage(result.message,null,'App','OK');
			//showMessage("New Balance: " + result.data.balance,null,'App','OK');
			console.log(result.message);
			localStorage.setItem("session_id_balance", result.data.balance);
			//alert(Object.keys(result.data.service).length);
			//console.log(Object.keys(result.data.service));
			//alert(result[0][0].site_tender_id);
			//alert(localStorage.session_id_admin);
			
			$.mobile.changePage( "#search_result_afterlogin_thanks",null, true, true);
			$("#sum_list_afterlogin_thanks").html('');
			$("#sum_list_afterlogin_thanks").append("<li>Recharge Done for Rs " + rechargeamt + "</li>").listview("refresh");
			$("#sum_list_afterlogin_thanks").append("<li>Current Balance: Rs " + result.data.balance + "</li>").listview("refresh");

		} else 
		{
			//alert(result.message);
			$.mobile.loading( "hide" );	
			showMessage(result.message,null,'Error','OK');
			//alert('Logon unsuccessful!'); 
		}
	},
	error: function (request,error) {
		// This callback function will trigger on unsuccessful action                
		//alert('Please check your data connection!');
		$.mobile.loading( "hide" );	
		showMessage('Please check your data connection!',null,'Error','OK');
	}
});        	

}

$(document).on('pageinit', '#freetrial', function()
{  
	$(document).on('click', '#submit_free', function(e) 
	{ // catch the form's submit event

		if(e.handled !== true) // This will prevent event triggering more then once
		{		
			//alert('hi2');
			
			  document.getElementById("f_device_platform").value = localStorage.device_platform;
			  document.getElementById("f_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("f_device_browser").value = localStorage.device_browser;

			if($('#regname').val().length > 0 && $('#regemail').val().length > 0 && $('#org').val().length > 0 && $('#f_regcountry').val().length > 0 && $('#tel').val().length > 0 && document.getElementById("f_chk1").checked == true )
			{
				
					//alert($('#freeform').serialize());
					$.ajax({url: serviceURL + 'freesign.php',
						data: $('#freeform').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status) 
							{
								//localStorage.setItem("session_id_admin", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.changePage( "#thanks",null, true, true);
								$("#thanks_list").html('');
								$("#thanks_list").append("<li>" + result.message + "</li>").listview("refresh");;

							} else 
							{
								//alert('Technical error in free trial!'); 
								showMessage('Technical error',null,'Error','OK');
								$.mobile.loading( "hide" );	
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}           		
		
			e.handled = true;
		}
			return false; // cancel original event to prevent form submitting
    });    
});

$(document).on('pageinit', '#subscribe', function()
{  
	$(document).on('click', '#submit_signup', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("s_device_platform").value = localStorage.device_platform;
			  document.getElementById("s_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("s_device_browser").value = localStorage.device_browser;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#s_regname').val().length > 0 && $('#s_regemail').val().length > 0 && $('#s_add1').val().length > 0 && $('#s_org').val().length > 0 && $('#s_regcountry').val().length > 0 && $('#s_city').val().length > 0  && $('#s_tel').val().length > 0 && document.getElementById("s_chk1").checked == true )
				{
					//alert($('#signup_form').serialize());
					//return false;
					//alert($('#signup_form').serialize());
					$.ajax({url: serviceURL + 'signup.php',
						data: $('#signup_form').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							if(result.status) 
							{
								//localStorage.setItem("session_id_admin", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.loading( "hide" );	
								$.mobile.changePage( "#thanks",null, true, true);
								$("#thanks_list").html('');
								$("#thanks_list").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert('Technical error in Signup!'); 
								$.mobile.loading( "hide" );	
								showMessage('Technical error',null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});

function GetProfile()
{
	//alert('get profile');
	if(localStorage.session_id_admin == undefined)
	{
		alert("Please login to access this facility");
		return false;
	}
	session_id = localStorage.session_id_admin;
	device_id= localStorage.device_uuid;
	device_platform= localStorage.device_platform;
	device_browser= localStorage.device_browser;
	//alert(device_id);
	//alert('hhh');
  		$.ajax({url: serviceURL + 'get_profile.php',
		data: {session_id: session_id, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
		type: 'get',                   
		async: 'true',
		dataType: 'json',
		beforeSend: function() {
			// This callback function will trigger before data is sent
			//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			//$.mobile.loading( "show" );
			$.mobile.loading( 'show', {
				text: 'Getting Profile ...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
				
		},
		complete: function() {
			// This callback function will trigger on data sent/received complete
		   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
			$.mobile.loading( "hide" );
		},
		success: function (result) {
			if(result.status) 
			{
				//localStorage.setItem("session_id_admin", result.session_id);
				//$.mobile.changePage("#second");                         
				//alert(result.message);
				//alert(result.message);

				
				//alert(result.S_ID);
				//alert(result.Total);
				//alert(result[0][0].name);
				//alert(result[0].length);
				//alert(localStorage.session_id_admin);
				$.mobile.loading( "hide" );	
				
				if(result.Total >0)
				{
					//alert(result[0][0].name)
					$.mobile.changePage( "#profile",null, true, true);
					
					//$('#pr_regcountry').val($('#pr_regcountry option').eq(IN).val());
					$("#pr_regcountry").val(result[0][0].country);
					$("#pr_regcountry").selectmenu('refresh');
					
					document.getElementById("pr_session_id").value = localStorage.session_id_admin;
					document.getElementById("pr_device_platform").value = localStorage.device_platform;
					document.getElementById("pr_device_uuid").value = localStorage.device_uuid;
					document.getElementById("pr_device_browser").value = localStorage.device_browser;						
					
					document.getElementById("pr_regname").value = result[0][0].name;						
					document.getElementById("pr_regemail").value = result[0][0].email_id;						
					document.getElementById("pr_org").value = result[0][0].org_name;						
					document.getElementById("pr_add1").value = result[0][0].add1;						
					document.getElementById("pr_add2").value = result[0][0].add2;						
					document.getElementById("pr_city").value = result[0][0].city;						
					document.getElementById("pr_pincode").value = result[0][0].pincode;						
					//document.getElementById("pr_regcountry").selectedIndex  = result[0][0].country;						
					document.getElementById("pr_tel").value = result[0][0].tel;						
					document.getElementById("pr_url").value = result[0][0].url;						
					document.getElementById("pr_product").value = result[0][0].product_services;						
					document.getElementById("pr_operation").value = result[0][0].area_operation;						
					document.getElementById("pr_user_id").value = result[0][0].user_id;						
						
				
				}else
				{
					//alert(result.message);
					showMessage(result.message,null,'Error','OK');
				}
				//$( ":mobile-pagecontainer" ).pagecontainer( "change", "#second", { role: "page" } );
				//$.mobile.changePage( "panel.html", { transition: "slideup", changeHash: false });
				//$.mobile.changePage( "main.html",null, true, true);
				//$.mobile.changePage( "#main",null, true, true);
			} else 
			{
				//alert(result.message);
				showMessage(result.message,null,'Error','OK');
				//alert('Logon unsuccessful!'); 
			}
		},
		error: function (request,error) {
			// This callback function will trigger on unsuccessful action                
			//alert('Please check your data connection!');
			$.mobile.loading( "hide" );	
			showMessage('Please check your data connection!',null,'Error','OK');
		}
	});    
}

$(document).on('pageinit', '#profile', function()
{  
	$(document).on('click', '#profile_signup', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("pr_device_platform").value = localStorage.device_platform;
			  document.getElementById("pr_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("pr_device_browser").value = localStorage.device_browser;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#pr_regname').val().length > 0 && $('#pr_regemail').val().length > 0 && $('#pr_add1').val().length > 0 && $('#pr_org').val().length > 0 && $('#pr_regcountry').val().length > 0 && $('#pr_city').val().length > 0  && $('#pr_tel').val().length > 0 )
				{
					//alert($('#profile_form').serialize());
					//return false;
					//alert($('#profile_form').serialize());return false;
					$.ajax({url: serviceURL + 'update_profile.php',
						data: $('#profile_form').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							//alert(result.message);
							//alert(result.total);
							//alert(result.status);
							$.mobile.loading( "hide" );	
							if(result.status) 
							{
								//localStorage.setItem("session_id_admin", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								
								localStorage.setItem("session_name", $('#pr_regname').val());
								localStorage.setItem("session_org_name", $('#pr_org').val());
								
								$.mobile.changePage( "#thanks_afterlogin",null, true, true);
								$("#thanks_list_afterlogin").html('');
								$("#thanks_list_afterlogin").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert(result.message); 
								showMessage(result.message,null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					$.mobile.loading( "hide" );	
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});

$(document).on('pageinit', '#contact', function()
{  
	$(document).on('click', '#contact_button', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("c_username").value = localStorage.session_id_username;
			  document.getElementById("c_device_platform").value = localStorage.device_platform;
			  document.getElementById("c_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("c_device_browser").value = localStorage.device_browser;
			  document.getElementById("c_session_id").value = localStorage.session_id_admin;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#contname').val().length > 0 && $('#cont_email').val().length > 0 && $('#cont_info').val().length > 0 )
				{
					//alert($('#coform').serialize());
					//return false;
					//alert($('#coform').serialize());
					$.ajax({url: serviceURL + 'contact.php',
						data: $('#coform').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							$.mobile.loading( "hide" );	
							if(result.status) 
							{
								//localStorage.setItem("session_id_admin", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.changePage( "#thanks_afterlogin",null, true, true);
								$("#thanks_list_afterlogin").html('');
								$("#thanks_list_afterlogin").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert('Technical error in Contacting!'); 
								showMessage('Technical error',null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});

$(document).on('pageinit', '#email_alert', function()
{  
	$(document).on('click', '#email_button', function(e) 
	{ // catch the form's submit event
			
		if(e.handled !== true) // This will prevent event triggering more then once
		{			
			//alert('hi3');
			//alert($('#s_regname').val());
			//alert($('#s_regemail').val());

			  document.getElementById("e_username").value = localStorage.session_id_username;
			  document.getElementById("e_device_platform").value = localStorage.device_platform;
			  document.getElementById("e_device_uuid").value = localStorage.device_uuid;
			  document.getElementById("e_device_browser").value = localStorage.device_browser;
			  document.getElementById("e_session_id").value = localStorage.session_id_admin;

			  //alert(localStorage.device_uuid);
			  //alert(document.getElementById("s_device_uuid").value);
			  //alert($('#signup_form').serialize());
				if($('#emlname').val().length > 0 && $('#eml_email').val().length > 0 && $('#eml_days').val().length > 0 )
				{
					//alert($('#emaform').serialize());
					//return false;
					//alert($('#emaform').serialize());
					$.ajax({url: serviceURL + 'emailalert.php',
						data: $('#emaform').serialize(),
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							$.mobile.loading( "hide" );	
							if(result.status) 
							{
								//localStorage.setItem("session_id_admin", result.session_id);
								//$.mobile.changePage("#second");                         
								//alert(result.message);
								//alert(result.session_id);
								$.mobile.changePage( "#thanks_afterlogin",null, true, true);
								$("#thanks_list_afterlogin").html('');
								$("#thanks_list_afterlogin").append("<li>" + result.message + "</li>").listview("refresh");
								
							} else 
							{
								//alert('Technical error in Email Alert Request!'); 
								showMessage('Technical error',null,'Error','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action   
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK'); 
					//$.mobile.loading( "show" );
						
				}  
			
				e.handled = true;
			}			

			return false; // cancel original event to prevent form submitting
    });    
});


function sendID(id)
{
	device_id= localStorage.device_uuid;
	device_platform= localStorage.device_platform;
	device_browser= localStorage.device_browser;
	session_version= localStorage.session_version;
	user_id = localStorage.session_id_username;
	
	$.ajax({url: serviceURL + 'send.php',
		data: {id: id, device_id: device_id, device_platform: device_platform, device_browser: device_browser, user_id: user_id, ver: session_version},
		type: 'post',                   
		async: 'true',
		dataType: 'json',
		beforeSend: function() {
			// This callback function will trigger before data is sent
			//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			//$.mobile.loading( "show" );
		},
		complete: function() {
			// This callback function will trigger on data sent/received complete
		   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
			//$.mobile.loading( "hide" );
		},
		success: function (result) {
			if(result.status) 
			{
				//alert(result.message);
			} else 
			{
				//alert(result.message);
			}
		},
		error: function (request,error) {
			// This callback function will trigger on unsuccessful action                
			//alert('Please check your data connection!');
			showMessage('Please check your data connection!',null,'Error','OK');
		}
	});                 			
}

function callback(){}

function showMessage(message, callback, title, buttonName)
{

	title = title || "default title";
	buttonName = buttonName || 'OK';

	if(navigator.notification && navigator.notification.alert)
	{

		navigator.notification.alert(
			message,    // message
			callback,   // callback
			title,      // title
			buttonName  // buttonName
		);

	}else
	{
		alert(message);
		callback();
	}
}

function Renew(username)
{
	$.mobile.changePage( "#renewdiaglog", { role: "dialog" } );
	//showMessage('Renewing subscription ' + username ,null,'Error','OK');
	document.getElementById("renew_username").value = localStorage.session_id_username;
	document.getElementById("renew_email_id").value = localStorage.session_id_email_id;
	document.getElementById("renew_name").value = localStorage.session_name;
}

$(document).on('pageinit', '#renewdiaglog', function()
{  
	$(document).on('click', '#renew_login', function(e) 
	{ // catch the form's submit event
		
		if(e.handled !== true) // This will prevent event triggering more then once
		{
			//alert('Clicked');

			 // alert($('#lform').serialize());
			email_id = document.getElementById("renew_email_id").value;
			renew_name = document.getElementById("renew_name").value;
			username = document.getElementById("renew_username").value;
			//alert(name);
			device_id= localStorage.device_uuid;
			device_platform= localStorage.device_platform;
			device_browser= localStorage.device_browser;
			session_version= localStorage.session_version;
			//alert(username);
			//alert(password);

			//return false;
		  
			if($('#renew_email_id').val().length > 0 && $('#renew_name').val().length > 0)
			{
					//alert("test");
				// Send data to server through the Ajax call
				// action is functionality we want to call and outputJSON is our data

					$.mobile.loading( 'show', {
						text: 'Sending Request  ...',
						textVisible: true,
						theme: 'a',
						html: ""
					});	
			
					$.ajax({url: serviceURL + 'renew.php',
						data: {username: username, email_id: email_id, name: renew_name, device_id: device_id, device_platform: device_platform, device_browser: device_browser},
						type: 'post',                   
						async: 'true',
						dataType: 'json',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
							$.mobile.loading( "show" );
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
						   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
							$.mobile.loading( "hide" );
						},
						success: function (result) {
							$.mobile.loading( "hide" );	
							if(result.status) 
							{

								$.mobile.loading( "hide" );                    
								$("#renewdiaglog").dialog('close');
								//alert(result.message);
								showMessage(result.message,null,'Tendersinfo','OK');
								
							} else 
							{
								$.mobile.loading( "hide" );  
								//alert("ok");
								
								//$('[data-role=dialog]').dialog( "close" );
								$("#renewdiaglog").dialog('close');
								//alert('Logon unsuccessful!'); 
								showMessage(result.message,null,'Tendersinfo','OK');
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							//alert('Please check your data connection!');
							$.mobile.loading( "hide" );	
							showMessage('Please check your data connection!',null,'Error','OK');
						}
					});                   
				} else {
					//alert('Please fill all necessary fields');
					showMessage('Please fill all necessary fields',null,'Error','OK');
					//$( "[data-role='navbar']" ).navbar();
					//$( "[data-role='header'], [data-role='footer']" ).toolbar();
					//$( "[data-role='footer']" ).toolbar( "refresh" );
					
					//$.fixedToolbars.show();
					//$.mobile.loading( "show" );	
				}    
			
			e.handled = true;
		}
		
		return false; // cancel original event to prevent form submitting
	});    
});

function getAvailClub()
{
		//alert('a');
		var contact_details_id = '';
		
		url = serviceURL + 'getAvailClub';
					//alert(url);//return false;
					
		$.ajax({url: url,
			data: {},
			type: 'post',                   
			async: 'true',
			dataType: 'json',
			beforeSend: function() {
				// This callback function will trigger before data is sent
				//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
				$.mobile.loading( "show" );
			},
			complete: function() {
				//alert('d');
				// This callback function will trigger on data sent/received complete
			   // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
				$.mobile.loading( "hide" );
			},
			success: function (result) {
				//alert('e');
				if(result.status == 'success') 
				{
					$.mobile.loading( "hide" );
					//alert('ok');
					//alert(result.status);
			
					$('#club_select').empty();
					$('#club_select').append( new Option('Select Club *' ,'') );

					for(i2=0; i2<Object.keys(result.club).length; i2++)
					{
						//alert(result.services[i2].building_name);
						//alert(result.services[i2].wings);
						loc_id = result.club[i2].loc_id;
						club_name = result.club[i2].club_name;
						club_logo = result.club[i2].club_logo;
						city = result.club[i2].city;
						//alert(loc_id + " "  + club_name);
						
						
						$('#club_select').append( new Option(club_name + ', ' + city ,loc_id) );
						//wings = result.club[i2].wings;
						//alert(main_serv);
						
						//$('#data_wings').append( new Option(result.club[i2].wings,wings) );
					
					}
				//alert('1');
				//alert(JSON.stringify(result.club));
				
				$('#club_select option').each(function(){ 
				   if($(this).text() == 'Select Club *') 
						this.disabled=true;
				});
				$("#club_select")[0].selectedIndex = 0;	 
				$('#club_select').change();

					//showMessage(result.message,null,'Welcome','OK');
					
				} else 
				{
					//alert(result.message);
					$.mobile.loading( "hide" );								
					//showMessage(result.message,null,result.message,'OK');
					//alert('Logon unsuccessful!');
				}
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action                
				//alert('Please check your data connection!');
				//showMessage('Please check your data connection!',null,'Error','OK');
				$.mobile.loading( "hide" );	
			}
		});                   
}


function ExitApp()
{
	navigator.app.exitApp();
}

function urldecode(str) {
  //       discuss at: http://phpjs.org/functions/urldecode/
  //      original by: Philip Peterson
  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //      improved by: Lars Fischer
  //      improved by: Orlando
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //         input by: AJ
  //         input by: travc
  //         input by: Brett Zamir (http://brett-zamir.me)
  //         input by: Ratheous
  //         input by: e-mike
  //         input by: lovio
  //      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      bugfixed by: Rob
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //             note: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
  //             note: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
  //             note: pages served as UTF-8
  //        example 1: urldecode('Kevin+van+Zonneveld%21');
  //        returns 1: 'Kevin van Zonneveld!'
  //        example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
  //        returns 2: 'http://kevin.vanzonneveld.net/'
  //        example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
  //        returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
  //        example 4: urldecode('%E5%A5%BD%3_4');
  //        returns 4: '\u597d%3_4'

  return decodeURIComponent((str + '')
    .replace(/%(?![\da-f]{2})/gi, function() {
      // PHP tolerates poorly formed escape sequences
      return '%25';
    })
    .replace(/\+/g, '%20'));
}
