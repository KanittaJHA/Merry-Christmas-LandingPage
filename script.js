// Main Function
const run = () => {
    setupMenuToggle();  // เรียกฟังก์ชัน setupMenuToggle เพื่อกำหนดการแสดงเมนู
    setupNavLinkListeners();  // เรียกฟังก์ชัน setupNavLinkListeners เพื่อกำหนดการคลิกที่ลิงก์ในเมนู
    startChristmasCountdown();  // เรียกฟังก์ชัน startChristmasCountdown เพื่อเริ่มการนับถอยหลังถึงคริสต์มาส
};

/*=============== SHOW MENU ===============*/
const setupMenuToggle = () => {
    const navMenu = document.getElementById("nav-menu"),  // เก็บอ้างอิงถึงเมนูนำทาง (เมนูหลัก)
          navToggle = document.getElementById("nav-toggle"),  // เก็บอ้างอิงถึงปุ่มเปิดเมนู
          navClose = document.getElementById("nav-close");  // เก็บอ้างอิงถึงปุ่มปิดเมนู

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {  // ถ้าคลิกที่ปุ่มเปิดเมนู
            navMenu.classList.add("show-menu");  // เพิ่มคลาส 'show-menu' เพื่อแสดงเมนู
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener("click", () => {  // ถ้าคลิกที่ปุ่มปิดเมนู
            navMenu.classList.remove("show-menu");  // ลบคลาส 'show-menu' เพื่อซ่อนเมนู
        });
    }
};

/*=============== REMOVE MENU MOBILE ===============*/
const setupNavLinkListeners = () => {
    const navLinks = document.querySelectorAll(".nav__link");  // เก็บอ้างอิงถึงลิงก์ทั้งหมดในเมนู

    const linkActive = () => {
        const navMenu = document.getElementById("nav-menu");  // เก็บอ้างอิงถึงเมนูนำทาง
        if (navMenu) {
            navMenu.classList.remove("show-menu");  // ลบคลาส 'show-menu' เพื่อซ่อนเมนูเมื่อคลิกที่ลิงก์
        }
    };

    navLinks.forEach(n => n.addEventListener("click", linkActive));  // เพิ่ม event listener ให้กับลิงก์ทั้งหมด
};

/*=============== DAY COUNTER FOR CHRISTMAS ===============*/
const startChristmasCountdown = () => {
    const titleData = document.getElementById("title-data"),  // เก็บอ้างอิงถึงส่วนแสดงข้อมูลในหน้า
          numberData = document.getElementById("number-data"),  // เก็บอ้างอิงถึงส่วนแสดงตัวเลขที่นับถอยหลัง
          textData = document.getElementById("text-data"),  // เก็บอ้างอิงถึงส่วนแสดงข้อความที่นับถอยหลัง
          msgChristmas = document.getElementById("msg-christmas");  // เก็บอ้างอิงถึงข้อความแสดงในวันคริสต์มาส

    const christmasCountdown = () => {
        const now = new Date(),  // เก็บวันที่ปัจจุบัน
              currentMonth = now.getMonth() + 1,  // เก็บเดือนปัจจุบัน (เพิ่ม 1 เพราะเดือนเริ่มต้นจาก 0)
              currentDay = now.getDate();  // เก็บวันที่ปัจจุบัน
        
        let nextChristmasYear = now.getFullYear();  // กำหนดปีถัดไปสำหรับคริสต์มาส
        if (currentMonth === 12 && currentDay > 25) {
            nextChristmasYear += 1;  // ถ้าวันที่ 25 ธันวาคมผ่านมาแล้วในปีนี้ ให้เปลี่ยนไปใช้ปีถัดไป
        }

        const nextChristmasDate = `Dec 25, ${nextChristmasYear} 00:00:00`,  // กำหนดวันที่ 25 ธันวาคมของปีถัดไป
              christmasDay = new Date(nextChristmasDate),  // สร้างออบเจ็กต์วันที่ของคริสต์มาสปีถัดไป
              timeLeft = christmasDay - now;  // คำนวณเวลาเหลือจนถึงคริสต์มาส

        let days = 0, hours = 0, minutes = 0, seconds = 0;

        // Don't calculate the time left if it is Christmas day
        if (currentMonth !== 12 || (currentMonth === 12 && currentDay !== 25)) {
            days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);  // คำนวณจำนวนวันเหลือ
            hours = Math.floor(timeLeft / 1000 / 60 / 60) % 24;  // คำนวณจำนวนชั่วโมงเหลือ
            minutes = Math.floor(timeLeft / 1000 / 60) % 60;  // คำนวณจำนวนนาทีเหลือ
            seconds = Math.floor(timeLeft / 1000) % 60;  // คำนวณจำนวนวินาทีเหลือ
        }
        
        // แสดงวินาทีที่เหลืออยู่. การนับถอยหลัง, เหลือแค่ 0 ชั่วโมงและ 0 นาที, แสดงวินาที (00:00:59)
        if (currentDay === 24 && hours === 0 && minutes === 0) {  // ถ้าวันที่ 24 ธันวาคมและเหลือแค่วินาที
            numberData.textContent = seconds < 10 ? `0${seconds}` : seconds;  // แสดงวินาที
            textData.textContent = "Seconds";  // แสดงข้อความว่าเป็นวินาที

        // แสดงนาทีที่เหลืออยู่. การนับถอยหลัง, เหลือแค่ 0 ชั่วโมง, แสดงนาที (00:59)
        } else if (currentDay === 24 && hours === 0) {  // ถ้าวันที่ 24 ธันวาคมและเหลือแค่ชั่วโมง
            numberData.textContent = minutes < 10 ? `0${minutes}` : minutes;  // แสดงนาที
            textData.textContent = "Minutes";  // แสดงข้อความว่าเป็นนาที

        // แสดงชั่วโมงที่เหลืออยู่
        } else if (currentDay === 24) {  // ถ้าวันที่ 24 ธันวาคมและเหลือแค่ชั่วโมง
            numberData.textContent = hours < 10 ? `0${hours}` : hours;  // แสดงชั่วโมง
            textData.textContent = "Hours";  // แสดงข้อความว่าเป็นชั่วโมง

        // แสดงวันที่เหลืออยู่
        } else {
            numberData.textContent = days < 10 ? `0${days}` : days;  // แสดงจำนวนวัน
            textData.textContent = "Days";  // แสดงข้อความว่าเป็นวัน
        }

        // แสดงข้อความในวันคริสต์มาส
        if (currentMonth === 12 && currentDay === 25) {  // ถ้าวันที่ 25 ธันวาคม
            titleData.style.display = "none";  // ซ่อนข้อความหัวเรื่อง
            msgChristmas.style.display = "block";  // แสดงข้อความ "Merry Christmas"
            msgChristmas.textContent = "Today is Dec 25, Merry Christmas";  // แสดงข้อความคริสต์มาส

        // แสดงจำนวนวันที่เหลืออยู่ และลบข้อความคริสต์มาส
        } else if (currentMonth === 12 && currentDay === 26) {  // ถ้าวันที่ 26 ธันวาคม
            titleData.style.display = "block";  // แสดงข้อความหัวเรื่อง
            msgChristmas.style.display = "none";  // ซ่อนข้อความคริสต์มาส
        }
    };

    setInterval(christmasCountdown, 1000);  // เรียกใช้ฟังก์ชัน christmasCountdown ทุก 1 วินาที
};

