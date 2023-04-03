Link swagger : https://nodejs.dothinh.info/swagger

+ Tài khoản ADMIN

  "email": "admin@admin.com",
  "mat_khau": "admin"

# capstone_nodejs Movie
(*) :require

------------------------------------- APi Auth --------------------------------------------

---- Sign in ----
    + email: string (require)
    + mat_khau: string (require)

---- Sign up ----
    + email: string (require)
    + ho_ten: string (require)
    + mat_khau: string (require)
    + so_dt: string (not require)

------------------------------------- APi user --------------------------------------------
----- Get current info (token require) ----------
+ Lấy thông tin của bản thân 

---- Get info by tai_khoan (getUserInfo) ----
+ Lấy thông tin của người khác 
+ Truyền params tai_khoan*:number

---- deleteUser (token require) ----
+ Xóa user theo params user_id
+ Chỉ ADMIN mới có quyền xóa

---- updateUser (token require) ----
+ Truyền vào param*:tai_khoan và body*	:
  + ho_ten:string
  + so_dt:string

---- banUser (token require) ----
+ Truyền vào params tai_khoan
+ ADMIN -> MODE -> Editor -> Member

---- unBanUser (token require) ----
+ Truyền params tai_khoan
+ ADMIN -> MODE -> Editor -> Member
 
---- GetAllUser ----
+ Lấy thông tin của tất cả người dùng

---- getUserPageDivision ----
+ Truyền vào query*:
   + page:string (lấy users ở trang số mấy)
   + limit:string (giới hạng số lượng user trả về ở mỗi trang)

---- getUserByName ----
+ Truyền vào query:
   + keyword:string (tên hoặc email user)


---- setPermission (token require) ----
+ truyền vào token và body:
  + users_id:number
  + permission_value:number
+ chỉ có ADMIN mới phân quyền được
  
----------------------------------- API MOVIES ----------------------------

---- Create movie (token require) ----
+ Editors trở lên mới có quyền tạo movie
+ Truyền vào body(form-data):
   + ten_phim*	:string
   + trailer*	:string
   + mo_ta*	:string
   + ngay_khoi_chieu*:	string
   + danh_gia*	:number
   + hot*	:boolean
   + dang_chieu*:boolean
   + sap_chieu*	:boolean
   + hinh_anh*	:file(hinh anh)


---- deleteMovie (token require) ----
+ Editors trở lên mới có quyền tạo movie
+ Truyền params ma_phim*:number

---- getMovieInfo ----
+ Truyền params ma_phim*:number

---- getMovieByDate  ----
+ Truyền query :
   + from:date(xxxx-xx-xx)
   + to:date(xxxx-xx-xx)
   + number:number
   + sort:string(desc:từ nhỏ đến lớn hoặc asc:lớn đến nhỏ theo ngày khởi chiếu )

---- updateMovie (token require) ----
+ Editors trở lên mới có quyền tạo movie
+ Truyền vào body(form-data):
   + ten_phim	:string
   + trailer	:string
   + mo_ta	:string
   + ngay_khoi_chieu:	string
   + danh_gia	:number
   + hot	:boolean
   + dang_chieu:boolean
   + sap_chieu	:boolean
   + hinh_anh	:file(hinh anh)
  
---- getMovieByName ----
+ Truyền vào query:
   + keywords*:string (tên movie)
   + page: number (tìm movie ở trang nào)
   + limit: number (giới hạng movie trong 1 trang)
 
---- getBanner ----
+ Truyền vào param ma_phim 

----------------------------------- API ADMIN ----------------------------
---- imgSync(token require) ---- 
+ Admin  mới có quyền 
+ Đồng bộ ảnh giữa database va folder

----------------------------------- API CINEMAS ----------------------------
---- createCinemaSystem(token require) ----
+ ADMIN mới có quyền 
+ Truyền vào body(form-data):
   + ten_he_thong_rap *:string
   + logo *:file(hinh anh)

---- deleteCinemaSystem (token require) ----
+ ADMIN mới có quyền 
+ Truyền vào param* ma_he_thong_rap:string

---- getCinemaSystem ----
+ Tìm tất cả hệ thống rạp

---- createCinemaComplex(token require) ----
+ Mode trở lên mới có quyền 
+ Truyền vào body* :
   + ten_cum_rap:string
   + dia_chi:string
   + ma_he_thong_rap:number

