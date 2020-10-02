'use strict';

// url state


var onePage = 1;
var category = 'primary';
big_bang(onePage, category);

//call big bang by category

var primary = function primary() {
  category = 'primary';
  big_bang(onePage, category);
};
var social = function social() {
  category = 'social';
  big_bang(onePage, category);
};
var promotions = function promotions() {
  category = 'promotions';
  big_bang(onePage, category);
};
//call big bang by page number
var next_page = function next_page() {
  onePage = 2;
  big_bang(onePage, category);
};
var last_page = function last_page() {
  onePage = 1;
  big_bang(onePage, category);
};

//for single page avoid clicks
var box_star_value = false;

// function trashed_emails(x, name, message, date) {
//   const li = document.createElement('li')
//   const document.querySelector('mail-list-wrapper')
// }

function big_bang(onePage, category) {
  document.querySelector('#primary').className = '';
  document.querySelector('#social').className = '';
  document.querySelector('#promotions').className = '';
  document.querySelector('#' + category).className = 'active';

  fetch('https://polar-reaches-49806.herokuapp.com/api?page=' + onePage + '&category=' + category).then(function (res) {
    return res.json();
  }).then(function (res) {
    // state
    var state = {
      gmails: res.items,
      searched: [],
      page_info: res.items.length,
      deleted_email: [],
      checked_all_list: false
    };

    console.log(state.gmails[0]);

    // check select all
    document.querySelector('.check-all-emails').addEventListener('change', function () {
      var icon = document.querySelector('.select-trash-all-icon');
      state.checked_all_list = !state.checked_all_list;
      state.checked_all_list ? icon.style.display = 'block' : icon.style.display = 'none';
      mainLoop();
    });

    document.querySelector('.select-trash-all-icon').addEventListener('click', function () {
      for (var x = 0; x < state.gmails.length; x++) {
        localStorage.setItem("deleted" + x, "deleted" + x);
      }
      mainLoop();
    });
    document.querySelector('.refresh').addEventListener('click', function () {
      for (var x = 0; x < state.gmails.length; x++) {
        localStorage.removeItem("deleted" + x);
        localStorage.removeItem("readed" + x);
        localStorage.removeItem("star" + x);
        state.checked_all_list = false;
        document.querySelector('.check-all-emails').checked = false;
        mainLoop();
      }
    });

    var refreshing = document.querySelector('.refresh');
    var go_refreshing = document.createElement('i');
    refreshing.innerHTML = '';
    go_refreshing.className = 'fas fa-redo-alt';
    refreshing.appendChild(go_refreshing);

    var menu = document.querySelector('.menu');
    menu.addEventListener('click', function (e) {
      if (e.target.className.includes('trash')) {
        document.querySelector('.mail-list-wrapper').innerHTML = '';
        var holder = [];
        for (var x = 0; x < state.gmails.length; x++) {
          var get_id = localStorage.getItem('deleted' + x);
          if (get_id) {
            holder.push(state.gmails[x]);
            prepare_element(category, x, state.gmails[x].senderName, state.gmails[x].messageTitle, state.gmails[x].date, state.gmails[x].senderEmail, state.gmails[x].messages[0].message);
          }
        }

        state.gmails = holder;
      } else if (e.target.className.includes('spam')) {
        return;
      }
    });

    var ul = document.querySelector('.mail-list-wrapper');
    ul.innerHTML = '';

    if (onePage === 1) {
      var first_page = '1-' + state.page_info + ' of 76';
      document.querySelector('.page-info').innerHTML = first_page;
    } else {
      var tot = 50 + state.page_info;
      var _last_page = '50-' + tot + ' of ' + tot;
      document.querySelector('.page-info').innerHTML = _last_page;
    }

    // searching
    document.querySelector('.search-email-icon').addEventListener('click', function () {
      state.gmails = res.items;
      var txt = document.querySelector('#search').value;
      if (txt !== '') {
        var holder = [];
        for (var i = 0; i < state.gmails.length; i++) {
          if (txt === state.gmails[i].senderName) {
            holder.push(state.gmails[i]);
          }
        }
        state.gmails = holder;
        document.querySelector('.mail-list-wrapper').innerHTML = '';
        mainLoop();
      }
    });
    mainLoop();

    // looping each eamil
    function mainLoop() {
      document.querySelector('.mail-list-wrapper').innerHTML = '';
      for (var index = 0; index < state.gmails.length; index++) {
        var dd = localStorage.getItem('deleted' + index);
        if (dd) {} else {
          prepare_element(category, index, state.gmails[index].senderName, state.gmails[index].messageTitle, state.gmails[index].date, state.gmails[index].senderEmail, state.gmails[index].messages[0].message, state.checked_all_list);
        }
      }
    }
  });
}

