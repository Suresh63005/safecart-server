const mysqldb=require("mysql2");
const con=mysqldb.createConnection({
    host:"localhost",
    user:"root",
    password:"Suresh123@",
    database:"safecart"
});

function startconnection(){
    con.connect((err)=>{
        if(err) throw err;
        console.log("connected");
    });
}

async function getuserdetails(){
    startconnection();
    const query="select * from userdetaills";
    const data = await con.promise().query(query);
    return data[0];
}

async function postUserDetails(Name,UserName,Email,Country,Password,ComfirmPassword){
    startconnection();
    if(Password === ComfirmPassword){
        const query=`INSERT INTO userdetaills(Name,UserName,Email,Country,Password)
        VALUES('${Name}','${UserName}','${Email}','${Country}','${Password}')`
        await con.promise().query(query);
        return true;
    }
    else{
        console.log("comfirm password is not same")
    }
    
}
async function updateUserDetails(Name,UserName,Email,Country,UserId){
    startconnection();
    
        const query=`UPDATE userdetaills SET Name = '${Name}', UserName = '${UserName}',Email = '${Email}' ,Country = '${Country}' WHERE UserId =${UserId} ;`
        await con.promise().query(query);
        return true;
    
}
async function checkLoggedInUser(Email,Password) {
    startconnection();
    const query = `select * from userdetaills
    where Email='${Email}' and Password='${Password}'`;
    const data = await con.promise().query(query);
    return data[0];
}
async function changepasswordUser(NewPassword,UserId) {
    startconnection();
    const query = `update userdetaills set Password='${NewPassword}' where UserId =${UserId} `;
    const data = await con.promise().query(query);
    return data[0];
}
async function checkLoggedInseller(Email,Password) {
    startconnection();
    const query = `select * from sellersignup
    where Email='${Email}' and Password='${Password}'`;
    const data = await con.promise().query(query);
    return data[0];
}

async function postsellerDetails(Ownername,Businessname,Email,Username,Password,ComfirmPassword){
    startconnection();
        const query=`INSERT INTO sellersignup (OwnerName,Businessname,Email,Username,Password)
        VALUES('${Ownername}','${Businessname}','${Email}','${Username}','${Password}')`
        await con.promise().query(query);
        return true;   
}
async function postproduct(Productname,Price,Oldprice,Discount,ProductImage,Catergory,SellerId){
    startconnection();
        const query=`INSERT INTO products(ProductName,Price,OldPrice,Discount,ProductImage,Category,SellerId)
        VALUES('${Productname}','${Price}','${Oldprice}','${Discount}','${ProductImage}','${Catergory}','${SellerId}')`
        await con.promise().query(query);
        return true;   
}
async function updateProduct(ProductId,Productname,Price,Oldprice,Discount,ProductImage,Catergory){
    startconnection();
        const query=`update products set ProductName='${Productname}',Price='${Price}',OldPrice='${Oldprice}',Discount='${Discount}' ,ProductImage='${ProductImage}', Category='${Catergory}' where ProductId=${ProductId} `;
        await con.promise().query(query);
        return true;   
}
async function postaddtocart(UserId,ProductID,Quantity){
    startconnection();
        const query=`call sp_addtocart(${UserId},${ProductID},${Quantity})`
        await con.promise().query(query);
        return true;   
}
async function postwishlist( ProductID,UserId){
    startconnection();
        const query=`insert into wishlist(ProductId,UserId)values('${ProductID}','${UserId}')`
        await con.promise().query(query);
        return true;   
}
async function postaddress( FullName,Address,State,Country,City,Zipcode,Mobile,Email,OrderNotes,UserId){
    startconnection();
        const query=`insert into address(FullName,Address,Country,State,City,Zipcode,Mobile,Email,OrderNotes,UserId)values('${FullName}','${Address}','${Country}','${State}','${City}',${Zipcode},'${Mobile}','${Email}','${OrderNotes}','${UserId}')`
        await con.promise().query(query);
        return true;   
}
async function wishlistdelete( ProductID,UserId){
    startconnection();
        const query=`delete from wishlist where ProductId=${ProductID} and UserId=${UserId}`
        await con.promise().query(query);
        return true;   
}
async function addressdelete( ProductID){
    startconnection();
        const query=`delete from address where AddressId=${ProductID}`
        await con.promise().query(query);
        return true;   
}
async function addtocartdelete( ProductID,UserId){
    startconnection();
        const query=`delete from addtocart where ProductId=${ProductID} and UserId=${UserId}`
        await con.promise().query(query);
        return true;   
}
async function getproducts(){
    startconnection();
    const query="select * from products";
    const data = await con.promise().query(query);
    return data[0];
}
async function getsellerproducts(SellerId){
    startconnection();
    const query=`select * from products where SellerId ='${SellerId}'`;
    const data = await con.promise().query(query);
    return data[0];
}
async function getshoppage(ProductId){
    startconnection();
    const query=`select * from products where ProductId=${ProductId}`;
    const data = await con.promise().query(query);
    return data[0];
}
async function getaddtocart(userId){
    startconnection();
    const query=`select * from products as p join addtocart as a where p.ProductId=a.ProductId and a.UserId=${userId}`;
    const data = await con.promise().query(query);
    return data[0];
}
async function getwishlist(userId){
    startconnection();
    const query=`select DISTINCT p.ProductId, ProductName, Price, OldPrice,ProductImage, w.ProductId,w.UserId from products as p join wishlist as w where p.ProductId=w.ProductId and w.UserId=${userId}`;
    const data = await con.promise().query(query);
    return data[0];
}
async function getaddtocartcount(userId){
    startconnection();
    const query=`select sum(Quantity) as cartcount from addtocart where UserId=${userId}`;
    const data = await con.promise().query(query);
    return data[0];
}
async function getwishlistcount(userId){
    startconnection();
    const query=`select count(DISTINCT(ProductId)) as wishlistcount from wishlist where UserId=${userId}`;
    const data = await con.promise().query(query);
    return data[0];
}
async function getadressdetails(userId){
    startconnection();
    const query=`select * from address where UserId=${userId}`;
    const data = await con.promise().query(query);
    return data[0];
}


