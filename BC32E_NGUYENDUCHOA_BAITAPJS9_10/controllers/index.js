var list = [];
document.querySelector('#btnThemNV').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.taiKhoan = document.querySelector('#tknv').value;
    nhanVien.hoTen = document.querySelector('#name').value;
    nhanVien.email = document.querySelector('#email').value;
    nhanVien.password = document.querySelector('#password').value;
    nhanVien.ngayLam = document.querySelector('#datepicker').value;
    nhanVien.luongCoBan = document.querySelector('#luongCB').value;
    nhanVien.chucVu = document.querySelector('#chucvu').value;
    nhanVien.gioLam = document.querySelector('#gioLam').value;
    var valid = true;
    valid = checkSpace(nhanVien.taiKhoan, '#error_space_taiKhoan', 'Tài khoản nhân viên') &
        checkSpace(nhanVien.hoTen, '#error_space_hoTen', 'Họ tên') &
        checkSpace(nhanVien.email, '#error_space_email', 'Email') &
        checkSpace(nhanVien.password, '#error_space_password', 'Mật khẩu') &
        checkSpace(nhanVien.luongCoBan, '#error_space_luong', 'Lương') &
        checkSpace(nhanVien.gioLam, '#error_space_gioLam', 'Giờ làm');

    valid &= checkNumber(nhanVien.taiKhoan, '#error_required_taiKhoan', 'Tài khoản') &
        checkNumber(nhanVien.luongCoBan, '#error_required_luong', 'Lương') &
        checkNumber(nhanVien.gioLam, '#error_required_gioLam', 'Giờ làm');
    valid &= checkAllLetter(nhanVien.hoTen, '#error_required_hoTen', 'Họ tên');
    valid &= checkLength(nhanVien.taiKhoan, '#error_length_taiKhoan', 'Tài khoản', 4, 6) &
        checkLength(nhanVien.password, '#error_length_password', 'Mật khẩu', 6, 10);
    valid &= checkMaxMin(nhanVien.luongCoBan, '#error_maxMin_luong', 'Lương', 1e6, 2e7) &
        checkMaxMin(nhanVien.gioLam, '#error_maxMin_gioLam', 'Giờ làm', 80, 200);
    valid &= checkPassword(nhanVien.password, '#error_required_password', 'Mật khẩu');
    valid &= checkEmail(nhanVien.email, '#error_required_email', 'Email');
    valid &= checkPosition(nhanVien.chucVu, '#error_space_chucVu', 'Chức vụ');
    if (!valid) {
        return;
    }
    list.push(nhanVien);
    renderTableNhanVien(list);
    saveLocalStorage();
}

function renderTableNhanVien(arrNhanVien) {
    var html = '';
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nv = arrNhanVien[i];
        nv.tinhLuong = function () {
            var luong = this.luongCoBan;
            var chucVu = this.chucVu;
            var tongLuong = 0;
            if (chucVu === 'Sếp') {
                tongLuong = luong * 3;
            } else if (chucVu === 'Trưởng phòng') {
                tongLuong = luong * 2;
            } else {
                tongLuong = luong * 1;
            }
            tongLuong = tongLuong.toLocaleString();
            return tongLuong;
        };

        nv.xepLoai = function () {
            var gioLam = this.gioLam;
            var loai = '';
            if (gioLam >= 192) {
                loai = 'Xuất Sắc';
            } else if (gioLam >= 176) {
                loai = 'Giỏi';
            } else if (gioLam >= 160) {
                loai = 'Khá';
            } else {
                loai = 'Trung Bình';
            }
            return loai;
        };
        html += `
        <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>        
        <td>${moment(nv.ngayLam).format('MM-DD-YYYY')}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tinhLuong()}</td>
        <td>${nv.xepLoai()}</td>
        <td><button data-toggle="modal" data-target="#myModal" class="btn btn-primary" onclick="edit('${nv.taiKhoan}')">Sửa</button>
        <button class="btn btn-danger" onclick="deleteNv('${nv.taiKhoan}')">Xóa</button>
        </td>
        </tr>
        `;
    }
    document.querySelector('#tableDanhSach').innerHTML = html;
    return html;
}


function edit(taiKhoanNhanVienClick) {
    var indexFind = list.findIndex(nv => nv.taiKhoan === taiKhoanNhanVienClick);
    var nhanVienEdit = list[indexFind];
    document.querySelector('#tknv').disabled = true;
    document.querySelector('#tknv').value = nhanVienEdit.taiKhoan;
    document.querySelector('#name').value = nhanVienEdit.hoTen;
    document.querySelector('#email').value = nhanVienEdit.email;
    document.querySelector('#password').value = nhanVienEdit.password;
    document.querySelector('#datepicker').value = nhanVienEdit.ngayLam;
    document.querySelector('#luongCB').value = nhanVienEdit.luongCoBan;
    document.querySelector('#chucvu').value = nhanVienEdit.chucVu;
    document.querySelector('#gioLam').value = nhanVienEdit.gioLam;
};

