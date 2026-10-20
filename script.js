const clockEl = document.getElementById('clock');
let activeIcon = null;

const updateClock = () => {
    clockEl.textContent = new Date().toLocaleString();
};
updateClock();
setInterval(updateClock, 1000);

function handleIconTap(el, targetId) {
    if (el.classList.contains("selected")) {
        el.classList.remove("selected");
        activeIcon = null;
        openWindow(targetId);
    } else {
        if (activeIcon) activeIcon.classList.remove("selected");
        el.classList.add("selected");
        activeIcon = el;
    }
}

const closeWindow = (id) => document.getElementById(id).style.display = "none";
const openWindow = (id) => document.getElementById(id).style.display = "block";

const windows = ['welcome', 'car-app', 'plane-app'];
windows.forEach(id => dragElement(document.getElementById(id)));

function dragElement(el) {
    let initX = 0, initY = 0, currX = 0, currY = 0;
    const header = document.getElementById(`${el.id}header`);

    if (header) {
        header.onmousedown = onMouseDown;
    } else {
        el.onmousedown = onMouseDown;
    }

    function onMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        initX = e.clientX;
        initY = e.clientY;
        document.onmouseup = onMouseUp;
        document.onmousemove = onMouseMove;
    }

    function onMouseMove(e) {
        e = e || window.event;
        e.preventDefault();
        currX = initX - e.clientX;
        currY = initY - e.clientY;
        initX = e.clientX;
        initY = e.clientY;
        el.style.top = `${el.offsetTop - currY}px`;
        el.style.left = `${el.offsetLeft - currX}px`;
    }

    function onMouseUp() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
