'use strict';

// call big bang by category
var primary = function primary() {
  big_bang('primary');
};
var social = function social() {
  big_bang('social');
};
var promotions = function promotions() {
  big_bang('promotions');
};
big_bang('primary');

function big_bang(category) {
  document.querySelector('#primary').className = '';
  document.querySelector('#social').className = '';
  document.querySelector('#promotions').className = '';
  document.querySelector('#' + category).className = 'active';

  fetch('https://polar-reaches-49806.herokuapp.com/api?page=1&category=' + category).then(function (res) {
    return res.json();
  }).then(function (res) {
    // state
    var state = {
      gmails: res.items,
      page: res.next.page,
      limit: res.next.limit,
      total: res.total,
      state: 'state.gmails.length',
      search_data: []
    };

    console.log(state.gmails[1]);

    var ul = document.querySelector('.mail-list-wrapper');
    var main_buttons = document.querySelector('.main-buttons');
    main_buttons.innerHTML = '';
    ul.innerHTML = '';
    var check_all = document.createElement('input');
    var outer_box = document.createElement('div');
    var outer_one = document.createElement('div');
    var outer_two = document.createElement('div');
    var select_all = document.createElement('i');
    var outer_refresh = document.createElement('div');
    var refresh = document.createElement('i');
    var outer_dots = document.createElement('div');
    var dottss = document.createElement('i');
    check_all.type = 'checkBox';
    outer_box.className = 'outer-box';
    outer_one.className = 'outer-one';
    outer_two.className = 'outer-two';
    select_all.className = 'fas fa-sort-down';
    outer_refresh.className = 'dots-div';
    outer_dots.className = 'dots-div ext';
    refresh.className = 'fas fa-sync-alt';
    dottss.className = 'fas fa-ellipsis-v';
    outer_one.appendChild(check_all);
    outer_two.appendChild(select_all);

    outer_box.appendChild(outer_one);
    outer_box.appendChild(outer_two);
    outer_refresh.appendChild(refresh);
    outer_dots.appendChild(dottss);

    main_buttons.appendChild(outer_box);
    main_buttons.appendChild(outer_refresh);
    main_buttons.appendChild(outer_dots);

    // search
    document.querySelector('.search-email-icon').addEventListener('click', searchIcon);
    function searchIcon() {
      ul.innerHTML = '';
      if (document.querySelector('#search').value === '') {
        return;
      }
      for (var index = 0; index < state.gmails.length; index++) {
        if (document.querySelector('#search').value === state.gmails[index].senderName) {
          var box_star_value;

          (function () {

            // single page

            var single_page = function single_page() {
              if (!box_star_value) {
                var id = this.getAttribute('page');
                var parent = document.querySelector('.main-emails-section');
                var wrapper = document.createElement('div');
                var user_icon = document.createElement('i');
                var info_div = document.createElement('div');
                var _message_title = document.createElement('h2');
                var sender_email = document.createElement('a');
                var date = document.createElement('a');
                var _star_div = document.createElement('div');
                var _star = document.createElement('i');
                var reply_div = document.createElement('div');
                var reply = document.createElement('i');
                var dots_div = document.createElement('div');
                var _dots = document.createElement('i');
                var title = document.createElement('h3');

                parent.innerHTML = '';
                _message_title.innerHTML = state.gmails[id].messageTitle;
                sender_email.innerHTML = state.gmails[id].senderEmail;
                date.innerHTML = state.gmails[id].date;
                title.innerHTML = state.gmails[id].messages[0].message;

                wrapper.className = 'single-page';
                user_icon.className = 'far fa-user-circle';
                info_div.className = 'info-div';
                _star_div.className = 'single-star-div';
                _star.className = 'far fa-star';
                reply_div.className = 'reply-div';
                reply.className = 'fas fa-reply';
                dots_div.className = 'dots-div';
                _dots.className = 'fas fa-ellipsis-v';
                date.className = 'single-date';
                title.className = 'single-title';

                info_div.appendChild(_message_title);
                info_div.appendChild(sender_email);
                info_div.appendChild(date);
                _star_div.appendChild(_star);
                info_div.appendChild(_star_div);
                reply_div.appendChild(reply);
                info_div.appendChild(reply_div);
                dots_div.appendChild(_dots);
                info_div.appendChild(dots_div);
                info_div.appendChild(title);

                wrapper.appendChild(user_icon);
                wrapper.appendChild(info_div);
                parent.appendChild(wrapper);
              }
            };

            // looping each eamil
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

            // display text
            sender_name.innerHTML = state.gmails[index].senderName;
            message_title.innerHTML = state.gmails[index].messageTitle;
            email_date.innerHTML = '11: 02 AM';

            // seting attribute
            li.setAttribute('page', index);
            li.addEventListener('click', single_page);

            // append
            checkbox_div.appendChild(check_box);
            star_div.appendChild(star);
            name_div.appendChild(sender_name);
            title_div.appendChild(message_title);
            right_archive_div.appendChild(right_archive);
            right_delete_div.appendChild(right_delete);
            right_mark_div.appendChild(right_mark);
            right_snooze_div.appendChild(right_snooze);
            li.appendChild(dots);
            li.appendChild(checkbox_div);
            li.appendChild(star_div);
            li.appendChild(name_div);
            li.appendChild(title_div);
            li.appendChild(email_date);

            li.appendChild(right_archive_div);
            li.appendChild(right_delete_div);
            li.appendChild(right_mark_div);
            li.appendChild(right_snooze_div);

            ul.appendChild(li);

            // avoid clicking list items
            box_star_value = false;

            // checkbox avoiding

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
            // right icons
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
          })();
        }
      }
    }

    // looping each eamil
    for (var index = 0; index < state.gmails.length; index++) {
      var dd = localStorage.getItem('deleted' + index);
      if (dd) {
        console.log(dd);
      } else {
        var box_star_value;

        (function () {
          var delete_one_email = function delete_one_email() {
            var del = this.getAttribute('del');
            localStorage.setItem("deleted" + del, "deleted" + del);
            big_bang(category);
          };

          // append


          // single page

          var single_page = function single_page() {
            if (!box_star_value) {
              var id = this.getAttribute('page');
              var parent = document.querySelector('.main-emails-section');
              var wrapper = document.createElement('div');
              var user_icon = document.createElement('i');
              var info_div = document.createElement('div');
              var _message_title2 = document.createElement('h2');
              var sender_email = document.createElement('a');
              var date = document.createElement('a');
              var _star_div2 = document.createElement('div');
              var _star2 = document.createElement('i');
              var reply_div = document.createElement('div');
              var reply = document.createElement('i');
              var dots_div = document.createElement('div');
              var _dots2 = document.createElement('i');
              var title = document.createElement('h3');

              parent.innerHTML = '';
              _message_title2.innerHTML = state.gmails[id].messageTitle;
              sender_email.innerHTML = state.gmails[id].senderEmail;
              date.innerHTML = state.gmails[id].date;
              title.innerHTML = state.gmails[id].messages[0].message;

              wrapper.className = 'single-page';
              user_icon.className = 'far fa-user-circle';
              info_div.className = 'info-div';
              _star_div2.className = 'single-star-div';
              _star2.className = 'far fa-star';
              reply_div.className = 'reply-div';
              reply.className = 'fas fa-reply';
              dots_div.className = 'dots-div';
              _dots2.className = 'fas fa-ellipsis-v';
              date.className = 'single-date';
              title.className = 'single-title';

              info_div.appendChild(_message_title2);
              info_div.appendChild(sender_email);
              info_div.appendChild(date);
              _star_div2.appendChild(_star2);
              info_div.appendChild(_star_div2);
              reply_div.appendChild(reply);
              info_div.appendChild(reply_div);
              dots_div.appendChild(_dots2);
              info_div.appendChild(dots_div);
              info_div.appendChild(title);

              wrapper.appendChild(user_icon);
              wrapper.appendChild(info_div);
              parent.appendChild(wrapper);
            }
          };

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

          // display text
          sender_name.innerHTML = state.gmails[index].senderName;
          message_title.innerHTML = state.gmails[index].messageTitle;
          email_date.innerHTML = '11: 02 AM';

          // seting attribute
          li.setAttribute('page', index);
          li.addEventListener('click', single_page);

          // deleting
          right_delete.setAttribute('del', index);
          right_delete.addEventListener('click', delete_one_email);

          checkbox_div.appendChild(check_box);
          star_div.appendChild(star);
          name_div.appendChild(sender_name);
          title_div.appendChild(message_title);
          right_archive_div.appendChild(right_archive);
          right_delete_div.appendChild(right_delete);
          right_mark_div.appendChild(right_mark);
          // right_snooze_div.appendChild(right_snooze);
          li.appendChild(dots);
          li.appendChild(checkbox_div);
          li.appendChild(star_div);
          li.appendChild(name_div);
          li.appendChild(title_div);
          li.appendChild(email_date);

          li.appendChild(right_archive_div);
          li.appendChild(right_delete_div);
          li.appendChild(right_mark_div);
          // li.appendChild(right_snooze_div);

          ul.appendChild(li);

          // avoid clicking list items
          box_star_value = false;

          // checkbox avoiding

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

          // right icons
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
        })();
      }
    }
  });
}