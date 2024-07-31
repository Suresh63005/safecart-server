const express= require('express');
const cors=require('cors');
const db_con=require('./db_con');
const formidable=require('express-formidable');
const app=express();

app.listen(5000,()=>{
    console.log("server running on 5000 port...");
})
app.use(formidable())
app.use(cors());

app.get("/",(req,res)=>createservercallback(req, res));
function createservercallback(req, res){
    res.write("welcome to express Server api");
    res.end();
}
//--> user details <---
app.get("/getuserdetails",(req, res)=>userdetailscallback(req,res));
async function userdetailscallback(req, res){
   console.log("UserDetails  Api called");
   let data = await db_con.getUserDetails();
   res.write(JSON.stringify(data));
   res.end();
}

app.post("/postuserdetails",(req, res)=>postuserdetailscallback(req,res));
async function postuserdetailscallback(req, res){
   console.log("setUserDetails  Api called");
   const{Name,UserName,Email,Country,Password,ComfirmPassword}=req.fields;
   let data = await db_con.postUserDetails(Name,UserName,Email,Country,Password,ComfirmPassword);
   res.end();
}
app.post("/updateuserdetails",(req, res)=>updateuserdetailscallback(req,res));
async function updateuserdetailscallback(req, res){
   console.log("set update UserDetails  Api called");
   const{Name,UserName,Email,Country,UserId}=req.fields;
   let data = await db_con.updateUserDetails(Name,UserName,Email,Country,UserId);
   res.end();
}

app.post("/checkuser",(req,res)=> checkLoggedInuserCallback(req,res));
async function checkLoggedInuserCallback(req,res) {
console.log("check user API called");

let data = await db_con.checkLoggedInUser(req.fields.Email,req.fields.Password);

res.end(JSON.stringify(data));
}
app.post("/changepassword",(req,res)=> changepassworduserCallback(req,res));
async function changepassworduserCallback(req,res) {
console.log("changepassword user API called");

let data = await db_con.changepasswordUser(req.fields.NewPassword,req.fields.UserId);

res.end(JSON.stringify(data));
}

//-->End user details <---

//-->seller details <--
app.post("/postsellerdetails",(req, res)=>postsellerdetailscallback(req,res));
async function postsellerdetailscallback(req, res){
   console.log("setsellerDetails  Api called");
   const{Ownername,Businessname,Email,Username,Password}=req.fields;
   let data = await db_con.postsellerDetails(Ownername,Businessname,Email,Username,Password);
   res.end();
}

app.post("/checkseller",(req,res)=> checkLoggedInsellerCallback(req,res));
async function checkLoggedInsellerCallback(req,res) {
console.log("check seller API called");

let data = await db_con.checkLoggedInseller(req.fields.Email,req.fields.Password);

res.end(JSON.stringify(data));
}
//-->End seller details <---

//-->Post products details <--

// app.post("/postproduct",(req, res)=>postproductcallback(req,res));
// async function postproductcallback(req, res){
//    console.log("setproduct  Api called");
//    const{Productname,Price,Oldprice,Discount,ProductImage,Catergory,SellerId}=req.fields;
   
//    let data = await db_con.postproduct(Productname,Price,Oldprice,Discount,ProductImage,Catergory,SellerId);
//    res.end();
// }


app.post("/postproduct", (req, res) => saveProductsCallback(req, res));

async function saveProductsCallback(req, res) {

   console.log("suresh" +req.fields.ProductId)

    try {
        if(req.fields.ProductId != null && req.fields.ProductId != undefined && req.fields.ProductId !=0 && req.fields.ProductId != "undefined"){
         const{ProductId,Productname,Price,Oldprice,Discount,ProductImage,Catergory}=req.fields;
            let data = await db_con.updateProduct(ProductId,Productname,Price,Oldprice,Discount,ProductImage,Catergory);
        }
        else{
         const{Productname,Price,Oldprice,Discount,ProductImage,Catergory,SellerId}=req.fields;
            let data = await db_con.postproduct(Productname,Price,Oldprice,Discount,ProductImage,Catergory,SellerId);

        }
}
catch(e){
    console.log(e.message)
    return res.status(500).json({message:"Internal Server Error"})

}

}


