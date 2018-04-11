function updateMenuFromRemote(data) {
  var identity_url = data.identity_url;
  var css = '<link href="'+identity_url+'/assets/menu.css" media="screen" rel="stylesheet" type="text/css"/>';
  $('#content-container').prepend(css);

  var appname = $('#icomera-menu-json').data('appname');
  appname = appname == "Web Suite" ? "Choose Application" : appname;

  var email = data.menu.email;

  var menu = '<div class="icomera-ajax-menu">'
           + '<div class="navbar navbar-inverse navbar-fixed-top">'
           + '<div class="navbar-inner">'
           + '<div class="container">'
           + '<a class="brand" href="' + identity_url + '/">Icomera</a>'
           + '<a href="' + identity_url + '/" class="home"></a>';

  if (!$.isEmptyObject(data.menu.links)) {
    menu += '<ul class="nav" role="navigation">'
          + '<li class="dropdown">'
          + '<a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">'
          + appname + " "
          + '<b class="caret"></b>'
          + '</a>'
          + '<ul class="dropdown-menu top-dropdown" role="menu" aria-labelledby="drop1">';

    $.each(data.menu.links, function(index, link) {
      if (appname.toLowerCase() === link.name.toLowerCase()) {
        menu += '<li role="presentation" class="active">';
      } else {
        menu += '<li role="presentation">';
      }
      menu += '<a role="menuitem" href="' + link.url + '">' + link.name + '</a>'
            + '</li>';
    });

    menu += '</ul>'
          + '</li>'
          + '</ul>';
  }

  var sel = data.menu.selector;
  if (!$.isEmptyObject(sel) && $.isEmptyObject(sel.list)) {
    if (email !== "" && (sel.required.customer_id || sel.required.account_id)) {
      var modal = '<div id="no-customer-modal" class="modal hide fade">'
                + '<div class="modal-body">'
                + '<p>An administrator needs to grant access to ';
         modal += (sel.required.account_id ? 'an account' : 'a customer');
         modal += ' before this service can be used.<br />'
                + 'If this message remains after 24 hours, please contact the administrator by sending an e-mail to '
                + '<a href="mailto:identity.support@icomera.com">identity.support@icomera.com</a>.</p>'
                + '</div>'
                + '</div>';
      $('body').prepend(modal);
      $('#no-customer-modal').modal({backdrop: false});
    }
  } else if (!$.isEmptyObject(sel) && !$.isEmptyObject(sel.list)) {
    var selected_customer = null;
    var selected_account = null;
    if (sel.selected.customer_id) {
      selected_customer = $.grep(sel.list, function(element, index) {
        return (element.id === sel.selected.customer_id);
      })[0];
      if (sel.selected.account_id) {
        selected_account = $.grep(selected_customer.accounts, function(element, index) {
          return (element.id === sel.selected.account_id);
        })[0];
      }
    }

    var hide_dropdown = false;
    if (sel.list.length === 1 && sel.list[0].accounts.length <= 1) {
      hide_dropdown = true;
    }

    menu += '<ul class="nav" role="navigation">';

    if (hide_dropdown) {
      menu += '<li>'
            + '<a href="#">'
            + (selected_customer ? selected_customer.name : 'Select customer') + ' '
            + (selected_customer && selected_account ? '(' + selected_account.name + ')' : '') + ' '
            + '</a>'
            + '</li>';
    } else {
      menu += '<li class="dropdown">'
            + '<a id="drop-customer" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">'
            + (selected_customer ? selected_customer.name : 'Select customer') + ' '
            + (selected_customer && selected_account ? '(' + selected_account.name + ')' : '') + ' '
            + '<b class="caret"></b>'
            + '</a>'
            + '<ul class="dropdown-menu top-dropdown" role="menu" aria-labelledby="drop-customer">';

      var return_to = encodeURIComponent($('#icomera-menu-json').data('return_to'));

      $.each(sel.list, function(customer_index, customer) {
        if ($.isEmptyObject(customer.accounts)) {
          if (selected_customer && selected_customer.id === customer.id) {
            menu += '<li role="presentation" class="active">';
          } else {
            menu += '<li role="presentation">';
          }
          menu += '<a role="menuitem" href="' + identity_url + '/user/select/' + customer.id + '?return_to=' + return_to + '">' + customer.name + '</a>'
                + '</li>';
        } else {
          if (selected_customer && selected_customer.id === customer.id) {
            menu += '<li role="presentation" class="active dropdown-submenu">';
          } else {
            menu += '<li role="presentation" class="dropdown-submenu">';
          }
          menu += '<a role="menuitem" href="#" class="dropdown-toggle">' + customer.name + '</a>'
                + '<ul class="dropdown-menu left-dropdown" role="menu" aria-labelledby="drop-account">';

          $.each(customer.accounts, function(account_index, account) {
            if (selected_customer && selected_account && selected_customer.id === customer.id && selected_account.id === account.id) {
              menu += '<li role="presentation" class="active">';
            } else {
              menu += '<li role="presentation">';
            }
            menu += '<a role="menuitem" href="' + identity_url + '/user/select/' + customer.id + '/' + account.id + '?return_to=' + return_to + '">' + account.name + '</a>'
                  + '</li>';
          });

          menu += '</ul>'
                + '</li>';
        }
      });

      menu += '</ul>'
            + '</li>';
    }

    menu += '</ul>';
  }

  menu += '<ul class="nav pull-right">';

  if(email === "")
    email = "Log in";

  if (appname.toLowerCase() === "identity") {
    menu += '<li class="active"><a href="' + identity_url + '/users/edit">' + email + '</a></li>';
  } else {
    menu += '<li><a href="' + identity_url + '/users/edit">' + email + '</a></li>';
  }

  if (email != "Log in") {
    menu += '<li><a href="' + identity_url + '/logout">'
          + 'Sign out'
          + '</a></li>'
  }

  menu += '</ul>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';

  if (!$.isEmptyObject(sel.required) &&
       ((sel.required.customer_id && !selected_customer) ||
        (sel.required.account_id && !selected_account))) {
    menu += '<div id="blockdiv"></div>';

    $('#blockdiv').click(function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.stopImmediatePropagation();
    });

    $(document).ready(function() {
      $('#drop-customer').popover({
        placement: 'bottom',
        trigger: 'manual',
        content: sel.required.account_id ? 'Please select a customer and account first.' : 'Please select a customer first.'
      });
      $('#drop-customer').click(function() {
        var open = $('#drop-customer').parent().hasClass('open');
        $('#drop-customer').popover(open ? 'show' : 'hide');
      });
      $('#drop-customer').popover('show');
    });
  }

  $('#content-container').prepend(menu);
}
;