function prepare_element(category, index, name, title, date, email, message, checked_ones) {
  var li = document.createElement('li');
  var dots = document.createElement('i');
  var checkbox_div = document.createElement('div');
  var check_box = document.createElement('input');
  var star_div = document.createElement('div');
  var star = document.createElement('i');
  var name_div = document.createElement('div');
  var sender_name = document.createElement('a');
  var title_div = document.createElement('div');
  var message_title = document.createElement('a');
  var email_date = document.createElement('a');

  var right_archive_div = document.createElement('div');
  var right_delete_div = document.createElement('div');
  var right_mark_div = document.createElement('div');
  var right_snooze_div = document.createElement('div');

  var right_archive = document.createElement('i');
  var right_delete = document.createElement('i');
  var right_mark = document.createElement('i');
  var right_snooze = document.createElement('i');

  // adding classes
  li.className = 'list-emails';
  dots.className = 'fas fa-th';
  checkbox_div.className = 'checkbox-div';
  star_div.className = 'star-div';
  star.className = 'far fa-star';
  name_div.className = 'name-div';
  title_div.className = 'title-div';
  check_box.className = 'email-check-box';
  check_box.type = 'checkBox';
  email_date.className = 'email-date';
  sender_name.style.color = 'black';
  message_title.style.color = 'color';
  email_date.style.color = 'black';

  if (checked_ones) {
    check_box.checked = true;
  }
  if (localStorage.getItem("star" + index)) {
    // star.style.background = 'orange';
    star.style.color = 'red';
  }
  if (localStorage.getItem("readed" + index)) {
    sender_name.style.color = 'silver';
    message_title.style.color = 'silver';
    email_date.style.color = 'silver';
  }

  // display text
  sender_name.innerHTML = name;
  message_title.innerHTML = title;
  email_date.innerHTML = '11: 02 AM';

  // deleting
  right_delete.addEventListener('click', function () {
    localStorage.setItem("deleted" + index, "deleted" + index);
    big_bang(onePage, category);
  });

  // star
  star_div.addEventListener('click', function () {
    if (localStorage.getItem("star" + index)) {
      localStorage.removeItem("star" + index);
    } else {
      localStorage.setItem("star" + index, "star" + index);
      big_bang(onePage, category);
    }
  });

  // append
  checkbox_div.appendChild(check_box);
  star_div.appendChild(star);
  name_div.appendChild(sender_name);
  title_div.appendChild(message_title);
  right_archive_div.appendChild(right_archive);
  right_delete_div.appendChild(right_delete);
  right_mark_div.appendChild(right_mark);
  li.appendChild(dots);
  li.appendChild(checkbox_div);
  li.appendChild(star_div);
  li.appendChild(name_div);
  li.appendChild(title_div);
  li.appendChild(email_date);

  li.appendChild(right_archive_div);
  li.appendChild(right_delete_div);
  li.appendChild(right_mark_div);
  var ul = document.querySelector('.mail-list-wrapper');
  ul.appendChild(li);

  // checkbox avoiding
  var box_star_value = false;
  checkbox_div.addEventListener('mouseover', function hover_box() {
    box_star_value = true;
  });
  checkbox_div.addEventListener('mouseleave', function leave_box() {
    box_star_value = false;
  });
  // star avoiding
  star_div.addEventListener('mouseover', function hover_star() {
    box_star_value = true;
  });
  star_div.addEventListener('mouseleave', function leave_star() {
    box_star_value = false;
  });
  right_archive_div.addEventListener('mouseover', function az() {
    box_star_value = true;
  });
  right_archive_div.addEventListener('mouseleave', function za() {
    box_star_value = true;
  });
  right_delete_div.addEventListener('mouseover', function fv() {
    box_star_value = true;
  });
  right_delete_div.addEventListener('mouseover', function fv() {
    box_star_value = true;
  });
  right_mark_div.addEventListener('mouseover', function azx() {
    box_star_value = true;
  });
  right_mark_div.addEventListener('mouseleave', function zaxx() {
    box_star_value = false;
  });
  right_delete_div.addEventListener('mouseover', function fxxxxv() {
    box_star_value = true;
  });
  right_delete_div.addEventListener('mouseleave', function fvscz() {
    box_star_value = false;
  });

  // setting attribute
  li.addEventListener('click', function () {
    if (!box_star_value) {
      localStorage.setItem("readed" + index, "readed" + index);
      single_page(index, name, title, date, email, message);
    }
  });

  // RIGHT ICONS
  li.addEventListener('mouseover', function hover_right_icons() {
    right_archive_div.className = 'right-archive-div';
    right_delete_div.className = 'right-delete-div';
    right_mark_div.className = 'right-mark-div';
    right_snooze_div.className = 'right-snooze-div';
    right_archive.className = 'fas fa-archive';
    right_delete.className = 'fas fa-trash-restore';
    right_mark.className = 'fas fa-envelope-open';
    right_snooze.className = 'fas fa-trash-restore';
  });
  li.addEventListener('mouseleave', function leave_right_icons() {
    right_archive_div.className = '';
    right_delete_div.className = '';
    right_mark_div.className = '';
    right_snooze_div.className = '';
    right_archive.className = '';
    right_delete.className = '';
    right_mark.className = '';
    right_snooze.className = '';
  });
}

