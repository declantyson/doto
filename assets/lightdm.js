password_prompt = false;
selected_user = null;
time_remaining = 0;

function show_prompt(text)
{
    password_prompt = true;

    label = document.getElementById('password_prompt');

    user_table = document.getElementById('user_table');
    for (i in user_table.rows)
    {
        row = user_table.rows[i];
        if (row.id !== ('user_' + selected_user)) { // FIXME: Don't know why there are rows with styles
            row.style.visibility = "hidden";
        }
    }

    table = document.getElementById('password_table');
    table.style.visibility = "visible";
}

function show_message(text)
{
    table = document.getElementById('message_table');
    label = document.getElementById('message_label');
    label.innerHTML = text;
    if (text.length > 0)
        table.style.visibility = "visible";
    else
        table.style.visibility = "hidden";
}

function show_error(text)
{
    show_message(text);
}

function reset()
{
    start_authentication(selected_user);
    setTimeout(function () {
        show_message("");
    }, 4000);
}

loading_text = '';

function throbber()
{
    loading_text += '.';
    if (loading_text == '....')
        loading_text = '.'
    label = document.getElementById('countdown_label');
    label.innerHTML = loading_text;
    setTimeout('throbber()', 1000);
}

function authentication_complete()
{
    if (lightdm.is_authenticated)
        lightdm.login (lightdm.authentication_user, lightdm.default_session);
    else
        show_message ("Authentication Failed");

    reset();
    setTimeout('throbber()', 1000);
}

function timed_login(user)
{
    lightdm.login (lightdm.timed_login_user);
    setTimeout('throbber()', 1000);
}

function start_authentication(username)
{
    var passwordInput = document.getElementById('password_entry');
    passwordInput.className = "visible";
    passwordInput.focus();

    lightdm.cancel_timed_login ();
    label = document.getElementById('countdown_label');
    if (label != null)
        label.style.visibility = "hidden";

    selected_user = username;
    lightdm.start_authentication(username);
}

function provide_secret()
{
    entry = document.getElementById('password_entry');
    lightdm.provide_secret(entry.value);
}

function countdown()
{
    label = document.getElementById('countdown_label');
    label.innerHTML = ' in ' + time_remaining + ' seconds';
    time_remaining--;
    if (time_remaining >= 0)
        setTimeout('countdown()', 1000);
}

function build_display() {

    window.onkeydown = function (e) {
        if(selected_user === null) {
            start_authentication(lightdm.users[0].name);
        }
    };


    var userTable = document.createElement('table');
    userTable.id = "user_table";
    for (i in lightdm.users) {
        var user = lightdm.users[i],
            userRow = document.createElement('tr'),
            userCell = document.createElement('td'),
            userImage = document.createElement('img'),
            userName = document.createElement('p'),
            image = 'assets/stock.png';

        userRow.id = "user_" + user.name;
        userRow.setAttribute('data-user', user.name);

        userRow.onclick = function() {
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

    passwordTable.id = "password_table";
    //passwordRow.style.visibility = "hidden";

    passwordPrompt.id = "password_prompt";
    // passwordPrompt.innerText = "Password";

    passwordForm.action = "javascript: provide_secret()";

    passwordInput.id = "password_entry";
    passwordInput.type = "password";
    passwordInput.setAttribute("placeholder", "Password");

    passwordForm.appendChild(passwordInput);
    passwordCell.appendChild(passwordForm);
    passwordRow.appendChild(passwordPrompt);
    passwordRow.appendChild(passwordCell);
    passwordTable.appendChild(passwordRow);
    userTable.appendChild(passwordTable);

    document.getElementById('content').appendChild(userTable);
}
