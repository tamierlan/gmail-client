// url state



let onePage = 1
let category = 'primary'
big_bang(onePage, category);

//call big bang by category

const primary = () => {
  category = 'primary';
  big_bang(onePage, category)
}
const social = () => {
  category = 'social';
  big_bang(onePage, category)
}
const promotions = () => {
  category = 'promotions';
  big_bang(onePage, category)
}
//call big bang by page number
const next_page = () => {
  onePage = 2
  big_bang(onePage, category)
}
const last_page = () => {
  onePage = 1
  big_bang(onePage, category)
}



//for single page avoid clicks
var box_star_value = false;

// function trashed_emails(x, name, message, date) {
//   const li = document.createElement('li')
//   const document.querySelector('mail-list-wrapper')
// }

function big_bang(onePage , category) {
  document.querySelector('#primary').className = '';
  document.querySelector('#social').className = '';
  document.querySelector('#promotions').className = '';
  document.querySelector('#' + category).className = 'active';

  fetch('https://polar-reaches-49806.herokuapp.com/api?page='+onePage+'&category=' + category)
  .then(res => res.json())
  .then(res => {
    // state
    const state = {
      gmails: res.items,
      searched: [],
      page_info: res.items.length,
      deleted_email: [],
      checked_all_list: false
    };


    console.log(state.gmails[0])

    // check select all
    document.querySelector('.check-all-emails').addEventListener('change', () => {
      const icon = document.querySelector('.select-trash-all-icon')
      state.checked_all_list = !state.checked_all_list;
      state.checked_all_list ? icon.style.display = 'block' : icon.style.display = 'none'
      mainLoop()
    });

    document.querySelector('.select-trash-all-icon').addEventListener('click', () => {
      for (var x = 0; x < state.gmails.length; x++) {
        localStorage.setItem("deleted"+x, "deleted"+x);
      }
      mainLoop()
    });
    document.querySelector('.refresh').addEventListener('click', () => {
      for (var x = 0; x < state.gmails.length; x++) {
        localStorage.removeItem("deleted"+x);
        localStorage.removeItem("readed"+x);
        localStorage.removeItem("star"+x);
        state.checked_all_list = false;
        document.querySelector('.check-all-emails').checked = false;
        mainLoop()
      }
    })

    const refreshing = document.querySelector('.refresh');
    const go_refreshing = document.createElement('i')
    refreshing.innerHTML = '';
    go_refreshing.className = 'fas fa-redo-alt';
    refreshing.appendChild(go_refreshing)


    const menu = document.querySelector('.menu')
    menu.addEventListener('click', function(e) {
      if (e.target.className.includes('trash')) {
        document.querySelector('.mail-list-wrapper').innerHTML = '';
        let holder = []
        for (var x = 0; x < state.gmails.length; x++) {
          const get_id = localStorage.getItem('deleted'+x)
          if (get_id) {
            holder.push(state.gmails[x])
            prepare_element(
              category,x,
              state.gmails[x].senderName,
              state.gmails[x].messageTitle,
              state.gmails[x].date,
              state.gmails[x].senderEmail,
              state.gmails[x].messages[0].message)
          }
        }

        state.gmails = holder
      } else if (e.target.className.includes('spam')) {
        return
      }
    })














    const ul = document.querySelector('.mail-list-wrapper')
    ul.innerHTML = '';


    if (onePage === 1) {
      const first_page = '1-' + state.page_info + ' of 76'
      document.querySelector('.page-info').innerHTML = first_page
    } else {
      const tot = 50 + state.page_info
      const last_page = '50-' + tot + ' of ' + tot;
      document.querySelector('.page-info').innerHTML = last_page
    }

    // searching
    document.querySelector('.search-email-icon').addEventListener('click', function() {
      state.gmails = res.items
      const txt = document.querySelector('#search').value;
      if (txt !== '') {
        const holder = []
        for (var i = 0; i < state.gmails.length; i++) {
          if (txt === state.gmails[i].senderName) {
            holder.push(state.gmails[i])
          }
        }
        state.gmails = holder;
        document.querySelector('.mail-list-wrapper').innerHTML = '';
        mainLoop();
      }
    })
    mainLoop();


    // looping each eamil
    function mainLoop() {
      document.querySelector('.mail-list-wrapper').innerHTML = '';
      for (var  index = 0; index < state.gmails.length; index++) {
        const dd = localStorage.getItem('deleted'+index);
        if (dd) {

        } else {
          prepare_element(
            category,
            index,
            state.gmails[index].senderName,
            state.gmails[index].messageTitle,
            state.gmails[index].date,
            state.gmails[index].senderEmail,
            state.gmails[index].messages[0].message,
            state.checked_all_list
          );
        }
      }
    }
  });
}


