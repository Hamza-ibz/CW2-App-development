var express=require("express");
var app=express();
app.get("/",function(req,res)
{res.send("youjustsentaGETrequest,friend\n");
});
app.post("/",function(req,res){res.send("a POST request? nice\n");
});
app.put("/",function(req,res){res.send("i don’t see alot of PUT requests anymore\n");
});
app.delete("/",function(req,res){res.send("oh my,a DELETE??\n");
});
app.listen(3000,function(){console.log("CRUD appis listening on port 3000\n");
});