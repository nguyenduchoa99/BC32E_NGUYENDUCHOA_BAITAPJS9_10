/**
 * Hàm nhận vào 2 tham số trả về đúng hoặc sai và trả về 2 kết quả true/ false. True khi hơp lệ và false khi không hợp lệ
 * @param {*} value giá trị đầu vào
 * @param {*} selectorError Nơi in ra lỗi
 * @param {*} name là text hiển thị ra trường bị lỗi
 */
function checkSpace(value,selectorError,name){
    if(value.trim() !== ''){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống!';
    return false;
};

function checkAllLetter(value,selectorError,name){
    var regexLetter = /^[A-Z a-z]+$/;
    if (regexLetter.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' tất cả là chữ!';
    return false;
};

function checkEmail(value,selectorError,name){
    var later = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
    if (value.match(later)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' phải đúng dịnh dạng email!';
    return false;
};

function checkLength(value,selectorError,name,minLength,maxLength){
    var lengthValue = value.length;
    if(lengthValue > maxLength || lengthValue < minLength) {
        document.querySelector(selectorError).innerHTML = name + ' từ ' + minLength +' đến ' + maxLength;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
};

function checkDate(value,selectorError,name){
    var regexDate = /^(0\[1-9]|1\[0-2\])\/(0\[1-9]|1\d|2\\d|3\[01])\/(19|20)\d{2}$/;
    if(regexDate.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng!';
    return false;
};

function checkPosition(value,selectorError,name){
    if(value ==='Sếp' || value === 'Trưởng phòng' || value ==='Nhân viên'){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = 'Vui lòng chọn ' + name;
};

function checkPassword(value,selectorError,name){
    var later = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(later)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' phải có ký tự đặc biệt, số và chữ cái viết Hoa!';
    return false;
};

function checkNumber(value,selectorError,name){
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' tất cả là số!';
    return false;
};

function checkMaxMin(value,selectorError,name,minValue,maxValue){
    value = Number(value);
    if(value > maxValue || value < minValue) {
        document.querySelector(selectorError).innerHTML = name + ' từ ' + minValue +' đến ' + maxValue;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
};