function prepare_element(category, index, name, title, date, email, message, checked_ones) {
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

  const right_archive_div = document.createElement('div');
  const right_delete_div = document.createElement('div');
  const right_mark_div = document.createElement('div');
  const right_snooze_div = document.createElement('div');

  const right_archive = document.createElement('i');
  const right_delete = document.createElement('i');
  const right_mark = document.createElement('i');
  const right_snooze = document.createElement('i');

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
  sender_name.style.color = 'black';
  message_title.style.color = 'color';
  email_date.style.color = 'black';

  if (checked_ones) {
    check_box.checked = true;
  }
  if (localStorage.getItem("star"+index)) {
    // star.style.background = 'orange';
    star.style.color = 'red';
  }
  if (localStorage.getItem("readed"+index)) {
    sender_name.style.color = 'silver';
    message_title.style.color = 'silver';
    email_date.style.color = 'silver';
  }

  // display text
  sender_name.innerHTML = name;
  message_title.innerHTML = title;
  email_date.innerHTML = '11: 02 AM';







  // deleting
  right_delete.addEventListener('click', () => {
    localStorage.setItem("deleted"+index, "deleted"+index);
    big_bang(onePage, category)
  });


  // star
  star_div.addEventListener('click', () => {
    if (localStorage.getItem("star"+index)) {
      localStorage.removeItem("star"+index)
    } else {
      localStorage.setItem("star"+index, "star"+index);
      big_bang(onePage, category)
    }
  })






  // append
  checkbox_div.appendChild(check_box);
  star_div.appendChild(star)
  name_div.appendChild(sender_name);
  title_div.appendChild(message_title);
  right_archive_div.appendChild(right_archive);
  right_delete_div.appendChild(right_delete);
  right_mark_div.appendChild(right_mark);
  li.appendChild(dots);
  li.appendChild(checkbox_div)
  li.appendChild(star_div);
  li.appendChild(name_div);
  li.appendChild(title_div);
  li.appendChild(email_date);

  li.appendChild(right_archive_div);
  li.appendChild(right_delete_div);
  li.appendChild(right_mark_div);
  const ul = document.querySelector('.mail-list-wrapper')
  ul.appendChild(li)


  // checkbox avoiding
  let box_star_value = false;
  checkbox_div.addEventListener ('mouseover', function hover_box(){
    box_star_value = true;
  });
  checkbox_div.addEventListener ('mouseleave', function leave_box(){
    box_star_value = false;
  });
  // star avoiding
  star_div.addEventListener ('mouseover', function hover_star(){
    box_star_value = true;
  });
  star_div.addEventListener ('mouseleave', function leave_star(){
    box_star_value = false;
  });
  right_archive_div.addEventListener ('mouseover', function az() {
    box_star_value = true;
  })
  right_archive_div.addEventListener ('mouseleave', function za() {
    box_star_value = true;
  })
  right_delete_div.addEventListener ('mouseover', function fv() {
    box_star_value = true;
  })
  right_delete_div.addEventListener ('mouseover', function fv() {
    box_star_value = true;
  })
  right_mark_div.addEventListener ('mouseover', function azx() {
    box_star_value = true;
  })
  right_mark_div.addEventListener ('mouseleave', function zaxx() {
    box_star_value = false;
  })
  right_delete_div.addEventListener ('mouseover', function fxxxxv() {
    box_star_value = true;
  })
  right_delete_div.addEventListener ('mouseleave', function fvscz() {
    box_star_value = false;
  })



  // setting attribute
  li.addEventListener('click', function() {
    if (!box_star_value) {
      localStorage.setItem("readed"+index, "readed"+index)
      single_page(index, name, title, date, email, message)
    }
  })





  // RIGHT ICONS
  li.addEventListener('mouseover', function hover_right_icons(){
    right_archive_div.className = 'right-archive-div';
    right_delete_div.className = 'right-delete-div';
    right_mark_div.className = 'right-mark-div';
    right_snooze_div.className = 'right-snooze-div';
    right_archive.className = 'fas fa-archive';
    right_delete.className = 'fas fa-trash-restore';
    right_mark.className = 'fas fa-envelope-open';
    right_snooze.className = 'fas fa-trash-restore';
  })
  li.addEventListener('mouseleave', function leave_right_icons(){
    right_archive_div.className = '';
    right_delete_div.className = '';
    right_mark_div.className = '';
    right_snooze_div.className = '';
    right_archive.className = '';
    right_delete.className = '';
    right_mark.className = '';
    right_snooze.className = '';
  })
}


//  SINGLE PAGE
function single_page(index, name, title, dat, email, message, box_star_value) {
  if (!box_star_value) {

    const go_back_div = document.querySelector('.check_select');
    const go_back = document.createElement('i')
    go_back_div.innerHTML = '';
    go_back.className = 'fas fa-reply';
    go_back_div.appendChild(go_back)
    go_back_div.addEventListener('click', () => {
      big_bang(onePage, category)
    })

    const parent = document.querySelector('.mail-list-wrapper');
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

    parent.innerHTML = '';
    message_title.innerHTML = title;
    sender_email.innerHTML = email;
    date.innerHTML = dat;
    title.innerHTML = message;

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

    wrapper.appendChild(user_icon);
    wrapper.appendChild(info_div);
    parent.appendChild(wrapper);
  }
}

//Compose pop-up
let compose = document.querySelector('.compose');
let pop = document.querySelector('.pop-up');


compose.addEventListener('click', () => {
  pop.style.display = "block";
})


pop.addEventListener('click', (e) => {
  if (e.target.className == "btn-close")
    pop.style.display = "none";
})
