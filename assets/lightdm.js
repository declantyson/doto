var password_prompt = false,
    selected_user = null,
    time_remaining = 0,
    loading_text = '',
    previous_session = '';


function start_authentication(username)
{
    var passwordInput = document.getElementById('password_entry'),
        user_table = document.getElementById('user_table'),
        label = document.getElementById('countdown_label');
    passwordInput.className = 'visible';
    passwordInput.value = '';
    passwordInput.focus();

    selected_user = username;

    for (var i in user_table.rows) {
        if(typeof user_table.rows[i] !== 'undefined') {
            var row = user_table.rows[i];
            if (row.id !== ('user_' + selected_user)) {
                row.className = 'hidden';
            } else {
                row.className = '';

                var sessionDiv = document.createElement('div'),
                    sessionMenu = document.createElement('select'),
                    selectedIndex = 0;

                sessionDiv.id = 'session_div';
                sessionMenu.id = 'session_menu';

                for (var j in lightdm.sessions) {
                    if(typeof lightdm.sessions[j] === 'undefined') continue;

                    var session = lightdm.sessions[j],
                        sessionOption = document.createElement('option');

                    sessionOption.innerText = session.name;
                    sessionOption.value = session.key;
                    sessionOption.title = session.comment;

                    if (session.key === previous_session)
                        selectedIndex = j;

                    sessionMenu.appendChild(sessionOption);
                }

                sessionMenu.selectedIndex = selectedIndex;
                sessionDiv.appendChild(sessionMenu);


                if ( document.getElementById('session_div') ) {
                   var sessionElement = document.getElementById('session_div');
                   sessionElement.parentNode.removeChild(sessionElement);
                }
                document.querySelector('#user_' + selected_user + ' td').appendChild(sessionDiv);
            }
        }
    }

    if (label !== null) {
        label.style.visibility = 'hidden';
    }

    lightdm.cancel_timed_login();
}

function show_prompt(text)
{
    password_prompt = true;

    var label = document.getElementById('password_prompt'),
        user_table = document.getElementById('user_table'),
        table = document.getElementById('password_table');

    for (var i in user_table.rows)
    {
        var row = user_table.rows[i];

        if (row.id !== ('user_' + selected_user)) row.className = 'hidden';
        else row.className = '';
    }

    table.style.visibility = 'visible';
}

function show_message(text)
{
    var table = document.getElementById('message_table'),
        label = document.getElementById('message_label');

    label.innerHTML = text;

    if (text.length > 0) {
        table.style.visibility = 'visible';
    } else {
        table.style.visibility = 'hidden';
    }
}

function show_error(text)
{
    show_message(text);
}

function reset()
{
    start_authentication(selected_user);
    setTimeout(function () {
        show_message('');
    }, 4000);
}


function throbber()
{
    loading_text += '.';
    if (loading_text === '....') {
        loading_text = '.';
    }

    var label = document.getElementById('countdown_label');
    label.innerHTML = loading_text;
    setTimeout(throbber, 1000);
}

function authentication_complete()
{
    var sessionMenu = document.getElementById('session_menu'),
        selected_session = sessionMenu.options[sessionMenu.selectedIndex].value;

    if (lightdm.is_authenticated) {
        lightdm.login(lightdm.authentication_user, selected_session);
    } else {
        show_message('Authentication Failed');
    }

    reset();
    setTimeout(throbber, 1000);
}

function timed_login(user)
{
    lightdm.login (lightdm.timed_login_user);
    setTimeout(throbber, 1000);
}

function provide_secret()
{
    var entry = document.getElementById('password_entry');

    lightdm.cancel_authentication();
    lightdm.start_authentication(selected_user);

    setTimeout( function () {
        lightdm.provide_secret(entry.value);
    }, 50);

}

function countdown()
{
    var label = document.getElementById('countdown_label');
    label.innerHTML = ' in ' + time_remaining + ' seconds';
    time_remaining--;
    if (time_remaining >= 0) {
        setTimeout(countdown, 1000);
    }
}

function get_user_index(username) {
    for (var i=0; i < lightdm.users.length; i++) {
        if (typeof lightdm.users[i] === 'undefined') continue;

        if (username == lightdm.users[i].name) return i;
    }

    return false;
}

function get_next_user(reverse=false) {
    var user_index = get_user_index(selected_user);
    var next_user_index = user_index;

    if (!reverse) {
        if (++next_user_index >= lightdm.users.length) next_user_index = 0;
    }
    else {
        if (--next_user_index < 0) next_user_index = lightdm.users.length - 1;
    }

    start_authentication(lightdm.users[next_user_index].name);
}

function build_display() {

    window.onkeydown = function (e) {
        if (selected_user === null) {
            previous_session = lightdm.users[0].session;
            selected_user = lightdm.users[0].name;
            start_authentication(selected_user);
        }
        else {
            // up arrow
            if (e.keyCode == 38) {
                get_next_user(true)
            }
            // down arrow
            else if (e.keyCode == 40) {
                get_next_user()
            }
            // enter
            else if(e.keyCode == 13) {
                //lightdm.start_authentication(selected_user);
            }
        }

    };


    var userTable = document.createElement('table');
    userTable.id = 'user_table';
    for (var i in lightdm.users) {
        if(typeof lightdm.users[i] === 'undefined') continue;

        var user = lightdm.users[i],
            userRow = document.createElement('tr'),
            userCell = document.createElement('td'),
            userImage = document.createElement('img'),
            userName = document.createElement('p'),
            image = 'assets/images/lock.png';

        userRow.id = 'user_' + user.name;
        userRow.setAttribute('data-user', user.name);
        userName.classList.add('username');

        userRow.onclick = function() {
            previous_session = user.session;
            start_authentication(this.getAttribute('data-user'));
        };

        userName.innerText = user.display_name;

        /*if (user.image.length > 0)
            image = user.image;*/

        userImage.setAttribute('src', image);

        userCell.appendChild(userImage);
        userCell.appendChild(userName);
        userRow.appendChild(userCell);
        userTable.appendChild(userRow);
    }

    var passwordTable = document.createElement('table'),
        passwordRow = document.createElement('tr'),
        passwordCell = document.createElement('td'),
        passwordPrompt = document.createElement('td'),
        passwordForm = document.createElement('form'),
        passwordInput = document.createElement('input');

    passwordTable.id = 'password_table';

    passwordPrompt.id = 'password_prompt';

    passwordForm.action = 'javascript: provide_secret()';

    passwordInput.id = 'password_entry';
    passwordInput.type = 'password';
    passwordInput.setAttribute('placeholder', 'Password');

    passwordForm.appendChild(passwordInput);
    passwordCell.appendChild(passwordForm);
    passwordRow.appendChild(passwordPrompt);
    passwordRow.appendChild(passwordCell);
    passwordTable.appendChild(passwordRow);
    userTable.appendChild(passwordTable);

    document.getElementById('content').appendChild(userTable);
}