app.get("/getproducts",(req, res)=>productscallback(req,res));
async function productscallback(req, res){
   console.log("get products  Api called");
   let data = await db_con.getproducts();
   res.write(JSON.stringify(data));
   res.end();
}
app.get("/getsellerproducts/:SellerId",(req, res)=>sellerproductscallback(req,res));
async function sellerproductscallback(req, res){
   console.log("get sellerproducts  Api called"+req.params.SellerId);
   let data = await db_con.getsellerproducts(req.params.SellerId);
   res.write(JSON.stringify(data));
   res.end();
}

app.get("/getshoppageproducts/:ProductId",(req, res)=>shoppagecallback(req,res));
async function shoppagecallback(req, res){
   console.log("get shoppage  Api called");
   let data = await db_con.getshoppage(req.params.ProductId);
   res.write(JSON.stringify(data));
   res.end();
}
//-->End Product details <---

//-->Post addtocart details <--
app.post("/postaddtocart",(req, res)=>postaddtocartcallback(req,res));
async function postaddtocartcallback(req, res){
   console.log("postaddtocart  Api called");
   const{UserId,ProductID,Quantity}=req.fields;
   
   let data = await db_con.postaddtocart(UserId,ProductID,Quantity);
   res.end();
}
app.get("/getaddtocartproducts/:userId",(req, res)=>addtocartcallback(req,res));
async function addtocartcallback(req, res){
   console.log("get addtocart  Api called" + req.params.userId);

   let data = await db_con.getaddtocart(req.params.userId);
   res.write(JSON.stringify(data));
   res.end();
}
app.post("/addtocartdelete",(req, res)=>addtocartdeletecallback(req,res));
async function addtocartdeletecallback(req, res){
   console.log("addtocartdelete  Api called");
   const{ProductID,UserId}=req.fields;
   let data = await db_con.addtocartdelete(ProductID,UserId);
   res.end();
}
app.get("/getaddtocartcount/:userId",(req, res)=>addtocartcountcallback(req,res));
async function addtocartcountcallback(req, res){
   console.log("get addtocartcount  Api called  "+ req.params.userId);

   let data = await db_con.getaddtocartcount(req.params.userId);
   res.write(JSON.stringify(data));
   res.end();
}
//-->End addtocart details <---

//-->Post Wishlist details <--
app.post("/postwishlist",(req, res)=>postwishlistcallback(req,res));
async function postwishlistcallback(req, res){
   console.log("postwishlist  Api called");
   const{ProductID,UserId}=req.fields;
   let data = await db_con.postwishlist(ProductID,UserId);
   res.end();
}
app.post("/wishlistdelete",(req, res)=>wishlistdeletecallback(req,res));
async function wishlistdeletecallback(req, res){
   console.log("wishlistdelete  Api called");
   const{ProductID,UserId}=req.fields;
   let data = await db_con.wishlistdelete(ProductID,UserId);
   res.end();
}
app.post("/addressdelete",(req, res)=>addressdeletecallback(req,res));
async function addressdeletecallback(req, res){
   console.log("addressdelete  Api called");
   const{ProductID}=req.fields;
   let data = await db_con.addressdelete(ProductID);
   res.end();
}
app.get("/getwishlistproducts/:userId",(req, res)=>wishlistcallback(req,res));
async function wishlistcallback(req, res){
   console.log("get wishlist  Api called" + req.params.userId);
   let data = await db_con.getwishlist(req.params.userId);
   res.write(JSON.stringify(data));
   res.end();
}
app.get("/getwishlistcount/:userId",(req, res)=>wishlistcountcallback(req,res));
async function wishlistcountcallback(req, res){
   console.log("get wishlistcount  Api called  "+ req.params.userId);

   let data = await db_con.getwishlistcount(req.params.userId);
   res.write(JSON.stringify(data));
   res.end();
}
//-->End Wishlist details <---

//-->Post Address details <--

app.post("/postaddress",(req, res)=>postaddresscallback(req,res));
async function postaddresscallback(req, res){
   console.log("postaddress  Api called");
   const{FullName,Address,State,Country,City,Zipcode,Mobile,Email,OrderNotes,UserId}=req.fields;
   let data = await db_con.postaddress(FullName,Address,State,Country,City,Zipcode,Mobile,Email,OrderNotes,UserId);
   res.end();
}

app.get("/adressdetails/:userId",(req, res)=>adressdetailscallback(req,res));
async function adressdetailscallback(req, res){
   console.log("get adressdetails  Api called  "+ req.params.userId);

   let data = await db_con.getadressdetails(req.params.userId);
   res.write(JSON.stringify(data));
   res.end();
}