document.querySelector('#btnCapNhat').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.taiKhoan = document.querySelector('#tknv').value;
    nhanVien.hoTen = document.querySelector('#name').value;
    nhanVien.email = document.querySelector('#email').value;
    nhanVien.password = document.querySelector('#password').value;
    nhanVien.ngayLam = document.querySelector('#datepicker').value;
    nhanVien.luongCoBan = document.querySelector('#luongCB').value;
    nhanVien.chucVu = document.querySelector('#chucvu').value;
    nhanVien.gioLam = document.querySelector('#gioLam').value;

    var valid = true;
    valid = checkSpace(nhanVien.taiKhoan, '#error_space_taiKhoan', 'Tài khoản nhân viên') &
        checkSpace(nhanVien.hoTen, '#error_space_hoTen', 'Họ tên') &
        checkSpace(nhanVien.email, '#error_space_email', 'Email') &
        checkSpace(nhanVien.password, '#error_space_password', 'Mật khẩu') &
        checkSpace(nhanVien.luongCoBan, '#error_space_luong', 'Lương') &
        checkSpace(nhanVien.gioLam, '#error_space_gioLam', 'Giờ làm') &
        checkSpace(nhanVien.ngayLam, '#error_space_ngayLam', 'Ngày');
    valid &= checkNumber(nhanVien.taiKhoan, '#error_required_taiKhoan', 'Tài khoản') &
        checkNumber(nhanVien.luongCoBan, '#error_required_luong', 'Lương') &
        checkNumber(nhanVien.gioLam, '#error_required_gioLam', 'Giờ làm');
    valid &= checkAllLetter(nhanVien.hoTen, '#error_required_hoTen', 'Họ tên');
    valid &= checkLength(nhanVien.taiKhoan, '#error_length_taiKhoan', 'Tài khoản', 4, 6) &
        checkLength(nhanVien.password, '#error_length_password', 'Mật khẩu', 6, 10);
    valid &= checkMaxMin(nhanVien.luongCoBan, '#error_maxMin_luong', 'Lương', 1e6, 2e7) &
        checkMaxMin(nhanVien.gioLam, '#error_maxMin_gioLam', 'Giờ làm', 80, 200);
    valid &= checkPassword(nhanVien.password, '#error_required_password', 'Mật khẩu');
    valid &= checkEmail(nhanVien.email, '#error_required_email', 'Email');
    valid &= checkPosition(nhanVien.chucVu, '#error_space_chucVu', 'Chức vụ');
    // valid &= checkDate(nhanVien.ngayLam,'#error_space_ngayLam','Ngày');
    if (!valid) {
        return;
    }

    var indexEdit = list.findIndex(nv => nv.taiKhoan === nhanVien.taiKhoan);
    list[indexEdit].taiKhoan = nhanVien.taiKhoan;
    list[indexEdit].hoTen = nhanVien.hoTen;
    list[indexEdit].email = nhanVien.email;
    list[indexEdit].password = nhanVien.password;
    list[indexEdit].ngayLam = nhanVien.ngayLam;
    list[indexEdit].luongCoBan = nhanVien.luongCoBan;
    list[indexEdit].chucVu = nhanVien.chucVu;
    list[indexEdit].gioLam = nhanVien.gioLam;
    renderTableNhanVien(list);
    document.querySelector('#tknv').disabled = false;
    saveLocalStorage();

};


function deleteNv(taiKhoanNhanVienClick2) {
    var indexDel = list.findIndex(nhanVien => nhanVien.taiKhoan === taiKhoanNhanVienClick2);
    if (indexDel !== -1) {
        list.splice(indexDel, 1);
    }
    renderTableNhanVien(list);
};

document.querySelector('#btnTimNV').onclick = function () {
    var search = document.querySelector('#searchName').value;
    var searchNhanVien = list.filter(value => {
        return value.xepLoai().toUpperCase().includes(search.toUpperCase())
    });
    renderTableNhanVien(searchNhanVien);
};

function saveLocalStorage() {
    var saveList = JSON.stringify(list);
    localStorage.setItem('listNhanVien', saveList);
};

function pickLocalStorage() {
    if (localStorage.getItem('listNhanVien')) {
        var saveList = localStorage.getItem('listNhanVien');
        list = JSON.parse(saveList);
        renderTableNhanVien(list);
    }
};
window.onload = function () {
    pickLocalStorage();
};
