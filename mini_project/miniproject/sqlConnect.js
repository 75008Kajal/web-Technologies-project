var exp=require('express');
var mysql=require('mysql2');
var bp=require('body-parser');
var cors=require('cors');
var app=exp();
app.use(cors());
app.use(bp.json());

var con=mysql.createConnection({
		host:"localhost",
		port: 3307,
		user:"root",
		password:"root",
		database:"mini_project"

})

con.connect(function(err){
	if(!err)
	console.log("db connected");
	else
	console.log("db not connected");
	


})

app.listen(9000, function() {
	console.log("exp with mysql - 9000")
});

app.post('/login',function(req,res){
	var uid=req.body.email_Id;
	var Password=req.body.Password;
	//var query="select * from customer where email_Id=? and Password=?";
	var query="select * from customer where Password=?";

//con.query(query,[uid,Password],function(err,result){
con.query(query,[Password],function(err,result){

	console.log("Password="+Password);
	console.log("uid="+uid);
	console.log("res="+result);

	if(!err)
{
		console.log("error="+err);
	if(result.length>0)
{
	
//	if(result[0].email_Id==uid&&result[0].Password==Password)
	if(result[0].Password==Password)
{
	console.log("hi");
	res.send("success");
}

	else
{
	res.send("login failed");
	
}
}

	else
{
	res.send("login failed");
}
}


})
	
	
});



app.post('/insertcust',function(req,res){
	var custId=req.body.custId;
	var nm=req.body.cname;
	var mobileNo=req.body.mobileNo;
	var email_Id=req.body.email_Id;
	var paymentMode=req.body.paymentMode;
	var pwd=req.body.Password;
	var query="insert into customer(custId,cname,mobileNo,email_Id,paymentMode,Password) values(?,?,?,?,?,?)";
	con.query(query,[custId,nm,mobileNo,email_Id,paymentMode,pwd],function(err)
	{
	if(!err)
	res.send("success");
	else
	res.send("failure");
	});

})



app.all('*',function(req,res){
	res.send("<p> Undefined URL </p>");
})