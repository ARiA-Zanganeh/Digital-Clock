// ----- Variables -----
    // References to the DOM elements we need to update / control.
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');
    const stopBtn = document.getElementById('startBtn') ? document.getElementById('stopBtn') : null;
    const startBtn = document.getElementById('startBtn');
    const statusEl = document.getElementById('status');

    // This will hold the ID returned by setInterval, so we can pass it to clearInterval later.
    let timerId = null;

    // ----- Functions -----

    // Small helper: turns 3 into "03". Uses ES6 arrow function + padStart.
    const pad = (num) => String(num).padStart(2, '0');

    // Builds the "HH:MM:SS" string from a Date object.
    function formatTime(date) {
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        // Template literal (ES6) instead of string concatenation
        return `${hours}:${minutes}:${seconds}`;
    }

    // Builds a readable date string, e.g. "Sunday, July 19, 2026"
    function formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    // This is the function that setInterval will call every second.
    function updateClock() {
        const now = new Date();
        timeEl.textContent = formatTime(now);
        dateEl.textContent = formatDate(now);
    }

    // Starts the ticking clock.
    function startClock() {
        if (timerId !== null) return; // already running, do nothing
        updateClock();                // show the time immediately, don't wait 1s
        timerId = setInterval(updateClock, 1000);

        statusEl.textContent = 'running';
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }

    // Stops the ticking clock.
    function stopClock() {
        clearInterval(timerId); // cancels the setInterval using its ID
        timerId = null;

        statusEl.textContent = 'paused';
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }

    // ----- Wire up buttons -----
    stopBtn.addEventListener('click', stopClock);
    startBtn.addEventListener('click', startClock);

    // ----- Kick things off -----
    startClock();