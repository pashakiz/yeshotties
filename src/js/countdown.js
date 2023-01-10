/*
* Autor: Pavel Kizernis (pashakiz@gmail.com)
* https://github.com/pashakiz/countdown.js
*/

const initCountDown = () => {
  const elems = document.querySelectorAll('.countdown-js');
  elems.forEach((elem) => new CountDown(elem));
}

function CountDown(elem) {
  this.elem = elem;

  this.showTitles = elem.dataset.showTitles === 'true' ? true : false;
  this.leftZero = elem.dataset.hideLeftZero === 'true' ? 0 : '0';

  this.clockface = {
    dayValue: null,
    dayTitle: null,
    hourValue: null,
    hourTitle: null,
    minValue: null,
    minTitle: null,
    secValue: null,
    secTitle: null,
  };

  this.time = {
    difference: null,
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  };

  this.start = () => {
    console.log('start timer!');

    //Well if we have countdownTime ignore countdownDate even if it is defined
    if (!!this.elem.dataset.countdownTime) {
      let timeStr = this.elem.dataset.countdownTime;
      let timeFuture = timeStr.split('-');
      let difftime = (timeFuture[0] * 60 * 60 * 1000) + (timeFuture[1] * 60 * 1000) + (timeFuture[2] * 1000);
      let dateNow = new Date();
      this.dateFuture = new Date(difftime + dateNow.getTime());
      //delete dateNow;
      this.buildClockFace();
      this.countDown(this.dateFuture);
      return false
    }

    //if we haven't countdownTime use countdownDate
    let dateStr = this.elem.dataset.countdownDate;
    let dateFuture = dateStr.split('-');
    --dateFuture[1]; //months start from 0 in JS

    //Create a dateFuture object of Date type with the date until which the counter will tick
    this.dateFuture = new Date(
      dateFuture[0],
      dateFuture[1],
      dateFuture[2],
      dateFuture[3],
      dateFuture[4],
      dateFuture[5]
    );
    this.buildClockFace();

    //Call a recursive counter function with dateFuture argument
    this.countDown(this.dateFuture);
  }

  this.buildClockFace = () => {
    console.log('this.buildClockFace');
    let clockface = document.createElement('DIV');
    clockface.classList.add('clockface');

    //element (donor) for cloning
    let clockfaceSeparator = document.createElement('DIV');
    clockfaceSeparator.classList.add('clockface__separator');

    //element (donor) for cloning
    let clockfaceItem = document.createElement('DIV');
    clockfaceItem.classList.add('clockface-item');

    let clockfaceValue = document.createElement('DIV');
    clockfaceValue.classList.add('clockface__value');
    clockfaceItem.append(clockfaceValue);

    if (this.showTitles) {
      let clockfaceTitle = document.createElement('DIV');
      clockfaceTitle.classList.add('clockface__title');
      clockfaceItem.append(clockfaceTitle);
    }

    let clockfaceDay = clockfaceItem.cloneNode(true);
    clockfaceDay.classList.add('clockface-item_days');
    let clockfaceHour = clockfaceItem.cloneNode(true);
    clockfaceHour.classList.add('clockface-item_hours');
    let clockfaceMin = clockfaceItem.cloneNode(true);
    clockfaceMin.classList.add('clockface-item_mins');
    let clockfaceSec = clockfaceItem.cloneNode(true);
    clockfaceSec.classList.add('clockface-item_seconds');

    clockfaceItem.remove(); //no need anymore

    clockface.append(
      clockfaceDay,
      clockfaceSeparator.cloneNode(true),
      clockfaceHour,
      clockfaceSeparator.cloneNode(true),
      clockfaceMin,
      clockfaceSeparator.cloneNode(true),
      clockfaceSec
    );

    clockfaceSeparator.remove(); //no need anymore

    this.elem.append(clockface);

    // save some DOM elems to update it later...
    this.clockface.dayValue = clockfaceDay.querySelector('.clockface__value');
    this.clockface.hourValue = clockfaceHour.querySelector('.clockface__value');
    this.clockface.minValue = clockfaceMin.querySelector('.clockface__value');
    this.clockface.secValue = clockfaceSec.querySelector('.clockface__value');
    if (this.showTitles) {
      this.clockface.dayTitle = clockfaceDay.querySelector('.clockface__title');
      this.clockface.hourTitle = clockfaceHour.querySelector('.clockface__title');
      this.clockface.minTitle = clockfaceMin.querySelector('.clockface__title');
      this.clockface.secTitle = clockfaceSec.querySelector('.clockface__title');
    }
  }

  this.countDown = (dateFuture) => {
    //console.log('this.countDown');

    let dateNow = new Date();
    this.time.difference = dateFuture.getTime() - dateNow.getTime();
    //delete dateNow;

    //what if dateFuture < dateNow? So show only zeros...
    if(this.time.difference <= 0) {
      this.clockface.dayValue.textContent = this.leftZero + 0;
      this.clockface.hourValue.textContent = this.leftZero + 0;
      this.clockface.minValue.textContent = this.leftZero + 0;
      this.clockface.secValue.textContent = this.leftZero + 0;
      if (this.showTitles) {
        this.clockface.minTitle.textContent = 'минут';
        this.clockface.dayTitle.textContent = 'дней';
        this.clockface.hourTitle.textContent = 'часов';
        this.clockface.secTitle.textContent = 'секунд';
      }
      return false;
    }

    // All right! dateFuture > dateNow. So we have to count...

    //round to seconds
    this.time.difference = Math.floor(this.time.difference / 1000);

    //get days (1 day = 86400 secs)
    this.time.days = Math.floor(this.time.difference / 86400);
    this.time.difference = this.time.difference % 86400; // save remains

    this.time.hours = Math.floor(this.time.difference / 3600);
    this.time.difference = this.time.difference % 3600;

    this.time.mins = Math.floor(this.time.difference / 60);
    this.time.difference = this.time.difference % 60;

    this.time.secs = Math.floor(this.time.difference);

    this.upDateDOM();

    //call again after 1 sec
    setTimeout(this.countDown, 1000, dateFuture);
  }

  this.upDateDOM = () => {
    //Выводим результат с правилами русского языка (11-14 дней, 1 день, 2-3-4 дня, 5-9-0 дней)

    this.clockface.dayValue.textContent = this.time.days < 10 ? this.leftZero + this.time.days : this.time.days;
    if (this.showTitles) {
      if (this.time.days%100 == 11 || this.time.days%100 == 12 || this.time.days%100 == 13 || this.time.days%100 == 14) {
        this.clockface.dayTitle.textContent = 'дней';
      } else if (this.time.days%10 == 1) {
        this.clockface.dayTitle.textContent = 'день';
      } else if (this.time.days%10 == 0 || this.time.days%10 >= 5) {
        this.clockface.dayTitle.textContent = 'дней';
      } else if (this.time.days%10 == 2 || this.time.days%10 == 3 || this.time.days%10 == 4) {
        this.clockface.dayTitle.textContent = 'дня';
      }
    }

    this.clockface.hourValue.textContent = this.time.hours < 10 ? this.leftZero + this.time.hours : this.time.hours;
    if (this.showTitles) {
      if (this.time.hours >= 11 && this.time.hours <= 14) {
        this.clockface.hourTitle.textContent = 'часов';
      } else if (this.time.hours%10 == 1) {
        this.clockface.hourTitle.textContent = 'час';
      } else if (this.time.hours%10 == 0 || this.time.hours%10 >= 5) {
        this.clockface.hourTitle.textContent = 'часов';
      } else if (this.time.hours%10 == 2 || this.time.hours%10 == 3 || this.time.hours%10 == 4) {
        this.clockface.hourTitle.textContent = 'часа';
      }
    }

    this.clockface.minValue.textContent = this.time.mins < 10 ? this.leftZero + this.time.mins : this.time.mins;
    if (this.showTitles) {
      if (this.time.mins >= 11 && this.time.mins <= 14) {
        this.clockface.minTitle.textContent = 'минут';
      } else if (this.time.mins%10 == 1) {
        this.clockface.minTitle.textContent = 'минута';
      } else if (this.time.mins%10 == 0 || this.time.mins%10 >= 5) {
        this.clockface.minTitle.textContent = 'минут';
      } else if (this.time.mins%10 == 2 || this.time.mins%10 == 3 || this.time.mins%10 == 4) {
        this.clockface.minTitle.textContent = 'минуты';
      }
    }

    this.clockface.secValue.textContent = this.time.secs < 10 ? this.leftZero + this.time.secs : this.time.secs;
    if (this.showTitles) {
      if (this.time.secs >= 11 && this.time.secs <= 14) {
        this.clockface.secTitle.textContent = 'секунд';
      } else if (this.time.secs%10 == 1) {
        this.clockface.secTitle.textContent = 'секунда';
      } else if (this.time.secs%10 == 0 || this.time.secs%10 >= 5) {
        this.clockface.secTitle.textContent = 'секунд';
      } else if (this.time.secs%10 == 2 || this.time.secs%10 == 3 || this.time.secs%10 == 4) {
        this.clockface.secTitle.textContent = 'секунды';
      }
    }
  }

  this.start(); //start timer
}

export {initCountDown};
