// $(window).on('load', function(){
// 	$('.loading').fadeOut();	
// });


$(window).on('load',function () {
    var now = new Date().getTime();
    if (now-time<=3000) {
      setTimeout('stopload()',5000-(now-time));
      return;
    } else {
      stopload();
    }
  });

  $(function(){
    setTimeout('stopload()',2000);
  });
  
  function stopload(){
    $('.loading').fadeOut();
  }