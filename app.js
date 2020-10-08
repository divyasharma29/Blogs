//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true ,  useUnifiedTopology: true });

const homeStartingContent = "Apple wants a weekend or expensive dui want to decorate. Which is always the creator nor the duration of her life. Carrots carrots just been running a lot. Product lived in this. Financing yeast rice vegetarian or clinical portal. That they are not members, nor members of the Donec ultrices tincidunt arcu. A lot of television targeted at the undergraduate nutrition. Of life, and the mountains shall be born, ultricies quis, congue in magnis dis parturient. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. The founder of basketball and football propaganda graduated drink at the arc. Performance skirt smile at any hate for hate vulputate. Running a lot of television targeted at the undergraduate nutrition.";
const aboutStartingContent = "Textile manufacturing refinancing is beating. Textile manufacturing dictumst the kids elit. There diameter and boat manufacturing lorem. Consectetur adipiscing elit sagittis purus each one it is. But the price they want, but the smile Vulputate soccer massage. In some salad largest ecological. Makeup is always the laughter from her, Whosoever shall not nibh sed ac hendrerit gravida. Westinghouse peanut sauce or carrots mass of temperature. For the arrows of life, so that the earth element. In basketball largest peanut running Massa developers worth it.";
const contactStartingContent = "Thermal deductible until the price vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Inspections Ut et drink recipes. Minneapolis developer undergraduate homework et. Laughter pull undergraduate at iaculis in the region. Nor do some shooting movies malesuada bibendum sapien arcu vitae. Recipe sometimes varied mainstream real estate. But now targeted propaganda opportunities. Sometimes put lorem ipsum carrots undergraduate tomato soup. The cushion element of the whole, they shall neither. Basketball was pregnant dark to invest clinical zero. So that the disease in the aliquam sem mauris fringilla tincidunt. Set the temperature to photography always pull for free.";

const app = express();

//var posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSheama = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSheama);



app.get("/" , function(req , res){
  Post.find({},function(err, posts){
  
  res.render("home" , {homeContent: homeStartingContent , listPost: posts});
})
});
app.get("/about" , function(req , res){
  res.render("about" , {aboutContent: aboutStartingContent});
});
app.get("/contact" , function(req , res){
  res.render("contact" , {contactContent: contactStartingContent});
});
app.get("/compose" , function(req , res){
  res.render("compose");  

});

app.get("/posts/:postID" , function(req, res){
   
  const requestedPostId = req.params.postID;
  //const requestedTitle = _.lowerCase(req.params.topic);//this will show use the topic.It can be anything after news i.e. pysics, maths , post etc.
  Post.findOne({_id: requestedPostId},  function(err, foundPost){
    res.render("post", {title:foundPost.title , data: foundPost.content });
  })
  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);
  //   if(storedTitle===requestedTitle){
  //     res.render("post", {title:post.title , data: post.data });
  //   }
  // })
  });

app.post("/compose" , function(req, res){
  // const postm = {
  // title : req.body.postTitle,
  // data : req.body.postBody
  // };
  const post= new Post({
    title : req.body.postTitle,
    content : req.body.postBody
  });
  post.save();
  
  //posts.push(post);
  res.redirect("/");

});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
