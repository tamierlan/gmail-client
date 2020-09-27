// call big bang by category
const primary = () => {
  big_bang('primary');
}
const social = () => {
  big_bang('social')
}
const promotions = () => {
  big_bang('promotions')
}
big_bang('primary')

function big_bang(category) {
  document.querySelector('#primary').className = '';
  document.querySelector('#social').className = '';
  document.querySelector('#promotions').className = '';
  document.querySelector('#' + category).className = 'active';

  fetch('https://polar-reaches-49806.herokuapp.com/api?page=1&category=' + category)
  .then(res => res.json())
  .then(res => {
    // state
    const state = {
      gmails: res.items,
      page: res.next.page,
      limit: res.next.limit,
      total: res.total
    };

    console.log(state.gmails[1])

    // looping each email

    const ul = document.querySelector('.mail-list-wrapper')
    ul.innerHTML = '';

    for (var  index = 0; index < state.gmails.length; index++) {
      // generating elements || tags
      const li = document.createElement('li');
      const dots = document.createElement('i');
      const checkbox_div = document.createElement('div');
      const check_box = document.createElement('input');
      const star_div = document.createElement('div');
      const star = document.createElement('i');
      const name_div = document.createElement('div');
      const sender_name = document.createElement('a');
      const title_div = document.createElement('div');
      const message_title = document.createElement('a');
      const email_date = document.createElement('a');

      // adding classes
      li.className = 'list-emails';
      dots.className = 'fas fa-th';
      checkbox_div.className = 'checkbox-div';
      star_div.className = 'star-div';
      star.className = 'far fa-star';
      name_div.className = 'name-div';
      title_div.className = 'title-div';
      check_box.className = 'email-check-box'
      check_box.type = 'checkBox';
      email_date.className = 'email-date';

      // display text
      sender_name.innerHTML = state.gmails[index].senderName;
      message_title.innerHTML = state.gmails[index].messageTitle;
      email_date.innerHTML = '11: 02 AM';

      // seting attribute
      li.setAttribute('page', index)
      li.addEventListener('click', single_page)


      // append
      checkbox_div.appendChild(check_box);
      star_div.appendChild(star)
      name_div.appendChild(sender_name);
      title_div.appendChild(message_title)
      li.appendChild(dots);
      li.appendChild(checkbox_div)
      li.appendChild(star_div);
      li.appendChild(name_div);
      li.appendChild(title_div);
      li.appendChild(email_date);

      ul.appendChild(li)

      // avoid clicking list items
      var box_star_value = false;

      // checkbox avoiding
      checkbox_div.addEventListener ('mouseover', function hover_box(){
        box_star_value = true;
        console.log('overing')
      });
      checkbox_div.addEventListener ('mouseleave', function leave_box(){
        box_star_value = false;
        console.log('leaving')
      });
      // star avoiding
      star_div.addEventListener ('mouseover', function hover_star(){
        box_star_value = true;
        console.log('overing')
      });
      star_div.addEventListener ('mouseleave', function leave_star(){
        box_star_value = false;
        console.log('leaving')
      });



      // single page

      function single_page() {
        if (!box_star_value) {
          const id = this.getAttribute('page');
          const parent = document.querySelector('.main-emails-section');
          const wrapper = document.createElement('div');
          const user_icon = document.createElement('i');
          const info_div = document.createElement('div');
          const message_title = document.createElement('h2');
          const sender_email = document.createElement('a');
          const date = document.createElement('a');
          const star_div = document.createElement('div');
          const star = document.createElement('i');
          const reply_div = document.createElement('div');
          const reply = document.createElement('i');
          const dots_div = document.createElement('div')
          const dots = document.createElement('i');
          const title = document.createElement('h3');
          // const dots_div = document.createElement('div');
          // const sender_email = document.createElement('a');




          parent.innerHTML = '';
          message_title.innerHTML = state.gmails[id].messageTitle;
          sender_email.innerHTML = state.gmails[id].senderEmail;
          date.innerHTML = state.gmails[id].date;
          title.innerHTML = state.gmails[id].messages[0].message;
          // message_title.innerHTML = state.gmails[id].messageTitle;
          // sender_email.innerHTML = state.gmails[id].senderEmail;
          // message_title.innerHTML = state.gmails[id].messageTitle;
          // sender_email.innerHTML = state.gmails[id].senderEmail;


          wrapper.className = 'single-page';
          user_icon.className = 'far fa-user-circle';
          info_div.className = 'info-div';
          star_div.className = 'single-star-div';
          star.className = 'far fa-star';
          reply_div.className = 'reply-div';
          reply.className = 'fas fa-reply';
          dots_div.className = 'dots-div';
          dots.className = 'fas fa-ellipsis-v';
          date.className = 'single-date'
          title.className = 'single-title';
          // info_div.className = 'info-div';
          info_div.appendChild(message_title);
          info_div.appendChild(sender_email);
          info_div.appendChild(date);
          star_div.appendChild(star);
          info_div.appendChild(star_div);
          reply_div.appendChild(reply);
          info_div.appendChild(reply_div);
          dots_div.appendChild(dots);
          info_div.appendChild(dots_div);
          info_div.appendChild(title);
          // star_div.appendChild(star);
          // info_div.appendChild(star_div);

          wrapper.appendChild(user_icon);
          wrapper.appendChild(info_div);
          parent.appendChild(wrapper);
        }
      }
    }
  });
}