module.exports={
    getUserDetails:async()=>getuserdetails(),
    postUserDetails: async(Name,UserName,Email,Country,Password,ComfirmPassword)=> postUserDetails(Name,UserName,Email,Country,Password,ComfirmPassword),
    updateUserDetails: async(Name,UserName,Email,Country,UserId)=> updateUserDetails(Name,UserName,Email,Country,UserId),
    checkLoggedInUser:async(Email,Password)=>checkLoggedInUser(Email,Password),
    changepasswordUser:async(NewPassword,UserId)=>changepasswordUser(NewPassword,UserId),
    postsellerDetails: async(Ownername,Businessname,Email,Username,Password)=> postsellerDetails(Ownername,Businessname,Email,Username,Password),
    checkLoggedInseller:async(Email,Password)=>checkLoggedInseller(Email,Password),
    postproduct:async(Productname,Price,Oldprice,Discount,ProductImage,Catergory,SellerId)=>postproduct(Productname,Price,Oldprice,Discount,ProductImage,Catergory,SellerId),
    updateProduct:async(ProductId,Productname,Price,Oldprice,Discount,ProductImage,Catergory)=>updateProduct(ProductId,Productname,Price,Oldprice,Discount,ProductImage,Catergory),
    getproducts:async()=>getproducts(),
    getsellerproducts:async(SellerId)=>getsellerproducts(SellerId),
    getshoppage:async(ProductId)=>getshoppage(ProductId),
    postaddtocart:async(UserId,ProductID,Quantity)=>postaddtocart(UserId,ProductID,Quantity),
    addtocartdelete:async(ProductID,UserId)=>addtocartdelete(ProductID,UserId),
    postwishlist:async(ProductID,UserId)=>postwishlist(ProductID,UserId),
    wishlistdelete:async(ProductID,UserId)=>wishlistdelete(ProductID,UserId),
    addressdelete:async(ProductID)=>addressdelete(ProductID),
    postaddress:async(FullName,Address,State,Country,City,Zipcode,Mobile,Email,OrderNotes,UserId)=>postaddress(FullName,Address,State,Country,City,Zipcode,Mobile,Email,OrderNotes,UserId),
    getaddtocart:async(userId)=>getaddtocart(userId),
    getwishlist:async(userId)=>getwishlist(userId),
    getaddtocartcount:async(userId)=>getaddtocartcount(userId),
    getwishlistcount:async(userId)=>getwishlistcount(userId),
    getadressdetails:async(userId)=>getadressdetails(userId),
}