// Initialize the script
run();  // เรียกใช้ฟังก์ชันหลัก run()


// /*=============== SHOW MENU ===============*/
// const navMenu = document.getElementById("nav-menu"),
//       navToggle = document.getElementById("nav-toggle"),
//       navClose = document.getElementById("nav-close");


// /* Menu Show */
// if(navToggle) {
//     navToggle.addEventListener("click", () => {
//         navMenu.classList.add("show-menu");
//     })
// }

// /* Menu Hidden */
// if(navClose) {
//     navClose.addEventListener("click", () => {
//         navMenu.classList.remove("show-menu");
//     })
// }

// /*=============== REMOVE MENU MOBILE ===============*/
// const navLink = document.querySelectorAll(".nav__link");

// const linkActive = () => {
//     const navMenu = document.getElementById("nav-menu");

//     // When we click on each nav__link, we remove the show-menu close
//     navMenu.classList.remove("show-menu");
// }

// navLink.forEach(n => n.addEventListener("click", linkActive));

// /*=============== DAY COUNTER FOR CHRISTMAS ===============*/
// const titleData = document.getElementById("title-data"),
//       numberData = document.getElementById("number-data"),
//       textData = document.getElementById("text-data"),
//       msgChristmas = document.getElementById("msg-christmas");

// const christmasCountdown = () => {
//     let now = new Date(), // Get today's date
//         currentMonth = now.getMonth() + 1, // Get the current month
//         currentDay = now.getDate() // Get the current day of the month

//     // Calculate the year the next Christmas will be
//     let nextChristmasYear = now.getFullYear()
//     if(currentMonth == 12 && currentDay > 25) {
//         nextChristmasYear += 1;
//     }

//     let nextChristmasDate = `Dec 25, ${nextChristmasYear} 00:00:00`,
//         christmasDay = new Date(nextChristmasDate),
//         timeLeft = christmasDay - now;

//     let days = 0,
//         hours = 0,
//         minutes = 0,
//         seconds = 0

//     // Don't calculate the time left if it is Christmas day
//     if (currentMonth != 12 || (currentMonth == 12 && currentDay != 25)) {
//         days = Math.floor(timeLeft / 1000 / 60 / 60 /24);
//         hours = Math.floor(timeLeft / 1000 / 60 / 60) % 24;
//         minutes = Math.floor(timeLeft / 1000 / 60) % 60;
//         seconds = Math.floor(timeLeft / 1000) % 60;
//     }

//     // Show missing days 
//     numberData.innerHTML = days < 10 ? `0${days}` : days;
//     textData.innerHTML = "Days"

//     // Show missing hours 
//     if (currentDay == 24) {
//         numberData.innerHTML = hours < 10 ? `0${hours}` : hours;
//         textData.innerHTML = "Hours"
//     }

//     // Show missing minutes. Countdown, 0 hours left, show minutes (00:59)
//     if (currentDay == 24 && hours === 0) {
//         numberData.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
//         textData.innerHTML = "Minutes"
//     }

//     // Show missing seconds. Countdown, 0 hours & 0 minutes left, show seconds (00:00:59)
//     if (currentDay == 24 && hours === 0 && minutes === 0) {
//         numberData.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
//         textData.innerHTML = "Seconds"
//     }

//     // Show message on Christmas Day
//     if (currentMonth == 12 && currentDay == 25) {
//         titleData.style.display = "none"
//         msgChristmas.style.display = "block"
//         msgChristmas.innerHTML = "Today is Dec 25, Merry Christmas"
//     }

//     // Show remaining days & remove Christmas message
//     if (currentMonth == 12 && currentDay == 26) {
//         titleData.style.display = "block"
//         msgChristmas.style.display = "none"
//     }
// }

// setInterval(christmasCountdown, 1000);
