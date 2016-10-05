 $(document).ready(function() {
         
		  setInterval( function() {
				var seconds = new Date().getSeconds();
				var mins = new Date().getMinutes();
				var hours = new Date().getHours();
				var days = new Date().getDate();
				var month = new Date().getMonth() +1; //months start from 0
				var year = new Date().getFullYear();
				var sdegree = seconds * 6;
				var mdegree = mins * 6;
				var hdegree = hours * 30 + (mins / 2);
				var srotate = "rotate(" + sdegree + "deg)";
				var mrotate = "rotate(" + mdegree + "deg)";
				var hrotate = "rotate(" + hdegree + "deg)";

				$("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
				$("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});
				$("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});
				
				$("#date").text(days + '.' + month + '.' + year);
		  }, 1000 );
		  

	 
	}); 