//  SINGLE PAGE
function single_page(index, name, title, dat, email, message, box_star_value) {
  if (!box_star_value) {

    var go_back_div = document.querySelector('.check_select');
    var go_back = document.createElement('i');
    go_back_div.innerHTML = '';
    go_back.className = 'fas fa-reply';
    go_back_div.appendChild(go_back);
    go_back_div.addEventListener('click', function () {
      big_bang(onePage, category);
    });

    var parent = document.querySelector('.mail-list-wrapper');
    var wrapper = document.createElement('div');
    var user_icon = document.createElement('i');
    var info_div = document.createElement('div');
    var message_title = document.createElement('h2');
    var sender_email = document.createElement('a');
    var date = document.createElement('a');
    var star_div = document.createElement('div');
    var star = document.createElement('i');
    var reply_div = document.createElement('div');
    var reply = document.createElement('i');
    var dots_div = document.createElement('div');
    var dots = document.createElement('i');
    var _title = document.createElement('h3');

    parent.innerHTML = '';
    message_title.innerHTML = _title;
    sender_email.innerHTML = email;
    date.innerHTML = dat;
    _title.innerHTML = message;

    wrapper.className = 'single-page';
    user_icon.className = 'far fa-user-circle';
    info_div.className = 'info-div';
    star_div.className = 'single-star-div';
    star.className = 'far fa-star';
    reply_div.className = 'reply-div';
    reply.className = 'fas fa-reply';
    dots_div.className = 'dots-div';
    dots.className = 'fas fa-ellipsis-v';
    date.className = 'single-date';
    _title.className = 'single-title';

    info_div.appendChild(message_title);
    info_div.appendChild(sender_email);
    info_div.appendChild(date);
    star_div.appendChild(star);
    info_div.appendChild(star_div);
    reply_div.appendChild(reply);
    info_div.appendChild(reply_div);
    dots_div.appendChild(dots);
    info_div.appendChild(dots_div);
    info_div.appendChild(_title);

    wrapper.appendChild(user_icon);
    wrapper.appendChild(info_div);
    parent.appendChild(wrapper);
  }
}

//Compose pop-up
var compose = document.querySelector('.compose');
var pop = document.querySelector('.pop-up');

compose.addEventListener('click', function () {
  pop.style.display = "block";
});

pop.addEventListener('click', function (e) {
  if (e.target.className == "btn-close") pop.style.display = "none";
});