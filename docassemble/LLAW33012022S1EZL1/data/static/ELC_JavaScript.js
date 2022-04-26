// $('.navbar.fixed-top').replaceWith(
//   '<div style="overflow: hidden;"><iframe scrolling="no" src="https://ezralegal.com.au/contact-us/" style="border: 0px none;width: 99vw;"></iframe></div>'
// );

var ELC_step = 0;

$(document).on('daPageLoad', function () {
  // Question custom settings
  if ($('#ELC_questionControls').length > 0) {
    // Hiding elements
    if ($('#ELC_questionControls #hideElements').length > 0) {
      // hide any elements listed, can either be a custom name or css selector
      let elementToHide = $('#ELC_questionControls #hideElements').data(
        'elcHide'
      );
      elementToHide.forEach((element) => {
        switch (element) {
          case 'buttons':
            $('.da-field-buttons').hide();
            break;
          case 'radioOptions':
            $('.da-field-radio').closest('.form-group').hide();
            break;
          default:
            $(element).hide();
            break;
        }
      });
    }
  }
  const ELC_JS_disableAnimation = !!$(
    '#ELC_questionControls #animationOptions'
  ).data('elcAnimationDisabled');

  if (ELC_step == daSteps && !ELC_JS_disableAnimation) {
    const ELC_JS_customAnimationClass =
      $('#ELC_questionControls #animationOptions').data('elcAnimation') ??
      'ELC-animatingQuestionIn';

    $('#daquestion').addClass(ELC_JS_customAnimationClass);

    // $('.danavlinks').addClass('ELC-animatingStepsIn');
  }
  ELC_step = daSteps + 1;
  $('.navbar.fixed-top').replaceWith(
    `<nav class="container-fluid px-7 py-sm-4 py-5 px-4 ELC-header navbar navbar-expand-xl" style="
    justify-content: space-between;
">
    <img width="200" height="42" src="https://docassemble.flinders.edu.au/playgroundstatic/default/350/EL-logo-dark.png" class="mt-2"><button class="navbar-toggler navbar-dark bg-primary collapsed" type="button" data-toggle="collapse" data-target="#ELC-navbar" aria-controls="ELC-navbar" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="navbar-collapse navbar-dark bg-primary mt-2 collapse" id="ELC-navbar" style="flex-grow: 0;">
          <div class="navbar-nav">  
            <li class="nav-item">
              <a class="nav-link" href="https://ezralegal.com.au/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://ezralegal.com.au/news">News</a>
            </li>
            <li class="nav-item">
          <a class="nav-link" href="https://ezralegal.com.au/about-us/">About Us</a>
            </li>
            <li class="nav-item">
        <a class="nav-link" href="https://ezralegal.com.au/services/">Services</a> 
            </li>
      <li class="nav-item">
        <a class="nav-link" href="https://ezralegal.com.au/our-team/">Our Team</a> 
      </li>
      <li class="nav-item">
        <a class="nav-link" href="https://ezralegal.com.au/payments/">Payments</a> 
      </li>
      <li class="nav-item">
        <a class="nav-link" href="https://ezralegal.com.au/contact-us/">Contact Us</a>
      </li>
    </div></div>
</nav>`
  );

  $('footer.dafooter').replaceWith(
    `<footer class="ELC-footer bg-dark text-light"> 
      <div class="row">
        <div class="container pt-4 pb-4 text-center">
        <div>
        Liability limited by a scheme approved under professional standards legislation.
        </div>
        <div>
        
        2022 © Ezra Legal ABN: 53 865 480 425. All rights reserved.
        </div>
      
        </div>
      </div>
    </footer>`
  );

  /**
   * sliding question in/out and displaying progress bar
   */
  // Method 1
  // $('#daform').on('submit', () => {
  //   console.log(daValidator.numberOfInvalids());
  //   setTimeout(() => {
  //     if (daValidator.numberOfInvalids() == 0) {
  //       $('#daquestion').removeClass('ELC-animatingQuestionIn');
  //       $('#daquestion').addClass('ELC-animatingQuestionOut');
  //       // $('.danavlinks').removeClass('ELC-animatingStepsIn');
  //       // $('.danavlinks').addClass('ELC-animatingStepsOut');

  //       NProgress.start();
  //     }
  //   }, 1);
  // });
  // clearInterval(daCheckinInterval) // maybe clear interval to disable chat checkins?
  // or daStopCheckingIn()

  // seen != null or empty object
  // visibleElements != null or empty array
  // daValidator.invalid == {} or empty object
  // daValidator.numberOfInvalids() != 0
});

// Method 2
$(document).ajaxStart(() => {
  if (daSpinnerTimeout != null) {
    NProgress.start();
  }
});

$(document).ajaxStop(() => {
  // show progress bar at the top
  if (NProgress) {
    NProgress.done();
  }
});