---- deleteCinemaComplex (token require) ----
+ Mode trở lên mới có quyền
+ Truyền vào param* ma_cum_rap:string

---- createCinema(token require) ----
+ Mode trở lên mới có quyền
+ Truyền vào body* :
   + ten_rap: string
   + ma_cum_rap: number

---- getCinemaComplex ----
+ Tìm tất cả cụm rạp

---- deleteCinema (token require) ----
+ Mode trở lên mới có quyền
+ Truyền vào param* ma_rap:string

---- getCinemaInfo  ----
+ Truyền vào param* ma_rap:string

---- getCinemasByComplex  ---- (tìm rạp theo cụm rạp)
+ Truyền vào param* ma_cum_rap:string

---- updateCinema (token require) ----
+ Mode trở lên mới có quyền
+ Truyền vào param* ma_rap:string
+ Truyền vào body* : 
   + ten_rap: string
   + ma_cum_rap: number


----------------------------------- API DATA ---------------------------------
---- createCinemaComplex(token require) ----
+ Editor trở lên mới có quyền 
+ Truyền vào body* :
   + ma_rap:string
   + ma_phim:string
   + ngay_gio_chieu:datetime(2023-03-01 10:00:00)
   + gia_ve:number

---- deleteShowTime (token require) ----
+ Editor trở lên mới có quyền
+ Truyền vào param* ma_lich_chieu:string

---- getShowTime  ----
+ Truyền query :
   + from:date(xxxx-xx-xx xx:xx:xx)
   + to:date(xxxx-xx-xx xx:xx:xx)
   + number:number
   + sort:string(desc:từ nhỏ đến lớn hoặc asc:lớn đến nhỏ theo ngày khởi chiếu )

---- createSeat(token require) ----
+ Editor trở lên mới có quyền
+ Truyền vào body* :
   + ten_ghe: string
   + ma_rap: number
   + loai_ghe:string

---- deleteCinema (token require) ----
+ Editor trở lên mới có quyền
+ Truyền vào param* ma_ghe:string

---- getSeatByCinema  ---- (tìm ghế theo rạp phim)
+ Truyền vào param* ma_rap:string

---- updateSeat (token require) ----
+ Editor trở lên mới có quyền
+ Truyền vào param* ma_ghe:string
+ Truyền vào body* : 
   + ten_ghe: string
   + ma_rap: number
   + loai_ghe:string

---- getSeatByCinema  ---- (tìm lịch chiếu theo phim)
+ Truyền vào param* ma_phim:string

---- getSeatByCinema  ---- (tìm ghế theo lịch chiếu phim)
+ Truyền vào param* ma_lịch_chiếu:string

----------------------------------- API ORDER ---------------------------------
---- create(token require) ----
+ Truyền vào body* :
   + ma_lich_chieu: number
   + ma_ghe: number

---- AdminCreate(token require) ----
+ Editor trở lên mới có quyền
+ Truyền vào body* :
   + ten_ghe: string
   + ma_rap: number
   + loai_ghe:string

---- deleteOrder (token require) ----
+ Admin toàn quyền
+ Truyền vào param* ma_dat_ve:string

---- getCurrentOrder (token require) ---- (tìm vé của bản thân)

---- getOrderByShowTime  ---- (tìm tất cả Order(ghế đã đặt) theo lịch chiếu phim)
+ Truyền vào param* ma_lịch_chiếu:string

----------------------------------- Permission ---------------------------------
-- Permission:
+ getAllPermission (không cần token)
+ Có 5 bậc từ 0 - 4 + 0: banned: chỉ có thể lấy thông tin, ko thể sửa, xóa 
+ 1: members: toàn quyền lấy, sửa, xóa thông tin của bản thân, ko dc sửa, xóa thông tin của người khác! 
+ + 2,3: Editors,Moderators: toàn quyền lấy, sửa, xóa thông tin của bản thân, dc ban user khác,được tạo phim,ghế,lịch chiếu! 
+ + 4: Admin: Toàn quyền, có thể sửa, xóa thông tin của thành viên khác. 
+ !!! Chỉ được ban thành viên có permission nhỏ hơn bản thân, ko dc ban bản thân!
