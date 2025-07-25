var parentID = 'a3q_parent';
    var dID = 'a3q_customNotes';
    var buttonID = 'a3q_close_button';
    var saveThrottleSpeed = 100;
    var lastSave = Date.now();
    var waitCallback;

    function a3q_Save(force) {
        force = force || false;
        clearTimeout(waitCallback);
        if (force || Date.now() - lastSave >= saveThrottleSpeed) {
            lastSave = Date.now();
            localStorage.setItem('a3q_note', a3q_GetContents());
        } else {
            waitCallback = setTimeout(function() {
                a3q_Save();
            }, saveThrottleSpeed - Date.now());
        }
    };

    function a3q_Load() {
        return localStorage.getItem('a3q_note') || '';
    };

    function a3q_GetContents() {
        return document.getElementById(dID).innerHTML;
    };

    function a3q_Unload() {
        a3q_Save(true);
        d.removeEventListener('onkeyup', a3q_Save);
        d.parentNode.removeChild(d);
        c.removeEventListener('onclick', c.onclick);
        c.parentNode.removeChild(c);
    };
    var d = document.getElementById(dID);
    var c = document.getElementById(buttonID);
    if (d) {
        a3q_Unload();
    } else {
        var d = document.createElement('textarea');
        d.id = dID;
        d.innerHTML = a3q_Load();
        d.style.backgroundColor = '#333';
        d.style.color = '#ccc';
        d.style.border = '1px solid #ccc';
        d.style.position = 'fixed';
        d.style.width = '20%';
        d.style.height = '20%';
        d.style.right = '2%';
        d.style.bottom = '2%';
        d.style.padding = '2px';
        d.style.zIndex = 10000;
        d.contentEditable = true;
        document.body.appendChild(d);
        d.focus();
        var lastRun = Date.now();
        d.onkeyup = a3q_Save;
        var c = document.createElement('button');
        c.style.position = 'fixed';
        c.id = buttonID;
        c.style.zIndex = 10000;
        c.style.bottom = '2%';
        c.style.right = '2%';
        c.innerHTML = 'Close';
        c.style.backgroundColor = '#333';
        c.style.color = '#ccc';
        c.onclick = function() {
            a3q_Unload();
        };
        document.body.appendChild(c);
    }();